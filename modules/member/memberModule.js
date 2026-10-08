/*
Family Wealth AI OS V7
Member Module
家庭成员模块入口
*/
import MemberAPI from "./api/memberAPI.js";
import MemberAgent from "./agent/memberAgent.js";
import MemberView from "./ui/memberView.js";

export const MemberModule = {
    name: "Member Module V7",
    api: MemberAPI,
    agent: MemberAgent,
    view: MemberView
};
export default MemberModule;
