/*

Family Wealth AI OS

Account Analysis Engine

*/

const AccountAnalysisEngine = {

    calculateTotalBalance(

        accounts

    ){

        return accounts.reduce(

            (total, account)=>

            total +

            Number(

                account.balance || 0

            ),

            0

        );

    },

    categoryAnalysis(

        accounts

    ){

        const total =

        this.calculateTotalBalance(

            accounts

        );

        if(total === 0){

            return {};

        }

        const result = {};

        accounts.forEach(

            account=>{

                const category =

                account.category ||

                "OTHER";

                if(!result[category]){

                    result[category]=0;

                }

                result[category] +=

                Number(

                    account.balance || 0

                );

            }

        );

        Object.keys(result)

        .forEach(

            key=>{

                result[key]={

                    value:

                    result[key],

                    ratio:

                    Number(

                    (

                    result[key]

                    /

                    total

                    *

                    100

                    )

                    .toFixed(2)

                    )

                };

            }

        );

        return result;

    },

    institutionAnalysis(

        accounts

    ){

        const result={};

        accounts.forEach(

            account=>{

                const institution =

                account.institution ||

                "Unknown";

                if(!result[institution]){

                    result[institution]=0;

                }

                result[institution] +=

                Number(

                    account.balance || 0

                );

            }

        );

        return result;

    }

};

export default AccountAnalysisEngine;
