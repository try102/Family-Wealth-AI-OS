/*

Family Wealth AI OS

Localization Manager

*/

const I18nManager = {

    languages:{},

    current:

    "zh-CN",

    register(

        locale,

        messages

    ){

        this.languages[locale] =

        messages;

        return locale;

    },

    setLocale(

        locale

    ){

        if(

            this.languages[locale]

        ){

            this.current = locale;

            return true;

        }

        return false;

    },

    translate(

        key

    ){

        const lang =

        this.languages[this.current];

        if(

            lang &&

            lang[key]

        ){

            return lang[key];

        }

        return key;

    },

    getLocale(){

        return this.current;

    },

    list(){

        return Object.keys(

            this.languages

        );

    },

    clear(){

        this.languages={};

        this.current="zh-CN";

    }

};

export default I18nManager;
