/*

Family Wealth AI OS

Audit Report Generator

*/

const AuditReport = {

    reports:[],

    create(

        title,

        sections=[]

    ){

        const report = {

            id:

            Date.now(),

            title,

            sections,

            createdAt:

            new Date()

            .toISOString()

        };

        this.reports.push(

            report

        );

        return report;

    },

    addSection(

        id,

        section

    ){

        const report =

        this.reports.find(

            item =>

            item.id === id

        );

        if(

            !report

        ){

            return null;

        }

        report.sections.push(

            section

        );

        return report;

    },

    get(

        id

    ){

        return this.reports.find(

            item =>

            item.id === id

        );

    },

    list(){

        return this.reports;

    },

    clear(){

        this.reports=[];

    }

};

export default AuditReport;
