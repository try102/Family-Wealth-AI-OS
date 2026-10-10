/*
Family Wealth AI OS V7
Member API
家庭成员统一接口层
*/
import MemberService from "../services/memberService.js?v=20261009bq";

const MemberAPI = {
    name: "Member API V7",

    getMembers() {
        return MemberService.getMembers();
    },

    getAll() {
        return MemberService.getMembers();
    },

    saveMember(data) {
        return MemberService.saveMember(data);
    },

    deleteMember(id) {
        return MemberService.deleteMember(id);
    },

    ensureDefaultAccounts() {
        return MemberService.ensureDefaultAccounts();
    },

    getMemberStats() {
        return MemberService.getMemberStats();
    },

    getReport(memberId = "", year) {
        return MemberService.getReport(memberId, year);
    }
};
export default MemberAPI;
