/*

Family Wealth AI OS

Investment Service

*/

import InvestmentRepository from "../repository/investmentRepository.js";

import EventBus from "../../../core/events/eventBus.js";

import EventTypes from "../../../core/events/eventTypes.js";

const InvestmentService = {

    // =====================

    // Investment

    // =====================

    createInvestment(

        investment

    ){

        return InvestmentRepository

        .saveInvestment(

            investment

        );

    },

    getInvestments(){

        return InvestmentRepository

        .getInvestments();

    },

    deleteInvestment(

        id

    ){

        return InvestmentRepository

        .deleteInvestment(

            id

        );

    },

    // =====================

    // Position

    // =====================

    updatePosition(

        position

    ){

        const result =

        InvestmentRepository

        .savePosition(

            position

        );

        EventBus.publish(

            EventTypes.POSITION_UPDATED,

            result

        );

        return result;

    },

    getPositions(){

        return InvestmentRepository

        .getPositions();

    },

    // =====================

    // Trade

    // =====================

    recordTrade(

        trade

    ){

        const result =

        InvestmentRepository

        .saveTrade(

            trade

        );

        EventBus.publish(

            EventTypes.TRADE_CREATED,

            result

        );

        return result;

    },

    getTrades(){

        return InvestmentRepository

        .getTrades();

    },

    // =====================

    // Portfolio Value

    // =====================

    getPortfolioValue(){

        return this

        .getPositions()

        .reduce(

            (sum,position)=>

            sum +

            Number(

                position.marketValue || 0

            ),

            0

        );

    }

};

export default InvestmentService;
