/*

Family Wealth AI OS

I18n Manager Test

*/

import I18nManager from "../i18nManager.js";

// =====================

// Reset

// =====================

I18nManager.clear();

// =====================

// Register Chinese

// =====================

I18nManager.register(

    "zh-CN",

    {

        wealth_score:

        "财富评分",

        asset:

        "资产"

    }

);

// =====================

// Register English

// =====================

I18nManager.register(

    "en-US",

    {

        wealth_score:

        "Wealth Score",

        asset:

        "Asset"

    }

);

// =====================

// List Test

// =====================

const languages =

I18nManager.list();

console.log(

    "Languages:",

    languages

);

if(

    languages.length !==2

){

    throw new Error(

        "I18n register failed"

    );

}

// =====================

// Default Translate Test

// =====================

const zh =

I18nManager.translate(

    "wealth_score"

);

if(

    zh !==

    "财富评分"

){

    throw new Error(

        "Chinese translate failed"

    );

}

// =====================

// Switch Language Test

// =====================

const changed =

I18nManager.setLocale(

    "en-US"

);

if(

    changed !== true

){

    throw new Error(

        "Locale switch failed"

    );

}

const en =

I18nManager.translate(

    "wealth_score"

);

if(

    en !==

    "Wealth Score"

){

    throw new Error(

        "English translate failed"

    );

}

// =====================

// Clear Test

// =====================

I18nManager.clear();

if(

    I18nManager.list()

    .length !==0

){

    throw new Error(

        "I18n clear failed"

    );

}

console.log(

    "I18n Manager Test Passed"

);
