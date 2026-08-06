/*

Family Wealth AI OS

Transaction Schema

*/

const TransactionSchema = {

    // 唯一ID

    id:"",

    // 家庭关系

    familyId:"",

    personId:"",

    // 账户

    accountId:"",

    // 类型

    type:"",

    // 分类

    category:"",

    // 描述

    description:"",

    // 金额

    amount:0,

    // 方向

    direction:"",

    // 货币

    currency:"USD",

    // 对方

    counterparty:"",

    // 关联资产

    assetId:"",

    // 投资标识

    investmentId:"",

    // 税务分类

    taxCategory:"",

    // 日期

    date:"",

    // 状态

    status:"COMPLETED",

    // 时间

    createdAt:"",

    updatedAt:""

};

export default TransactionSchema;
