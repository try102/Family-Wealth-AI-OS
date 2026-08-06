/*

Family Wealth AI OS

Investment Repository

*/

import DataService from "../../../core/database/dataService.js";

import Helpers from "../../../core/utils/helpers.js";

const INVESTMENT_KEY =

"family_investments";

const POSITION_KEY =

"family_positions";

const TRADE_KEY =

"family_trades";

const InvestmentRepository = {

    // =====================

    // Investment

    // =====================

    getInvestments(){

        return (

            DataService.load(

                INVESTMENT_KEY

            )

            ||

            []

        );

    },

    saveInvestment(

        investment

    ){

        let data =

        this.getInvestments();

        if(!investment.id){

            investment.id =

            Helpers.generateId();

            investment.createdAt =

            new Date()

            .toISOString();

        }

        investment.updatedAt =

        new Date()

        .toISOString();

        const index =

        data.findIndex(

            item =>

            item.id === investment.id

        );

        if(index >=0){

            data[index] = investment;

        }

        else{

            data.push(investment);

        }

        DataService.save(

            INVESTMENT_KEY,

            data

        );

        return investment;

    },

    deleteInvestment(

        id

    ){

        const data =

        this.getInvestments()

        .filter(

            item =>

            item.id !== id

        );

        DataService.save(

            INVESTMENT_KEY,

            data

        );

    },

    // =====================

    // Position

    // =====================

    getPositions(){

        return (

            DataService.load(

                POSITION_KEY

            )

            ||

            []

        );

    },

    savePosition(

        position

    ){

        let data =

        this.getPositions();

        if(!position.id){

            position.id =

            Helpers.generateId();

        }

        const index =

        data.findIndex(

            item =>

            item.id === position.id

        );

        if(index>=0){

            data[index]=position;

        }

        else{

            data.push(position);

        }

        DataService.save(

            POSITION_KEY,

            data

        );

        return position;

    },

    // =====================

    // Trade

    // =====================

    getTrades(){

        return (

            DataService.load(

                TRADE_KEY

            )

            ||

            []

        );

    },

    saveTrade(

        trade

    ){

        let data =

        this.getTrades();

        if(!trade.id){

            trade.id =

            Helpers.generateId();

        }

        data.push(

            trade

        );

        DataService.save(

            TRADE_KEY,

            data

        );

        return trade;

    }

};

export default InvestmentRepository;
