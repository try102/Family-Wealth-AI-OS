/*

Family Wealth AI OS V7

Expense Schema

家庭支出数据结构定义

*/

const ExpenseSchema = {

    create(

        data = {}

    ){

        return {

            id:

            data.id ||

            Date.now(),

            name:

            data.name ||

            "",

            category:

            data.category ||

            "Other",

            amount:

            Number(

                data.amount || 0

            ),

            currency:

            data.currency ||

            "USD",

            date:

            data.date ||

            "",

            accountId:

            data.accountId ||

            "",

            memberId:

            data.memberId ||

            "",

            linkedAccount:

            data.linkedAccount ||

            "",

            note:

            data.note ||

            ""

        };

    }

};

export default ExpenseSchema;
