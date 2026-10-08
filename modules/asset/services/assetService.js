/*

Family Wealth AI OS

Asset Service

*/

import AssetRepository from "../repository/assetRepository.js";

import EventBus from "../../../core/events/eventBus.js";

import EventTypes from "../../../core/events/eventTypes.js";

import TransactionIntegration from "../../../core/integration/transactionIntegration.js";

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

    },

    // =====================================================

    // Record Purchase

    // =====================================================

    recordPurchase(

        id,

        data = {}

    ){

        const asset =

        AssetRepository.findById(

            id

        );

        if (!asset) {

            return null;

        }

        const amount =

            Number(

                data.amount ||

                asset.purchaseValue ||

                0

            );

        /*

         * Record the Actual cash event in

         * Transaction when a real Account

         * is selected (same policy as

         * Income / Expense / Investment /

         * Liability). Never create a fake

         * Account ID.

         */

        if (

            amount > 0

        ){

            try {

                TransactionIntegration

                    .recordAssetPurchase({

                        date:

                            data.date ||

                            undefined,

                        accountId:

                            data.accountId,

                        amount,

                        currency:

                            asset.currency ||

                            "USD",

                        description:

                            data.description ||

                            (

                                "Asset purchase: " +

                                (

                                    asset.name ||

                                    "Asset"

                                )

                            ),

                        asset: {

                            assetId:

                                asset.id,

                            name:

                                asset.name ||

                                "",

                            category:

                                asset.category ||

                                ""

                        },

                        source:

                            "BusinessModule"

                    });

            } catch (purchaseError) {

                console.warn(

                    "Asset purchase transaction not recorded:",

                    purchaseError.message

                );

            }

        }

        asset.purchaseValue =

            amount;

        if (data.accountId) {

            asset.accountId =

                data.accountId;

        }

        return this.updateAsset(

            asset

        );

    },

    // =====================================================

    // Record Sale

    // =====================================================

    recordSale(

        id,

        data = {}

    ){

        const asset =

        AssetRepository.findById(

            id

        );

        if (!asset) {

            return null;

        }

        const amount =

            Number(

                data.amount ||

                asset.currentValue ||

                0

            );

        const costBasis =

            Number(

                asset.purchaseValue ||

                0

            );

        /*

         * The business module calculates

         * the capital gain (sale price

         * minus original cost).

         */

        const capitalGain =

            amount -

            costBasis;

        if (

            amount > 0

        ){

            try {

                TransactionIntegration

                    .recordAssetSale({

                        date:

                            data.date ||

                            undefined,

                        accountId:

                            data.accountId,

                        amount,

                        currency:

                            asset.currency ||

                            "USD",

                        description:

                            data.description ||

                            (

                                "Asset sale: " +

                                (

                                    asset.name ||

                                    "Asset"

                                )

                            ),

                        asset: {

                            assetId:

                                asset.id,

                            name:

                                asset.name ||

                                "",

                            category:

                                asset.category ||

                                "",

                            costBasis,

                            capitalGain

                        },

                        source:

                            "BusinessModule"

                    });

            } catch (saleError) {

                console.warn(

                    "Asset sale transaction not recorded:",

                    saleError.message

                );

            }

        }

        asset.currentValue =

            0;

        if (data.accountId) {

            asset.accountId =

                data.accountId;

        }

        return this.updateAsset(

            asset

        );

    }

};

export default AssetService;
