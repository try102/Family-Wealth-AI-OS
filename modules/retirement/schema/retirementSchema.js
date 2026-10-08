/*

Family Wealth AI OS V7

Retirement Schema

退休规划参数

*/

const RetirementSchema = {

    create(

        data = {}

    ){

        return {

            currentAge:

                Number(

                    data.currentAge || 45

                ),

            retirementAge:

                Number(

                    data.retirementAge || 65

                ),

            lifeExpectancy:

                Number(

                    data.lifeExpectancy || 90

                ),

            annualExpense:

                Number(

                    data.annualExpense || 0

                ),

            annualSavings:

                Number(

                    data.annualSavings || 0

                ),

            expectedReturn:

                Number(

                    data.expectedReturn ?? 5

                )

        };

    }

};

export default RetirementSchema;
