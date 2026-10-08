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

    },

    recordPurchase(

        id,

        data

    ){

        return AssetService.recordPurchase(

            id,

            data

        );

    },

    recordSale(

        id,

        data

    ){

        return AssetService.recordSale(

            id,

            data

        );

    }

};

export default AssetAPI;
