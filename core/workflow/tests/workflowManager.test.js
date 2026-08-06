/*

Family Wealth AI OS

Workflow Manager Test

*/

import WorkflowManager from "../workflowManager.js";

// =====================

// Reset

// =====================

WorkflowManager.clear();

// =====================

// Create Test

// =====================

const workflow =

WorkflowManager.create(

    "YEARLY_WEALTH_CHECK"

);

console.log(

    "Workflow:",

    workflow

);

if(

    workflow.name !==

    "YEARLY_WEALTH_CHECK"

){

    throw new Error(

        "Workflow create failed"

    );

}

// =====================

// Add Steps Test

// =====================

WorkflowManager.addStep(

    "YEARLY_WEALTH_CHECK",

    (data)=>{

        return {

            ...data,

            assetChecked:

            true

        };

    }

);

WorkflowManager.addStep(

    "YEARLY_WEALTH_CHECK",

    (data)=>{

        return {

            ...data,

            riskChecked:

            true

        };

    }

);

const stored =

WorkflowManager.list()

.YEARLY_WEALTH_CHECK;

if(

    stored.steps.length !==2

){

    throw new Error(

        "Workflow add step failed"

    );

}

// =====================

// Run Test

// =====================

const result =

WorkflowManager.run(

    "YEARLY_WEALTH_CHECK",

    {

        user:

        "OWNER"

    }

);

console.log(

    "Workflow Result:",

    result

);

if(

    result.assetChecked !== true

){

    throw new Error(

        "Workflow first step failed"

    );

}

if(

    result.riskChecked !== true

){

    throw new Error(

        "Workflow second step failed"

    );

}

// =====================

// Remove Test

// =====================

WorkflowManager.remove(

    "YEARLY_WEALTH_CHECK"

);

if(

    WorkflowManager.list()

    .YEARLY_WEALTH_CHECK

){

    throw new Error(

        "Workflow remove failed"

    );

}

console.log(

    "Workflow Manager Test Passed"

);
