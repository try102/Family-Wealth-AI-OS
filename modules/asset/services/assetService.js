/*

Family Wealth AI OS

Asset Service

*/

import AssetRepository from "../repository/assetRepository.js";

import EventBus from "../../../core/events/eventBus.js";

import EventTypes from "../../../core/events/eventTypes.js";

const AssetService = {

    createAsset(

        asset

    ){

        const savedAsset =

        AssetRepository.save(

            asset

        );

        EventBus.publish(

            EventTypes.ASSET_CREATED,

            savedAsset

        );

        return savedAsset;

    },

    getAssets(){

        return AssetRepository.findAll();

    },

    getAsset(

        id

    ){

        return AssetRepository.findById(

            id

        );

    },

    updateAsset(

        asset

    ){

        const updated =

        AssetRepository.save(

            asset

        );

        EventBus.publish(

            EventTypes.ASSET_UPDATED,

            updated

        );

        return updated;

    },

    deleteAsset(

        id

    ){

        AssetRepository.delete(

            id

        );

        EventBus.publish(

            EventTypes.ASSET_DELETED,

            id

        );

    },

    getTotalValue(){

        const assets =

        this.getAssets();

        return assets.reduce(

            (total,asset)=>

            total +

            Number(

                asset.currentValue || 0

            ),

            0

        );

    }

};

export default AssetService;
