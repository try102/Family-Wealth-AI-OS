/*

Family Wealth AI OS V7

Asset Analysis Engine Test

*/

const app =

    document.getElementById("app");

app.innerHTML = `

    <h1>

        Asset Analysis Engine Test

    </h1>

    <p>

        Loading...

    </p>

`;

import(

    "./modules/assets/engines/assetAnalysisEngine.js"

)

.then(

    ({ default: Engine }) => {

        app.innerHTML = `

            <h1>

                AssetAnalysisEngine Test

            </h1>

            <p>

                ✅ AssetAnalysisEngine

                Loaded Successfully

            </p>

            <p>

                Type:

                ${typeof Engine}

            </p>

            <p>

                calculateTotalValue:

                ${typeof Engine.calculateTotalValue}

            </p>

            <p>

                allocationAnalysis:

                ${typeof Engine.allocationAnalysis}

            </p>

            <p>

                liquidityAnalysis:

                ${typeof Engine.liquidityAnalysis}

            </p>

        `;

    }

)

.catch(

    error => {

        app.innerHTML = `

            <h1>

                AssetAnalysisEngine Import Error

            </h1>

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

            ">${error.stack ||

               error.message ||

               error}</pre>

        `;

    }

);
