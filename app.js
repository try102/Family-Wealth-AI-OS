/*

Family Wealth AI OS V7

Agent Registry Import Test

*/

const app = document.getElementById("app");

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Testing AgentRegistry...</p>

`;

import("./core/registry/agentRegistry.js")

    .then(({ default: AgentRegistry }) => {

        app.innerHTML = `

            <h1>AgentRegistry Test</h1>

            <p>

                AgentRegistry Loaded Successfully

            </p>

            <p>

                Functions:

                ${typeof AgentRegistry.list}

            </p>

        `;

    })

    .catch(error => {

        app.innerHTML = `

            <h1>AgentRegistry Import Error</h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error.stack || error.message}</pre>

        `;

    });
