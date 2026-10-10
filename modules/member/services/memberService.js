/*
Family Wealth AI OS V7
Member Service
家庭成员管理 + 分成员统计 + 自动合并。
归属解析顺序：记录 memberId → ownerId → 所属账户的成员 → owner 姓名匹配 → 家庭共同。
投资按投资记录的账户归属统计（持仓本身按代码汇总，不分成员）。
*/
import MemberRepository from "../repository/memberRepository.js?v=20261008ae";
import AccountAPI from "../../account/api/accountAPI.js?v=20261008aw";
import IncomeAPI from "../../income/api/incomeAPI.js?v=20261008ae";
import ExpenseAPI from "../../expense/api/expenseAPI.js?v=20261008ae";
import InvestmentAPI from "../../investment/api/investmentAPI.js?v=20261008ah";
import AssetAPI from "../../asset/api/assetAPI.js?v=20261008ae";
import LiabilityAPI from "../../liability/api/liabilityAPI.js?v=20261009bw";

import IncomeRepository from "../../income/repository/incomeRepository.js?v=20261008ae";

import TransactionRepository from "../../../transaction/transactionRepository.js?v=20261008ae";

function num(value) {
    return Number(value || 0);
}

function safe(fn, fallback) {
    try {
        return fn();
    } catch (error) {
        return fallback;
    }
}

/*

 * Every member carries two default accounts:

 * an Investment account and a Checking account,

 * each opening at 200,000. Balances then move

 * with the member's transactions only.

 */

const DEFAULT_ACCOUNT_OPENING = 200000;

const DEFAULT_ACCOUNT_DEFS = [
    {
        kind: "investment",
        name: "Investment",
        accountType: "Investment",
        type: "Investment"
    },
    {
        kind: "checking",
        name: "Checking",
        accountType: "Checking",
        type: "Checking"
    }
];

function accountKind(account) {
    const label =
        `${(account && account.name) || ""} ${(account && account.accountType) || ""} ${(account && account.type) || ""}`.toLowerCase();
    if (label.includes("invest")) {
        return "investment";
    }
    if (label.includes("check")) {
        return "checking";
    }
    return "";
}

function ensureMemberDefaultAccounts(member, accounts) {
    if (!member || !member.id) {
        return accounts;
    }
    const pool = Array.isArray(accounts) ? accounts : [];
    const kinds = new Set(
        pool
            .filter(
                account =>
                    String(
                        (account && (account.memberId || account.ownerId)) || ""
                    ) === String(member.id)
            )
            .map(accountKind)
            .filter(Boolean)
    );
    DEFAULT_ACCOUNT_DEFS.forEach(def => {
        if (kinds.has(def.kind)) {
            return;
        }
        try {
            const created = AccountAPI.create({
                name: def.name,
                accountType: def.accountType,
                type: def.type,
                balance: DEFAULT_ACCOUNT_OPENING,
                openingBalance: DEFAULT_ACCOUNT_OPENING,
                memberId: member.id,
                ownerId: member.id,
                currency: "USD"
            });
            if (created) {
                pool.push(created);
            }
            kinds.add(def.kind);
        } catch (createError) {
        }
    });
    return pool;
}

