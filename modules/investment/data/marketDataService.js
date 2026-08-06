/*

Family Wealth AI OS

Market Data Service

*/

const MarketDataService = {

    provider:

    "LOCAL",

    setProvider(

        provider

    ){

        this.provider = provider;

    },

    getQuote(

        symbol

    ){

        /*

        

        Future:

        Connect external market API

        

        */

        return {

            symbol,

            price:0,

            change:0,

            provider:

            this.provider

        };

    },

    getHistoricalData(

        symbol,

        period="1Y"

    ){

        return {

            symbol,

            period,

            data:[],

            provider:

            this.provider

        };

    },

    getMarketStatus(){

        return {

            status:

            "NOT_CONNECTED",

            message:

            "External market data provider not configured"

        };

    }

};

export default MarketDataService;
