/*

Family Wealth AI OS

Asset Schema

*/

const AssetSchema = {

    id:"",

    // 基础信息

    name:"",

    category:"",

    type:"",

    // 所属关系

    ownerId:"",

    familyId:"",

    // 账户关联

    accountId:"",

    // 价值信息

    currentValue:0,

    purchaseValue:0,

    currency:"USD",

    // 收益信息

    incomeType:"",

    expectedReturn:0,

    // 流动性

    liquidity:"",

    // 风险等级

    riskLevel:"",

    // 税务属性

    taxCategory:"",

    // 时间

    createdAt:"",

    updatedAt:""

};

export default AssetSchema;
