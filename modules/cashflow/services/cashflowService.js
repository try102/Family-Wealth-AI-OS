/*

 

Family Wealth AI OS V7

Cashflow Service

现金流业务服务层

负责：

1. 创建现金流

2. 查询现金流

3. 更新现金流

4. 删除现金流

5. 计算年度化收入

6. 计算年度化支出

7. 计算年度化净现金流

8. 提供驾驶舱使用的统一 Summary

*/

import cashflowRepository

    from "../cashflowRepository.js";

// ==================================================

//

// Annualization

//

// ==================================================

function annualize(

    amount,

    frequency

){

    const value =

        Number(

            amount || 0

        );

    switch(

        frequency

    ){

        case "MONTHLY":

            return value * 12;

        case "QUARTERLY":

            return value * 4;

        case "YEARLY":

            return value;

        case "ONE_TIME":

            return value;

        default:

            return value;

    }

}

// ==================================================

//

// Normalize Record

//

// ==================================================

function normalizeRecord(

    data = {}

){

    const amount =

        Number(

            data?.amount || 0

        );

    const frequency =

        data?.frequency ||

        "YEARLY";

    return {

        ...data,

        amount,

        frequency,

        annualizedAmount:

            annualize(

                amount,

                frequency

            )

    };

}

// ==================================================

//

// Cashflow Service

//

// ==================================================

const cashflowService = {

    name:

        "Cashflow Service V7",

    // ==================================================

    // Create

    // ==================================================

    create(

        data = {}

    ){

        const normalized =

            normalizeRecord(

                data

            );

        return cashflowRepository.create(

            normalized

        );

    },

    // ==================================================

    // List

    // ==================================================

    list(){

        return cashflowRepository.findAll();

    },

    // ==================================================

    // Get

    // ==================================================

    get(

        id

    ){

        return cashflowRepository.findById(

            id

        );

    },

    // ==================================================

    // Update

    // ==================================================

    update(

        id,

        data = {}

    ){

        const normalized =

            normalizeRecord(

                data

            );

        return cashflowRepository.update(

            id,

            normalized

        );

    },

    // ==================================================

    // Delete

    // ==================================================

    delete(

        id

    ){

        return cashflowRepository.remove(

            id

        );

    },

    // ==================================================

    // Summary

    // ==================================================

    summary(){

        const list =

            this.list();

        let income = 0;

        let expense = 0;

        list.forEach(

            item => {

                const annualized =

                    Number(

                        item.annualizedAmount ??

                        annualize(

                            item.amount,

                            item.frequency

                        )

                    );

                if(

                    item.type ===

                    "INCOME"

                ){

                    income +=

                        annualized;

                }

                if(

                    item.type ===

                    "EXPENSE"

                ){

                    expense +=

                        annualized;

                }

            }

        );

        return {

            income,

            expense,

            net:

                income -

                expense

        };

    },

    // ==================================================

    // Monthly Cashflow

    // ==================================================

    monthlyCashflow(){

        const list =

            this.list();

        let income = 0;

        let expense = 0;

        list.forEach(

            item => {

                const amount =

                    Number(

                        item.amount || 0

                    );

                if(

                    item.type ===

                    "INCOME"

                ){

                    if(

                        item.frequency ===

                        "MONTHLY"

                    ){

                        income += amount;

                    }

                    else if(

                        item.frequency ===

                        "QUARTERLY"

                    ){

                        income +=

                            amount / 3;

                    }

                    else if(

                        item.frequency ===

                        "YEARLY"

                    ){

                        income +=

                            amount / 12;

                    }

                    else if(

                        item.frequency ===

                        "ONE_TIME"

                    ){

                        income += amount;

                    }

                }

                if(

                    item.type ===

                    "EXPENSE"

                ){

                    if(

                        item.frequency ===

                        "MONTHLY"

                    ){

                        expense += amount;

                    }

                    else if(

                        item.frequency ===

                        "QUARTERLY"

                    ){

                        expense +=

                            amount / 3;

                    }

                    else if(

                        item.frequency ===

                        "YEARLY"

                    ){

                        expense +=

                            amount / 12;

                    }

                    else if(

                        item.frequency ===

                        "ONE_TIME"

                    ){

                        expense += amount;

                    }

                }

            }

        );

        return {

            income,

            expense,

            net:

                income -

                expense

        };

    }

};

export default cashflowService;
