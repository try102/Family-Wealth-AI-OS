/*
Family Wealth AI OS V7
Member Repository
家庭成员档案持久化（localStorage: family_members）
*/
import DataService from "../../../core/database/dataService.js?v=20261008ae";
import MemberSchema from "../schema/memberSchema.js?v=20261008ae";

const MEMBERS_KEY = "family_members";

const MemberRepository = {
    getAll() {
        const saved = DataService.load(MEMBERS_KEY);
        const list = Array.isArray(saved) ? saved : [];
        return list.map(item => MemberSchema.create(item));
    },

    saveAll(members) {
        DataService.save(MEMBERS_KEY, members || []);
        return members;
    },

    save(member) {
        const normalized = MemberSchema.create(member || {});
        const members = this.getAll();
        const index = members.findIndex(item => item.id === normalized.id);
        if (index >= 0) {
            members[index] = normalized;
        } else {
            members.push(normalized);
        }
        this.saveAll(members);
        return normalized;
    },

    remove(id) {
        const members = this.getAll().filter(item => item.id !== id);
        this.saveAll(members);
        return members;
    }
};
export default MemberRepository;
