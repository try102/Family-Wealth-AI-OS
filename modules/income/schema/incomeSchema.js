/*

Family Wealth AI OS V7

Income Schema

家庭收入数据结构定义

*/

const IncomeSchema = {

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

            "其他",

            source:

            data.source ||

            "",

            amount:

            Number(

                data.amount || 0

            ),

            currency:

            data.currency ||

            "USD",

            frequency:

            data.frequency ||

            "annual",

            period:

            data.period ||

            "年度",

            owner:

            data.owner ||

            "",

            taxable:

            data.taxable !== undefined

            ?

            data.taxable

            :

            true,

            startDate:

            data.startDate ||

            "",

            endDate:

            data.endDate ||

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

export default IncomeSchema;
