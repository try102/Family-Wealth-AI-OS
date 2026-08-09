/*

Family Wealth AI OS V7

Module Registry Import Test

*/

const app = document.getElementById("app");

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Testing ModuleRegistry...</p>

`;

import("./core/registry/moduleRegistry.js")

    .then(({ default: ModuleRegistry }) => {

        app.innerHTML = `

            <h1>ModuleRegistry Test</h1>

            <p>ModuleRegistry Loaded Successfully</p>

            <p>Functions: ${typeof ModuleRegistry.list}</p>

        `;

    })

    .catch(error => {

        app.innerHTML = `

            <h1>ModuleRegistry Import Error</h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error.stack || error.message}</pre>

        `;

    });
