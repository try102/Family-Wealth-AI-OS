/*
Family Wealth AI OS V7
Member Schema
家庭成员档案：姓名 + 关系 + 备注。
*/
const MemberSchema = {
    create(data = {}) {
        const now = new Date().toISOString();
        return {
            id:
                data.id ||
                "member_" +
                Date.now() +
                "_" +
                Math.random().toString(36).slice(2, 9),
            name: data.name || "",
            relation: data.relation || "",
            note: data.note || "",
            createdAt: data.createdAt || now,
            updatedAt: now
        };
    }
};
export default MemberSchema;
