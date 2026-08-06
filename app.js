/*

Family Wealth AI OS

V7 System Entry

*/

import SystemManager from "./core/system/systemManager.js";

import Advisor from "./ai/advisor.js";

// =====================

// Start OS

// =====================

const system =

SystemManager.start();

console.log(

    "Family Wealth AI OS",

    system

);

// =====================

// Export Global Access

// =====================

window.WealthOS = {

    system:

    SystemManager,

    advisor:

    Advisor

};

console.log(

    "Wealth OS Ready"

);
