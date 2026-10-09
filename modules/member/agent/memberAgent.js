/*
Family Wealth AI OS V7
Member Agent
家庭成员智能入口
*/
import MemberAPI from "../api/memberAPI.js?v=20261008ae";

const MemberAgent = {
    getMembers() {
        return MemberAPI.getMembers();
    },

    getStats() {
        return MemberAPI.getMemberStats();
    },

    getReport(memberId = "", year) {
        return MemberAPI.getReport(memberId, year);
    }
};
export default MemberAgent;
