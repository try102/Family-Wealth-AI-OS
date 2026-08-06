/*

Family Wealth AI OS

Rule Engine

*/

const RuleEngine = {

    rules:{},

    register(

        name,

        condition,

        action

    ){

        this.rules[name] = {

            condition,

            action

        };

        return name;

    },

    evaluate(

        name,

        data

    ){

        const rule =

        this.rules[name];

        if(

            !rule

        ){

            return null;

        }

        if(

            rule.condition(

                data

            )

        ){

            return rule.action(

                data

            );

        }

        return null;

    },

    list(){

        return Object.keys(

            this.rules

        );

    },

    remove(

        name

    ){

        delete this.rules[name];

    },

    clear(){

        this.rules={};

    }

};

export default RuleEngine;
