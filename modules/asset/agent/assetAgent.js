/*

Family Wealth AI OS

Asset Agent

*/

import AssetAPI from "../api/assetAPI.js";

import AssetAnalysisEngine from "../engines/assetAnalysisEngine.js";

const AssetAgent = {

    getAssetSummary(){

        const assets =

        AssetAPI.getAll();

        const total =

        AssetAnalysisEngine

        .calculateTotalValue(

            assets

        );

        const allocation =

        AssetAnalysisEngine

        .allocationAnalysis(

            assets

        );

        const liquidity =

        AssetAnalysisEngine

        .liquidityAnalysis(

            assets

        );

        return {

            totalValue: total,

            allocation,

            liquidity

        };

    },

    answer(

        question

    ){

        const summary =

        this.getAssetSummary();

        return {

            question,

            context: summary,

            message:

            "Asset analysis generated"

        };

    }

};

export default AssetAgent;
