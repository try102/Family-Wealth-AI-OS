/*

Family Wealth AI OS V7

Cashflow Module Import Test

*/

const app = document.getElementById("app");

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Testing CashflowModule...</p>

`;

import("./core/modules/cashflowModule.js")

    .then(({ default: CashflowModule }) => {

        app.innerHTML = `

            <h1>CashflowModule Test</h1>

            <p>

                CashflowModule Loaded Successfully

            </p>

            <p>

                Type:

                ${typeof CashflowModule}

            </p>

        `;

    })

    .catch(error => {

        app.innerHTML = `

            <h1>CashflowModule Import Error</h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error.stack || error.message}</pre>

        `;

    });
