/*

Family Wealth AI OS V7

Income Module Import Test

*/

const app = document.getElementById("app");

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Testing IncomeModule...</p>

`;

import("./core/modules/incomeModule.js")

    .then(({ default: IncomeModule }) => {

        app.innerHTML = `

            <h1>IncomeModule Test</h1>

            <p>

                IncomeModule Loaded Successfully

            </p>

            <p>

                Type:

                ${typeof IncomeModule}

            </p>

        `;

    })

    .catch(error => {

        app.innerHTML = `

            <h1>IncomeModule Import Error</h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error.stack || error.message}</pre>

        `;

    });
