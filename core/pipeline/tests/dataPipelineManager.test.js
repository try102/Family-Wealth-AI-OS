/*

Family Wealth AI OS

Data Pipeline Manager Test

*/

import DataPipelineManager from "../dataPipelineManager.js";

// =====================

// Reset

// =====================

DataPipelineManager.clear();

// =====================

// Create Test

// =====================

const pipeline =

DataPipelineManager.create(

    "ASSET_IMPORT"

);

console.log(

    "Pipeline:",

    pipeline

);

if(

    pipeline.name !==

    "ASSET_IMPORT"

){

    throw new Error(

        "Pipeline create failed"

    );

}

// =====================

// Add Step Test

// =====================

DataPipelineManager.addStep(

    "ASSET_IMPORT",

    (data)=>{

        return {

            ...data,

            validated:

            true

        };

    }

);

DataPipelineManager.addStep(

    "ASSET_IMPORT",

    (data)=>{

        return {

            ...data,

            stored:

            true

        };

    }

);

if(

    DataPipelineManager

    .list()

    .ASSET_IMPORT

    .steps

    .length !==2

){

    throw new Error(

        "Pipeline add step failed"

    );

}

// =====================

// Run Test

// =====================

const result =

DataPipelineManager.run(

    "ASSET_IMPORT",

    {

        asset:

        "House"

    }

);

console.log(

    "Pipeline Result:",

    result

);

if(

    result.validated !== true

){

    throw new Error(

        "Pipeline run failed"

    );

}

if(

    result.stored !== true

){

    throw new Error(

        "Pipeline second step failed"

    );

}

// =====================

// Clear Test

// =====================

DataPipelineManager.clear();

if(

    Object.keys(

        DataPipelineManager.list()

    )

    .length !==0

){

    throw new Error(

        "Pipeline clear failed"

    );

}

console.log(

    "Data Pipeline Manager Test Passed"

);
