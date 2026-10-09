/*
Family Wealth AI OS V7
Member Module
家庭成员模块入口
*/
import MemberAPI from "./api/memberAPI.js?v=20261008ap";
import MemberAgent from "./agent/memberAgent.js?v=20261008ae";
import MemberView from "./ui/memberView.js?v=20261009bh";

export const MemberModule = {
    name: "Member Module V7",
    api: MemberAPI,
    agent: MemberAgent,
    view: MemberView
};
export default MemberModule;
