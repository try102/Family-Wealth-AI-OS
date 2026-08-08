/*

Family Wealth AI OS V7

V7 System Entry

Startup Diagnostic

*/

const app = document.getElementById("app");

function showError(title, error){

    app.innerHTML = `

        <h1>Family Wealth AI OS V7</h1>

        <h2>${title}</h2>

        <pre style="

            white-space: pre-wrap;

            word-break: break-word;

        ">${error?.stack || error?.message || error}</pre>

    `;

    console.error(title, error);

}

app.innerHTML =

    "Loading V7 Core...";

import("./core/system/systemManager.js")

.then(({ default: SystemManager }) => {

    app.innerHTML =

        "Starting V7 System...";

    try{

        const system =

            SystemManager.start();

        window.WealthOS = {

            system:

                SystemManager

        };

        return import("./ai/advisor.js")

            .then(({ default: Advisor }) => {

                window.WealthOS.advisor =

                    Advisor;

                app.innerHTML = `

                    <h1>

                        🏠 Family Wealth AI OS V7

                    </h1>

                    <h2>

                        System Ready

                    </h2>

                    <p>

                        Status:

                        <strong>

                            ${system.status}

                        </strong>

                    </p>

                    <p>

                        Advisor:

                        <strong>

                            ${Advisor.name}

                        </strong>

                    </p>

                `;

            });

    }

    catch(error){

        showError(

            "System Start Error",

            error

        );

    }

})

.catch(error => {

    showError(

        "Module Import Error",

        error

    );

});
