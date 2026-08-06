/*

Family Wealth AI OS

Cash Flow Forecast

*/

const CashFlowForecast = {

    monthlyForecast(

        monthlyIncome,

        monthlyExpense,

        months = 12

    ){

        const result = [];

        let balance = 0;

        for(

            let i=1;

            i<=months;

            i++

        ){

            balance +=

            monthlyIncome

            -

            monthlyExpense;

            result.push({

                month:i,

                income:

                monthlyIncome,

                expense:

                monthlyExpense,

                cashFlow:

                balance

            });

        }

        return result;

    },

    annualForecast(

        monthlyIncome,

        monthlyExpense

    ){

        return {

            yearlyIncome:

            monthlyIncome * 12,

            yearlyExpense:

            monthlyExpense * 12,

            yearlyNet:

            (

            monthlyIncome

            -

            monthlyExpense

            )

            *

            12

        };

    },

    cashReserveMonths(

        cashBalance,

        monthlyExpense

    ){

        if(

            monthlyExpense <=0

        ){

            return 0;

        }

        return Number(

            (

            cashBalance

            /

            monthlyExpense

            )

            .toFixed(2)

        );

    }

};

export default CashFlowForecast;
