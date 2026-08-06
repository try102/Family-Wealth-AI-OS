/*

Family Wealth AI OS

Asset AI Layer

*/

import AssetAgent from "../agent/assetAgent.js";

const AssetAI = {

    analyze(){

        return AssetAgent

        .getAssetSummary();

    },

    generateAdvice(

        question

    ){

        const result =

        AssetAgent.answer(

            question

        );

        return {

            type:

            "ASSET_ANALYSIS",

            data:

            result

        };

    }

};

export default AssetAI;
