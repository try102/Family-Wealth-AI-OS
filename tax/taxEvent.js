/*

Family Wealth AI OS V7.7

Tax Event

Tax 模块事件数据模型

*/

class TaxEvent {

    constructor({

        type,

        taxYear,

        data = {},

        timestamp = Date.now()

    }){

        this.type = type;

        this.taxYear = taxYear;

        this.data = data;

        this.timestamp = timestamp;

    }

}

export default TaxEvent;
