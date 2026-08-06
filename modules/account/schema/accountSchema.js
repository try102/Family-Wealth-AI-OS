/*

Family Wealth AI OS

Account Schema

*/

const AccountSchema = {

    // 唯一标识

    id:"",

    // 基础信息

    name:"",

    type:"",

    institution:"",

    // 所属关系

    familyId:"",

    ownerId:"",

    // 账户状态

    status:"ACTIVE",

    // 账户类别

    category:"",

    // 资产关联

    assetIds:[],

    // 交易能力

    canTrade:false,

    // 现金流能力

    cashFlowEnabled:false,

    // 税务属性

    taxType:"",

    // 货币

    currency:"USD",

    // 当前余额

    balance:0,

    // 时间

    createdAt:"",

    updatedAt:""

};

export default AccountSchema;