const MemberService = {
    getMembers() {
        return MemberRepository.getAll();
    },

    saveMember(data) {
        const input = data || {};
        const isNewMember =
            !input.id ||
            !this.getMembers().some(
                member => member.id === input.id
            );
        const saved = MemberRepository.save(input);
        if (isNewMember && saved && saved.id) {
            // New members automatically get their
            // Investment + Checking default accounts.
            ensureMemberDefaultAccounts(
                saved,
                safe(() => AccountAPI.getAll(), [])
            );
        }
        return saved;
    },

    /*

     * Sync: a member who already has trades but

     * no account of their own gets their default

     * cash account created automatically.

     */

    ensureDefaultAccounts() {
        try {
            const members = this.getMembers() || [];
            let accounts = safe(() => AccountAPI.getAll(), []);
            members.forEach(member => {
                accounts = ensureMemberDefaultAccounts(
                    member,
                    accounts
                );
            });
        } catch (syncError) {
        }
    },

    deleteMember(id) {
        return MemberRepository.remove(id);
    },

    /*
     * 返回 { members: [{ member, income, expense, netFlow, accountsValue,
     * investmentsValue, assetsValue, liabilitiesValue, netWorth }],
     * unassigned: {...}, family: {...} }
     * family = 全部成员 + 未分配的自动合并合计。
     */
    getMemberStats() {
        const members = this.getMembers();
        const accounts = safe(() => AccountAPI.getAll(), []);
        const incomes = safe(() => IncomeAPI.getAllIncome(), []);
        const expenses = safe(() => ExpenseAPI.getAllExpense(), []);
        const investments = safe(() => InvestmentAPI.getInvestments(), []);
        const assets = safe(() => AssetAPI.getAll(), []);
        const liabilities = safe(() => LiabilityAPI.getLiabilities(), []);

        const accountMember = {};
        accounts.forEach(account => {
            accountMember[account.id] = account.memberId || account.ownerId || "";
        });
        const memberByName = {};
        members.forEach(member => {
            if (member.name) {
                memberByName[member.name] = member.id;
            }
        });

        const resolve = record => {
            if (!record) return "";
            if (record.memberId) return record.memberId;
            if (record.ownerId) return record.ownerId;
            if (record.accountId && accountMember[record.accountId]) {
                return accountMember[record.accountId];
            }
            if (record.owner && memberByName[record.owner]) {
                return memberByName[record.owner];
            }
            return "";
        };

        const empty = () => ({
            income: 0,
            expense: 0,
            loanPrincipalPaid: 0,
            accountsValue: 0,
            investmentsValue: 0,
            assetsValue: 0,
            liabilitiesValue: 0
        });

        const buckets = {};
        members.forEach(member => {
            buckets[member.id] = empty();
        });
        const unassigned = empty();
        const bucketFor = record => {
            const id = resolve(record);
            return id && buckets[id] ? buckets[id] : unassigned;
        };

        // Caliber (2026-10-09): Account Cash is the

        // sum of ALL account balances, paired or not;

        // account-like asset records are counted

        // there instead of under Assets.

        accounts.forEach(account => {

            bucketFor(account).accountsValue +=

                num(account.balance);

        });
        incomes.forEach(record => {
            // Auto investment income (gains / dividends

            // / interest mirrored from transactions)

            // lives in the Income Center but stays out

            // of the daily-income caliber.

            if (record.autoSource) {
                return;
            }
            bucketFor(record).income += num(record.amount ?? record.value);
        });
        expenses.forEach(record => {
            // Loan interest mirrors DO count as member
            // expense (interest is the expense part of
            // a payment; the principal is tracked
            // separately below). Other auto mirrors
            // stay out, same as income.
            if (record.autoSource && record.autoSource !== "LOAN_INTEREST") {
                return;
            }
            bucketFor(record).expense += num(record.amount);
        });
        investments.forEach(record => {
            bucketFor(record).investmentsValue +=
                num(record.currentValue ?? record.marketValue);
        });
        assets.forEach(record => {
            const label =
                `${record.name || ""} ${record.category || ""} ${record.type || ""}`.toLowerCase();
            const accountLike =
                label.includes("invest") ||
                label.includes("check") ||
                label.includes("saving") ||
                label.includes("broker") ||
                label.includes("cash");
            if (!accountLike) {
                bucketFor(record).assetsValue += num(record.currentValue);
            }
        });
        liabilities.forEach(record => {
            bucketFor(record).liabilitiesValue += num(record.currentBalance);
        });

        // Loan principal repaid is real cash out but
        // not an expense: track it per member so the
        // scoped net cash flow can reflect the full
        // payment (principal + interest).
        try {
            const liabilityMember = {};
            liabilities.forEach(record => {
                liabilityMember[record.id] = resolve(record);
            });
            (TransactionRepository.getTransactions() || []).forEach(transaction => {
                if (!transaction || transaction.type !== "LOAN_PAYMENT") return;
                const details = transaction.businessDetails?.liability || {};
                const principal = num(details.principalPortion);
                if (!principal) return;
                const cashLine = (transaction.lines || []).find(line => line && line.cashEffect);
                bucketFor({
                    memberId: liabilityMember[details.liabilityId] || "",
                    accountId: cashLine ? cashLine.accountId : ""
                }).loanPrincipalPaid += principal;
            });
        } catch (loanError) {
        }

        const finish = bucket => ({
            ...bucket,
            netFlow: bucket.income - bucket.expense,
            totalAssets:
                bucket.accountsValue +
                bucket.investmentsValue +
                bucket.assetsValue,
            netWorth:
                bucket.accountsValue +
                bucket.investmentsValue +
                bucket.assetsValue -
                bucket.liabilitiesValue
        });

        const memberStats = members.map(member => ({
            member,
            ...finish(buckets[member.id])
        }));
        const unassignedStats = finish(unassigned);

        const familyRaw = empty();
        [...memberStats, unassignedStats].forEach(stat => {
            familyRaw.income += stat.income;
            familyRaw.expense += stat.expense;
            familyRaw.loanPrincipalPaid += stat.loanPrincipalPaid || 0;
            familyRaw.accountsValue += stat.accountsValue;
            familyRaw.investmentsValue += stat.investmentsValue;
            familyRaw.assetsValue += stat.assetsValue;
            familyRaw.liabilitiesValue += stat.liabilitiesValue;
        });

        return {
            members: memberStats,
            unassigned: unassignedStats,
            family: finish(familyRaw)
        };
    },

    /*
     * 财务报告：memberId 为空 = 家庭合并报告，否则单人报告。
     * 含收入/现金流、资产负债、比率，以及按归属拆分的税务（指定年份，默认当年）。
     * 家庭报告与 TaxDataIntegration 的口径一致，可互相核对。
     */
    getReport(memberId = "", year = new Date().getFullYear()) {
        const stats = this.getMemberStats();
        const members = this.getMembers();

        let subject;
        let base;
        if (memberId) {
            const found = stats.members.find(item => item.member.id === memberId);
            subject = found
                ? { type: "member", id: memberId, name: found.member.name || memberId }
                : { type: "member", id: memberId, name: memberId };
            base = found || {
                income: 0, expense: 0, netFlow: 0,
                accountsValue: 0, investmentsValue: 0,
                assetsValue: 0, liabilitiesValue: 0, netWorth: 0
            };
        } else {
            subject = { type: "family", id: "", name: "" };
            base = stats.family;
        }

        const accounts = safe(() => AccountAPI.getAll(), []);
        const accountMember = {};
        accounts.forEach(account => {
            accountMember[account.id] = account.memberId || account.ownerId || "";
        });
        const memberByName = {};
        members.forEach(member => {
            if (member.name) memberByName[member.name] = member.id;
        });
        const assets = safe(() => AssetAPI.getAll(), []);
        const liabilities = safe(() => LiabilityAPI.getLiabilities(), []);
        const assetMember = {};
        assets.forEach(asset => {
            assetMember[asset.id] = asset.memberId || asset.ownerId || "";
        });
        const liabilityMember = {};
        liabilities.forEach(liability => {
            liabilityMember[liability.id] =
                liability.memberId ||
                (liability.owner && memberByName[liability.owner]) ||
                "";
        });

        const inScope = ownerId => !memberId || ownerId === memberId;

        // 税务：工资/业务来自 Income 模块（与税务口径一致）
        const incomeRecords = safe(() => IncomeRepository.findAll(), []);
        let wage = 0;
        incomeRecords.forEach(record => {
            if (record.taxable === false) return;
            const owner =
                record.memberId ||
                (record.accountId && accountMember[record.accountId]) ||
                (record.owner && memberByName[record.owner]) ||
                "";
            if (inScope(owner)) {
                wage += num(record.value ?? record.amount);
            }
        });

        // 税务：股息/利息/资本利得/房贷利息/已缴税来自 Transaction
        let dividends = 0;
        let interest = 0;
        let capitalGains = 0;
        let mortgageInterest = 0;
        let taxPaid = 0;

        const transactions = safe(() => TransactionRepository.getTransactions(), []) || [];
        transactions.forEach(transaction => {
            const dateText = transaction.transactionDate || transaction.date || "";
            if (!String(dateText).startsWith(String(year))) return;

            const lines = Array.isArray(transaction.lines) ? transaction.lines : [];
            const cashLine = lines.find(line => line && line.cashEffect);
            let owner = cashLine ? (accountMember[cashLine.accountId] || "") : "";
            if (transaction.type === "LOAN_PAYMENT") {
                const liabilityId = transaction.businessDetails?.liability?.id;
                if (liabilityId && liabilityMember[liabilityId]) {
                    owner = liabilityMember[liabilityId];
                }
            }
            if (transaction.type === "ASSET_SALE") {
                const assetId = transaction.businessDetails?.asset?.id;
                if (assetId && assetMember[assetId]) {
                    owner = assetMember[assetId];
                }
            }
            if (!inScope(owner)) return;

            if (transaction.type === "DIVIDEND") {
                lines.forEach(line => {
                    if (line && line.cashEffect && line.direction === "IN") {
                        dividends += num(line.amount);
                    }
                });
            } else if (transaction.type === "INTEREST") {
                lines.forEach(line => {
                    if (line && line.cashEffect && line.direction === "IN") {
                        interest += num(line.amount);
                    }
                });
            } else if (transaction.type === "ASSET_SALE") {
                capitalGains += num(transaction.businessDetails?.asset?.capitalGain);
            } else if (transaction.type === "INVESTMENT_SELL") {
                capitalGains += num(transaction.businessDetails?.investment?.capitalGain);
            } else if (transaction.type === "LOAN_PAYMENT") {
                mortgageInterest += num(transaction.businessDetails?.liability?.interestPortion);
            } else if (transaction.type === "TAX_PAYMENT") {
                lines.forEach(line => {
                    if (line && line.cashEffect && line.direction === "OUT") {
                        taxPaid += num(line.amount);
                    }
                });
            }
        });

        const grossAssets =
            base.accountsValue + base.investmentsValue + base.assetsValue;

        return {
            subject,
            year,
            income: base.income,
            expense: base.expense,
            netFlow: base.netFlow,
            savingsRate: base.income > 0 ? (base.netFlow / base.income) * 100 : 0,
            accountsValue: base.accountsValue,
            investmentsValue: base.investmentsValue,
            assetsValue: base.assetsValue,
            totalAssets: grossAssets,
            liabilitiesValue: base.liabilitiesValue,
            netWorth: base.netWorth,
            debtRatio: grossAssets > 0 ? (base.liabilitiesValue / grossAssets) * 100 : 0,
            tax: {
                wage,
                dividends,
                interest,
                capitalGains,
                mortgageInterest,
                taxPaid,
                totalIncome: wage + dividends + interest + capitalGains
            },
            memberBreakdown:
                subject.type === "family"
                    ? stats.members.map(item => ({
                        name: item.member.name || item.member.id,
                        income: item.income,
                        netWorth: item.netWorth
                    }))
                    : []
        };
    }
};
export default MemberService;
