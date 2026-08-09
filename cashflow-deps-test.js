/*

Family Wealth AI OS V7

Cashflow Module Dependencies Test

*/

const app = document.getElementById("app");

const dependencies = [

    [

        "cashflowAgent",

        "./modules/cashflow/agent/cashflowAgent.js"

    ],

    [

        "cashflowAI",

        "./modules/cashflow/ai/cashflowAI.js"

    ],

    [

        "cashflowAnalysisEngine",

        "./modules/cashflow/analysis/cashflowAnalysisEngine.js"

    ],

    [

        "cashflowAPI",

        "./modules/cashflow/api/cashflowAPI.js"

    ],

    [

        "cashflowEvents",

        "./modules/cashflow/events/cashflowEvents.js"

    ],

    [

        "cashflowRepository",

        "./modules/cashflow/repository/cashflowRepository.js"

    ],

    [

        "cashflowSchema",

        "./modules/cashflow/schema/cashflowSchema.js"

    ],

    [

        "cashflowService",

        "./modules/cashflow/services/cashflowService.js"

    ],

    [

        "cashflowView",

        "./modules/cashflow/ui/cashflowView.js"

    ]

];

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Testing Cashflow Dependencies...</p>

`;

async function testDependencies(){

    const results = [];

    for(

        const [name, path]

        of dependencies

    ){

        try{

            await import(path);

            results.push({

                name,

                path,

                status:"PASS"

            });

        }

        catch(error){

            results.push({

                name,

                path,

                status:"FAIL",

                error:

                    error.stack ||

                    error.message ||

                    String(error)

            });

        }

    }

    const html =

        results.map(result => {

            if(

                result.status === "PASS"

            ){

                return `

                    <div>

                        ✅

                        <strong>

                            ${result.name}

                        </strong>

                        — PASS

                    </div>

                `;

            }

            return `

                <div>

                    ❌

                    <strong>

                        ${result.name}

                    </strong>

                    — FAIL

                    <pre style="

                        white-space:pre-wrap;

                        word-break:break-word;

                    ">${result.error}</pre>

                </div>

            `;

        }).join("");

    app.innerHTML = `

        <h1>

            Cashflow Dependencies Test

        </h1>

        ${html}

    `;

}

testDependencies();
