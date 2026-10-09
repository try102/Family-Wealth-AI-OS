/*
Family Wealth AI OS V7
Member Service
家庭成员管理 + 分成员统计 + 自动合并。
归属解析顺序：记录 memberId → ownerId → 所属账户的成员 → owner 姓名匹配 → 家庭共同。
投资按投资记录的账户归属统计（持仓本身按代码汇总，不分成员）。
*/
import MemberRepository from "../repository/memberRepository.js?v=20261008ae";
import AccountAPI from "../../account/api/accountAPI.js?v=20261008ae";
import IncomeAPI from "../../income/api/incomeAPI.js?v=20261008ae";
import ExpenseAPI from "../../expense/api/expenseAPI.js?v=20261008ae";
import InvestmentAPI from "../../investment/api/investmentAPI.js?v=20261008ah";
import AssetAPI from "../../asset/api/assetAPI.js?v=20261008ae";
import LiabilityAPI from "../../liability/api/liabilityAPI.js?v=20261008ae";

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

const MemberService = {
    getMembers() {
        return MemberRepository.getAll();
    },

    saveMember(data) {
        return MemberRepository.save(data || {});
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

        accounts.forEach(account => {
            bucketFor(account).accountsValue += num(account.balance);
        });
        incomes.forEach(record => {
            bucketFor(record).income += num(record.amount ?? record.value);
        });
        expenses.forEach(record => {
            bucketFor(record).expense += num(record.amount);
        });
        investments.forEach(record => {
            bucketFor(record).investmentsValue +=
                num(record.currentValue ?? record.marketValue);
        });
        assets.forEach(record => {
            bucketFor(record).assetsValue += num(record.currentValue);
        });
        liabilities.forEach(record => {
            bucketFor(record).liabilitiesValue += num(record.currentBalance);
        });

        const finish = bucket => ({
            ...bucket,
            netFlow: bucket.income - bucket.expense,
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
