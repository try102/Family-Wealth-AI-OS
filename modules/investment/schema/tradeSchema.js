/*

Family Wealth AI OS

Trade Schema

*/

const TradeSchema = {

    // 唯一ID

    id:"",

    // 家庭ID

    familyId:"",

    // 投资账户

    accountId:"",

    // 投资标的

    investmentId:"",

    // 股票代码

    symbol:"",

    // 名称

    name:"",

    /*

    

    BUY

    SELL

    DIVIDEND

    SPLIT

    

    */

    action:"",

    // 数量

    quantity:0,

    // 成交价格

    price:0,

    // 交易金额

    amount:0,

    // 手续费

    commission:0,

    // 税费

    tax:0,

    // 净金额

    netAmount:0,

    // 交易日期

    tradeDate:"",

    // 币种

    currency:"USD",

    // 关联Transaction

    transactionId:"",

    // 状态

    status:"COMPLETED",

    createdAt:""

};

export default TradeSchema;
