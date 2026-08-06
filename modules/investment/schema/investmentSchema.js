/*

Family Wealth AI OS

Investment Schema

*/

const InvestmentSchema = {

    // 唯一ID

    id:"",

    // 家庭ID

    familyId:"",

    // 所属账户

    accountId:"",

    // 投资名称

    name:"",

    // 股票代码

    symbol:"",

    // 投资类型

    type:"",

    /*

    

    STOCK

    ETF

    FUND

    BOND

    REIT

    CASH

    

    */

    // 数量

    quantity:0,

    // 成本

    costBasis:0,

    // 当前价值

    marketValue:0,

    // 当前价格

    currentPrice:0,

    // 币种

    currency:"USD",

    // 买入日期

    purchaseDate:"",

    // 投资策略

    strategy:"",

    /*

    

    GROWTH

    VALUE

    INCOME

    INDEX

    

    */

    // 风险等级

    riskLevel:"",

    /*

    

    LOW

    MEDIUM

    HIGH

    

    */

    // 状态

    status:"ACTIVE",

    createdAt:"",

    updatedAt:""

};

export default InvestmentSchema;
