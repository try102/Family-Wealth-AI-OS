/*

Family Wealth AI OS

Position Schema

*/

const PositionSchema = {

    // 唯一ID

    id:"",

    // 家庭ID

    familyId:"",

    // 投资账户

    accountId:"",

    // 投资ID

    investmentId:"",

    // 股票代码

    symbol:"",

    // 名称

    name:"",

    // 持有数量

    quantity:0,

    // 平均成本

    averageCost:0,

    // 总成本

    costBasis:0,

    // 当前价格

    currentPrice:0,

    // 当前市值

    marketValue:0,

    // 未实现盈亏

    unrealizedGainLoss:0,

    // 收益率

    returnRate:0,

    // 权重

    allocationRatio:0,

    // 币种

    currency:"USD",

    // 更新时间

    updatedAt:""

};

export default PositionSchema;
