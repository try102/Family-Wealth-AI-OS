/*

Family Wealth AI OS V7

System Bootstrap Import Test

*/

const app = document.getElementById("app");

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Testing SystemBootstrap...</p>

`;

import("./core/bootstrap/systemBootstrap.js")

    .then(({ default: SystemBootstrap }) => {

        app.innerHTML = `

            <h1>SystemBootstrap Test</h1>

            <p>

                SystemBootstrap Loaded Successfully

            </p>

            <p>

                Initialize:

                ${typeof SystemBootstrap.initialize}

            </p>

        `;

    })

    .catch(error => {

        app.innerHTML = `

            <h1>SystemBootstrap Import Error</h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error.stack || error.message}</pre>

        `;

    });
