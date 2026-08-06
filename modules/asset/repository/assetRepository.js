/*

Family Wealth AI OS

Asset Repository

*/

import DataService from "../../../core/database/dataService.js";

import Helpers from "../../../core/utils/helpers.js";

const STORAGE_KEY =

"family_assets";

const AssetRepository = {

    findAll(){

        return (

            DataService.load(

                STORAGE_KEY

            )

            ||

            []

        );

    },

    findById(

        id

    ){

        const assets =

        this.findAll();

        return assets.find(

            asset =>

            asset.id === id

        );

    },

    save(

        asset

    ){

        let assets =

        this.findAll();

        if(!asset.id){

            asset.id =

            Helpers.generateId();

            asset.createdAt =

            new Date()

            .toISOString();

        }

        asset.updatedAt =

        new Date()

        .toISOString();

        const index =

        assets.findIndex(

            item =>

            item.id === asset.id

        );

        if(index >=0){

            assets[index] = asset;

        }

        else{

            assets.push(asset);

        }

        DataService.save(

            STORAGE_KEY,

            assets

        );

        return asset;

    },

    delete(

        id

    ){

        let assets =

        this.findAll();

        assets =

        assets.filter(

            asset =>

            asset.id !== id

        );

        DataService.save(

            STORAGE_KEY,

            assets

        );

    }

};

export default AssetRepository;
