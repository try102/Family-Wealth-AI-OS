/*

Family Wealth AI OS V7

Startup Diagnostic

*/

const app = document.getElementById("app");

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Starting...</p>

`;

window.addEventListener(

    "error",

    (event) => {

        app.innerHTML = `

            <h1>Startup Error</h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${event.error?.stack || event.message}</pre>

        `;

    }

);

window.addEventListener(

    "unhandledrejection",

    (event) => {

        const error =

            event.reason;

        app.innerHTML = `

            <h1>Startup Error</h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error?.stack || error?.message || error}</pre>

        `;

    }

);

import("./core/system/systemManager.js")

    .then(

        ({ default: SystemManager }) => {

            app.innerHTML = `

                <h1>SystemManager Loaded</h1>

                <p>

                    Testing SystemManager.start()

                </p>

            `;

            try {

                const result =

                    SystemManager.start();

                app.innerHTML = `

                    <h1>

                        Family Wealth AI OS V7

                    </h1>

                    <p>

                        SystemManager Started

                    </p>

                    <pre>${JSON.stringify(

                        result,

                        null,

                        2

                    )}</pre>

                `;

            }

            catch(error){

                app.innerHTML = `

                    <h1>

                        SystemManager Start Error

                    </h1>

                    <pre style="

                        white-space:pre-wrap;

                        word-break:break-word;

                    ">${error.stack || error.message}</pre>

                `;

            }

        }

    )

    .catch(error => {

        app.innerHTML = `

            <h1>

                SystemManager Import Error

            </h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error.stack || error.message}</pre>

        `;

    });
