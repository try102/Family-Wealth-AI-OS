/*

Family Wealth AI OS

Asset API

Public Interface

*/

import AssetService from "../services/assetService.js";

const AssetAPI = {

    create(

        asset

    ){

        return AssetService.createAsset(

            asset

        );

    },

    getAll(){

        return AssetService.getAssets();

    },

    getById(

        id

    ){

        return AssetService.getAsset(

            id

        );

    },

    update(

        asset

    ){

        return AssetService.updateAsset(

            asset

        );

    },

    remove(

        id

    ){

        return AssetService.deleteAsset(

            id

        );

    },

    getTotalValue(){

        return AssetService.getTotalValue();

    }

};

export default AssetAPI;
