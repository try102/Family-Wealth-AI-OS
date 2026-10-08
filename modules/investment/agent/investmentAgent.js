/*

Family Wealth AI OS

Investment Agent

*/

import InvestmentAPI from "../api/investmentAPI.js";

import RiskEngine from "../risk/riskEngine.js";

import AccountAPI from "../../account/api/accountAPI.js";

import MemberAPI from "../../member/api/memberAPI.js";

function decideSignal(weight, returnRate) {

    if (

        weight >=

        40

    ) {

        return {

            code:

            "REDUCE",

            reasonCode:

            "concentration"

        };

    }

    if (

        returnRate <=

        -15

    ) {

        return {

            code:

            "REVIEW",

            reasonCode:

            "loss"

        };

    }

    if (

        returnRate >=

        30

    ) {

        return {

            code:

            "TAKE_PROFIT",

            reasonCode:

            "profit"

        };

    }

    if (

        weight >

            0 &&

        weight <

            3

    ) {

        return {

            code:

            "HOLD",

            reasonCode:

            "small"

        };

    }

    return {

        code:

        "HOLD",

        reasonCode:

        "hold"

    };

}

const InvestmentAgent = {

    name:

    "Investment Agent",

    getPortfolioStatus(){

        return InvestmentAPI

        .getPortfolioSummary();

    },

    getPerformanceReport(){

        return InvestmentAPI

        .getPerformance();

    },

    getRiskAnalysis(){

        return InvestmentAPI

        .getRiskReport();

    },

    recordTrade(

        trade

    ){

        return InvestmentAPI

        .recordTrade(

            trade

        );

    },

    getTrades(){

        return InvestmentAPI

        .getTrades();

    },

    /*

     * 按成员推导持仓：从交易流水（BUY/SELL）按所属账户的成员

     * 用平均成本法重算。memberId 为 "__shared__" 时表示家庭共同

     * （无成员归属的交易）。合并视图仍用全局持仓，不走这里。

     */

    deriveMemberPositions(memberId) {

        let accountMember = {};

        try {

            AccountAPI

            .getAll()

            .forEach(

                account => {

                    accountMember[account.id] =

                        account.memberId ||

                        account.ownerId ||

                        "";

                }

            );

        } catch (error) {

            accountMember = {};

        }

        let trades = [];

        try {

            trades =

            InvestmentAPI

            .getTrades() || [];

        } catch (error) {

            trades = [];

        }

        const bySymbol = {};

        trades

        .filter(

            trade =>

                trade.action === "BUY" ||

                trade.action === "SELL"

        )

        .filter(

            trade => {

                // A member explicitly chosen on the trade

                // wins; otherwise fall back to the member

                // who owns the trade's account.

                const owner =

                    typeof trade.memberId === "string"

                        ? trade.memberId

                        : accountMember[trade.accountId] || "";

                return memberId === "__shared__"

                    ? owner === ""

                    : owner === memberId;

            }

        )

        .forEach(

            trade => {

                const symbol =

                    String(trade.symbol || "")

                        .toUpperCase();

                if (!symbol) {

                    return;

                }

                if (!bySymbol[symbol]) {

                    bySymbol[symbol] = {

                        symbol,

                        name:

                        trade.name || symbol,

                        quantity: 0,

                        costBasis: 0,

                        averageCost: 0,

                        currentPrice: 0,

                        marketValue: 0,

                        unrealizedGainLoss: 0

                    };

                }

                const position =

                    bySymbol[symbol];

                const quantity =

                    Number(trade.quantity || 0);

                const amount =

                    Number(trade.amount || 0);

                const price =

                    Number(trade.price || 0);

                if (

                    trade.action === "BUY"

                ) {

                    position.quantity +=

                        quantity;

                    position.costBasis +=

                        amount;

                } else {

                    const sellQuantity =

                        Math.min(

                            quantity,

                            position.quantity

                        );

                    const averageCost =

                        position.quantity > 0

                        ? position.costBasis /

                            position.quantity

                        : 0;

                    position.costBasis -=

                        averageCost *

                        sellQuantity;

                    position.quantity -=

                        sellQuantity;

                }

                if (price > 0) {

                    position.currentPrice =

                        price;

                }

                if (trade.name) {

                    position.name =

                        trade.name;

                }

                position.averageCost =

                    position.quantity > 0

                    ? position.costBasis /

                        position.quantity

                    : 0;

                position.marketValue =

                    position.quantity *

                    position.currentPrice;

                position.unrealizedGainLoss =

                    position.marketValue -

                    position.costBasis;

            }

        );

        return Object.values(bySymbol)

            .filter(

                position =>

                    position.quantity > 0

            );

    },

    /**

     * 已实现资本利得（按范围）：重放范围内的买卖交易，

     * 卖出时按当时平均成本扣减，利得 = 卖出金额 − 平均成本 × 卖出数量。

     * memberId: "" = 合并（全部交易）；"__shared__" = 家庭共同；成员 id = 该成员。

     */

    getRealizedGains(memberId = "") {

        let accountMember = {};

        try {

            AccountAPI

            .getAll()

            .forEach(

                account => {

                    accountMember[account.id] =

                        account.memberId ||

                        account.ownerId ||

                        "";

                }

            );

        } catch (error) {

            accountMember = {};

        }

        let trades = [];

        try {

            trades =

            InvestmentAPI

            .getTrades() || [];

        } catch (error) {

            trades = [];

        }

        const costBySymbol = {};

        const byTrade = {};

        let total = 0;

        trades

        .filter(

            trade =>

                trade.action === "BUY" ||

                trade.action === "SELL"

        )

        .filter(

            trade => {

                if (memberId === "") {

                    return true;

                }

                const owner =

                    typeof trade.memberId === "string"

                        ? trade.memberId

                        : accountMember[trade.accountId] || "";

                return memberId === "__shared__"

                    ? owner === ""

                    : owner === memberId;

            }

        )

        .forEach(

            trade => {

                const symbol =

                    String(trade.symbol || "")

                        .toUpperCase();

                if (!symbol) {

                    return;

                }

                if (!costBySymbol[symbol]) {

                    costBySymbol[symbol] = {

                        quantity: 0,

                        costBasis: 0

                    };

                }

                const book =

                    costBySymbol[symbol];

                const quantity =

                    Number(trade.quantity || 0);

                const amount =

                    Number(

                        trade.amount ||

                        quantity *

                            Number(trade.price || 0) ||

                        0

                    );

                if (trade.action === "BUY") {

                    book.quantity += quantity;

                    book.costBasis += amount;

                    return;

                }

                const held =

                    book.quantity;

                const sellQuantity =

                    Math.min(quantity, held);

                if (sellQuantity <= 0) {

                    byTrade[trade.id] = 0;

                    return;

                }

                const averageCost =

                    held > 0

                        ? book.costBasis / held

                        : 0;

                const gain =

                    amount -

                    averageCost * sellQuantity;

                byTrade[trade.id] = gain;

                total += gain;

                book.quantity =

                    held - sellQuantity;

                book.costBasis =

                    Math.max(

                        book.costBasis -

                            averageCost * sellQuantity,

                        0

                    );

            }

        );

        return {

            total,

            byTrade

        };

    },

    getMembers() {

        try {

            return MemberAPI.getMembers();

        } catch (error) {

            return [];

        }

    },

    /*

     * 投资决策中心数据：

     * 持仓 + 权重 + 盈亏 + 决策信号 + 风险提示。

     * 信号为本地规则（权重 / 盈亏阈值），

     * 不使用任何外部行情数据。

     * scopeMemberId 为空 = 合并视图（全部成员）；

     * 传入成员 id 或 "__shared__" = 按成员视图（交易推导）。

     */

    getDecisionCenter(scopeMemberId = ""){

        const scoped =

            Boolean(scopeMemberId);

        const positions =

        scoped

        ? this.deriveMemberPositions(

            scopeMemberId

        )

        : InvestmentAPI

            .getPositions();

        const summary =

        InvestmentAPI

        .getPortfolioSummary();

        const totalValue =

        scoped

        ? positions.reduce(

            (sum, position) =>

                sum +

                Number(position.marketValue || 0),

            0

        )

        : Number(

            summary.totalValue || 0

        );

        let totalCost = 0;

        let totalGainLoss = 0;

        const holdings =

        positions.map(

            position => {

                const marketValue =

                Number(

                    position.marketValue || 0

                );

                const costBasis =

                Number(

                    position.costBasis || 0

                );

                const gainLoss =

                marketValue -

                costBasis;

                const returnRate =

                costBasis > 0

                ? gainLoss /

                    costBasis *

                    100

                : 0;

                const weight =

                totalValue > 0

                ? marketValue /

                    totalValue *

                    100

                : 0;

                totalCost +=

                costBasis;

                totalGainLoss +=

                gainLoss;

                const signal =

                decideSignal(

                    weight,

                    returnRate

                );

                return {

                    symbol:

                    position.symbol || "",

                    name:

                    position.name || "",

                    quantity:

                    Number(

                        position.quantity || 0

                    ),

                    averageCost:

                    Number(

                        position.averageCost || 0

                    ),

                    currentPrice:

                    Number(

                        position.currentPrice || 0

                    ),

                    costBasis,

                    marketValue,

                    gainLoss,

                    returnRate,

                    weight,

                    signalCode:

                    signal.code,

                    signalReason:

                    signal.reasonCode

                };

            }

        );

        const warnings =

        RiskEngine

        .concentrationRisk(

            positions.map(

                position => ({

                    symbol:

                    position.symbol,

                    allocationRatio:

                    totalValue > 0

                    ? Number(

                        position.marketValue || 0

                    ) /

                        totalValue *

                        100

                    : 0

                })

            )

        );

        return {

            totalValue,

            totalCost,

            totalGainLoss,

            totalReturnRate:

            totalCost > 0

            ? totalGainLoss /

                totalCost *

                100

            : 0,

            holdings,

            warnings,

            scopedPositions:

            positions,

            scopeMemberId,

            allocation:

            scoped

            ? {}

            : summary.allocation || {},

            concentration:

            scoped

            ? {}

            : summary.concentration || {}

        };

    },

    generateInvestmentReview(){

        const portfolio =

        this.getPortfolioStatus();

        const performance =

        this.getPerformanceReport();

        const risk =

        this.getRiskAnalysis();

        return {

            portfolio,

            performance,

            risk,

            summary:

            "Investment review generated"

        };

    }

};

export default InvestmentAgent;
