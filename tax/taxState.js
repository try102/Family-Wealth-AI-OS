/*

 

Family Wealth AI OS V7.7

 

Tax State

 

Tax 模块运行状态模型

 

负责保存 Tax 子系统当前运行状态

 

*/

class TaxState {

    constructor(){

        this.taxYear = null;

        this.status =

            "created";

        this.report = null;

        this.optimization = null;

        this.advice = null;

        this.analysis = null;

        this.initializedAt = null;

        this.updatedAt = null;

    }

    // ==================================================

    // Initialize

    // ==================================================

    initialize(){

        this.status =

            "initialized";

        this.initializedAt =

            new Date()

                .toISOString();

        this.updatedAt =

            this.initializedAt;

        return this.getState();

    }

    // ==================================================

    // Set Tax Year

    // ==================================================

    setTaxYear(

        year

    ){

        this.taxYear =

            Number(

                year || 0

            );

        this.touch();

        return this.taxYear;

    }

    // ==================================================

    // Update Report

    // ==================================================

    setReport(

        report = null

    ){

        this.report =

            report;

        if(

            report &&

            report.taxYear !==

                undefined

        ){

            this.taxYear =

                report.taxYear;

        }

        this.status =

            "report_updated";

        this.touch();

        return this.report;

    }

    // ==================================================

    // Update Optimization

    // ==================================================

    setOptimization(

        result = null

    ){

        this.optimization =

            result;

        this.status =

            "optimization_updated";

        this.touch();

        return this.optimization;

    }

    // ==================================================

    // Update Advisor Result

    // ==================================================

    setAdvice(

        advice = null

    ){

        this.advice =

            advice;

        this.status =

            "advice_updated";

        this.touch();

        return this.advice;

    }

    // ==================================================

    // Update Full Analysis

    // ==================================================

    setAnalysis(

        analysis = {}

    ){

        this.analysis =

            analysis;

        if(

            analysis.report

        ){

            this.setReport(

                analysis.report

            );

        }

        if(

            analysis.optimization

        ){

            this.setOptimization(

                analysis.optimization

            );

        }

        if(

            analysis.advice

        ){

            this.setAdvice(

                analysis.advice

            );

        }

        this.status =

            "analysis_updated";

        this.touch();

        return this.analysis;

    }

    // ==================================================

    // Clear Analysis

    // ==================================================

    clear(){

        this.report = null;

        this.optimization = null;

        this.advice = null;

        this.analysis = null;

        this.status =

            "initialized";

        this.touch();

        return this.getState();

    }

    // ==================================================

    // Update Timestamp

    // ==================================================

    touch(){

        this.updatedAt =

            new Date()

                .toISOString();

    }

    // ==================================================

    // Get State

    // ==================================================

    getState(){

        return {

            taxYear:

                this.taxYear,

            status:

                this.status,

            report:

                this.report,

            optimization:

                this.optimization,

            advice:

                this.advice,

            analysis:

                this.analysis,

            initializedAt:

                this.initializedAt,

            updatedAt:

                this.updatedAt

        };

    }

}

export default TaxState;
