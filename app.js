/*

Family Wealth AI OS V7

Minimal Startup Test

*/

const app = document.getElementById("app");

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Loading System Manager...</p>

`;

import("./core/system/systemManager.js")

    .then(({ default: SystemManager }) => {

        app.innerHTML = `

            <h1>Family Wealth AI OS V7</h1>

            <p>System Manager Loaded Successfully</p>

            <p>Now starting system...</p>

        `;

        try {

            const result =

                SystemManager.start();

            app.innerHTML = `

                <h1>Family Wealth AI OS V7</h1>

                <h2>System Started</h2>

                <p>

                    Status:

                    ${result.status}

                </p>

                <p>

                    Advisor:

                    ${result.advisor}

                </p>

            `;

        } catch(error) {

            app.innerHTML = `

                <h1>System Start Error</h1>

                <pre style="

                    white-space:pre-wrap;

                    word-break:break-word;

                ">${error.stack || error.message}</pre>

            `;

        }

    })

    .catch(error => {

        app.innerHTML = `

            <h1>System Manager Import Error</h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error.stack || error.message}</pre>

        `;

    });
