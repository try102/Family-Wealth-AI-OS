/*

    

Family Wealth AI OS V7

Cashflow Schema

现金流数据模型

*/

const cashflowSchema = {

    name:

        "Cashflow Schema V7",

    version:

        "7.0",

    // ==================================================

    // Create

    // ==================================================

    create(data){

        const now =

            new Date();

        const type =

            data.type === "INCOME"

                ? "INCOME"

                : "EXPENSE";

        const amount =

            Number(

                data.amount || 0

            );

        const frequency =

            this.normalizeFrequency(

                data.frequency

            );

        const startDate =

            data.startDate ||

            now

                .toISOString()

                .slice(0, 10);

        const endDate =

            data.endDate ||

            null;

        const record = {

            // ------------------------------------------

            // Identity

            // ------------------------------------------

            id:

                data.id ||

                Date.now()

                    .toString(),

            // ------------------------------------------

            // Basic Information

            // ------------------------------------------

            type,

            category:

                data.category ||

                "Other",

            description:

                data.description ||

                "",

            // ------------------------------------------

            // Amount

            // ------------------------------------------

            amount,

            // ------------------------------------------

            // Time

            // ------------------------------------------

            frequency,

            startDate,

            endDate,

            // ------------------------------------------

            // Annualized

            // ------------------------------------------

            annualizedAmount:

                this.calculateAnnualizedAmount(

                    amount,

                    frequency

                ),

            // ------------------------------------------

            // Status

            // ------------------------------------------

            status:

                data.status ||

                "ACTIVE",

            // ------------------------------------------

            // Timestamps

            // ------------------------------------------

            createdAt:

                data.createdAt ||

                now.toISOString(),

            updatedAt:

                now.toISOString()

        };

        return record;

    },

    // ==================================================

    // Normalize Frequency

    // ==================================================

    normalizeFrequency(

        frequency

    ){

        const value =

            String(

                frequency ||

                "YEARLY"

            )

            .toUpperCase();

        const allowed = [

            "MONTHLY",

            "QUARTERLY",

            "YEARLY",

            "ONE_TIME"

        ];

        if(

            allowed.includes(

                value

            )

        ){

            return value;

        }

        return "YEARLY";

    },

    // ==================================================

    // Annualized Amount

    // ==================================================

    calculateAnnualizedAmount(

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

    },

    // ==================================================

    // Validate

    // ==================================================

    validate(

        data

    ){

        if(

            !data

        ){

            return false;

        }

        if(

            data.type !== "INCOME" &&

            data.type !== "EXPENSE"

        ){

            return false;

        }

        if(

            Number.isNaN(

                Number(

                    data.amount

                )

            )

        ){

            return false;

        }

        const frequency =

            this.normalizeFrequency(

                data.frequency

            );

        if(

            !frequency

        ){

            return false;

        }

        return true;

    },

    // ==================================================

    // Update

    // ==================================================

    update(

        existing,

        data

    ){

        const merged = {

            ...existing,

            ...data

        };

        const amount =

            Number(

                merged.amount || 0

            );

        const frequency =

            this.normalizeFrequency(

                merged.frequency

            );

        return {

            ...merged,

            type:

                merged.type === "INCOME"

                    ? "INCOME"

                    : "EXPENSE",

            category:

                merged.category ||

                "Other",

            description:

                merged.description ||

                "",

            amount,

            frequency,

            startDate:

                merged.startDate ||

                new Date()

                    .toISOString()

                    .slice(0, 10),

            endDate:

                merged.endDate ||

                null,

            annualizedAmount:

                this.calculateAnnualizedAmount(

                    amount,

                    frequency

                ),

            updatedAt:

                new Date()

                    .toISOString()

        };

    }

};

export default cashflowSchema;
