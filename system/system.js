/*

Family Wealth AI OS V7

System Manager

*/

import AppBootstrap

from "../app/bootstrap.js";

import DashboardView

from "../modules/ui/dashboardView.js";

const System = {

    name:

    "Family Wealth AI OS",

    version:

    "V7.0",

    status:

    "OFFLINE",

    start(){

        AppBootstrap.start();

        this.status =

        "ONLINE";

        return {

            name:

            this.name,

            version:

            this.version,

            status:

            this.status

        };

    },

    dashboard(){

        return (

            DashboardView.render()

        );

    },

    info(){

        return {

            name:

            this.name,

            version:

            this.version,

            status:

            this.status

        };

    }

};

export default System;
