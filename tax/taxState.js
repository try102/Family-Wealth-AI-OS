/*

Family Wealth AI OS V7.7

Tax State

Tax 模块运行状态模型

*/

class TaxState {

    constructor(){

        this.taxYear = null;

        this.status =

            "initialized";

        this.report = null;

        this.optimization = null;

    }

    // =====================

    // Set Tax Year

    // =====================

    setTaxYear(year){

        this.taxYear = year;

    }

    // =====================

    // Update Report

    // =====================

    setReport(report){

        this.report = report;

        this.status =

            "report_updated";

    }

    // =====================

    // Update Optimization

    // =====================

    setOptimization(result){

        this.optimization = result;

        this.status =

            "optimization_updated";

    }

    // =====================

    // Get State

    // =====================

    getState(){

        return {

            taxYear:

                this.taxYear,

            status:

                this.status,

            report:

                this.report,

            optimization:

                this.optimization

        };

    }

}

export default TaxState;
