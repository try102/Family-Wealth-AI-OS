/*

Family Wealth AI OS V7

Liability Schema

家庭负债数据模型

*/

const LiabilitySchema = {

    create(

        data = {}

    ){

        const now =

        new Date()

        .toISOString();

        return {

            id:

            data.id ||

            Date.now(),

            name:

            data.name || "",

            category:

            data.category ||

            "Other",

            lender:

            data.lender || "",

            owner:

            data.owner || "",

            currency:

            data.currency ||

            "USD",

            principal:

            Number(

                data.principal || 0

            ),

            currentBalance:

            Number(

                data.currentBalance || 0

            ),

            interestRate:

            Number(

                data.interestRate || 0

            ),

            minimumPayment:

            Number(

                data.minimumPayment || 0

            ),

            monthlyPayment:

            Number(

                data.monthlyPayment || 0

            ),

            paymentFrequency:

            data.paymentFrequency ||

            "Monthly",

            startDate:

            data.startDate || "",

            maturityDate:

            data.maturityDate || "",

            status:

            data.status ||

            "ACTIVE",

            secured:

            data.secured ??

            true,

            collateral:

            data.collateral || "",

            note:

            data.note || "",

            createdAt:

            data.createdAt ||

            now,

            updatedAt:

            data.updatedAt ||

            now

        };

    }

};

export default LiabilitySchema;
