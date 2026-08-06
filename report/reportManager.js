/*

Family Wealth AI OS V7.6

Report Manager

*/

import Report from "./report.js";

const ReportManager = {

    reports: [],

    add(

        report

    ){

        if(

            !(report instanceof Report)

        ){

            throw new Error(

                "Invalid report"

            );

        }

        this.reports.push(

            report

        );

        return report;

    },

    list(){

        return this.reports;

    },

    get(

        id

    ){

        return this.reports.find(

            report =>

            report.id === id

        );

    },

    update(

        id,

        data

    ){

        const report =

        this.get(

            id

        );

        if(

            !report

        ){

            return null;

        }

        Object.assign(

            report,

            data

        );

        return report;

    },

    remove(

        id

    ){

        this.reports =

        this.reports.filter(

            report =>

            report.id !== id

        );

    },

    clear(){

        this.reports=[];

    }

};

export default ReportManager;
