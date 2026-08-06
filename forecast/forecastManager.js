/*

Family Wealth AI OS V7.3

Forecast Manager

*/

import Forecast from "./forecast.js";

const ForecastManager = {

    forecasts: [],

    add(

        forecast

    ){

        if(

            !(forecast instanceof Forecast)

        ){

            throw new Error(

                "Invalid forecast"

            );

        }

        this.forecasts.push(

            forecast

        );

        return forecast;

    },

    list(){

        return this.forecasts;

    },

    get(

        id

    ){

        return this.forecasts.find(

            forecast =>

            forecast.id === id

        );

    },

    update(

        id,

        data

    ){

        const forecast =

        this.get(

            id

        );

        if(

            !forecast

        ){

            return null;

        }

        Object.assign(

            forecast,

            data

        );

        return forecast;

    },

    remove(

        id

    ){

        this.forecasts =

        this.forecasts.filter(

            forecast =>

            forecast.id !== id

        );

    },

    clear(){

        this.forecasts=[];

    }

};

export default ForecastManager;
