/*

========================================

Family Wealth AI OS V7.0

Tax Manager Test

========================================

*/

const TaxManager = require("../taxManager");

describe("Tax Manager Test", ()=>{

    test("Create Tax Plan", ()=>{

        const manager = new TaxManager();

        const plan = manager.createPlan({

            year: 2026,

            income: 200000,

            deductions: 30000

        });

        expect(plan.year)

            .toBe(2026);

        expect(

            manager.getAllPlans().length

        )

        .toBe(1);

    });

    test("Find Tax Plan By Year", ()=>{

        const manager = new TaxManager();

        manager.createPlan({

            year: 2026,

            income: 200000

        });

        const plan =

            manager.getPlanByYear(2026);

        expect(plan.income)

            .toBe(200000);

    });

    test("Update Tax Plan", ()=>{

        const manager = new TaxManager();

        manager.createPlan({

            year: 2026,

            income: 200000

        });

        const updated =

            manager.updatePlan(

                2026,

                {

                    income:250000

                }

            );

        expect(updated.income)

            .toBe(250000);

    });

    test("Delete Tax Plan", ()=>{

        const manager = new TaxManager();

        manager.createPlan({

            year:2026

        });

        const result =

            manager.deletePlan(2026);

        expect(result)

            .toBe(true);

        expect(

            manager.getAllPlans().length

        )

        .toBe(0);

    });

    test("Tax Summary Calculation", ()=>{

        const manager = new TaxManager();

        manager.createPlan({

            year:2026,

            income:200000,

            deductions:30000

        });

        const summary =

            manager.getTaxSummary(2026);

        expect(summary.taxableIncome)

            .toBe(170000);

    });

});
