/*

Family Wealth AI OS V7

System Bootstrap Dependencies Test

*/

const app = document.getElementById("app");

const dependencies = [

    [

        "EngineRegistry",

        "./core/engines/engineRegistry.js"

    ],

    [

        "WealthEngine",

        "./core/engines/wealth/wealthEngine.js"

    ],

    [

        "CashFlowEngine",

        "./core/engines/cashflow/cashFlowEngine.js"

    ],

    [

        "AIRegistry",

        "./ai/aiRegistry.js"

    ],

    [

        "Advisor",

        "./ai/advisor.js"

    ],

    [

        "InvestmentAgent",

        "./modules/investment/agent/investmentAgent.js"

    ],

    [

        "TaxFacade",

        "./tax/taxFacade.js"

    ],

    [

        "LiabilityModule",

        "./core/modules/liabilityModule.js"

    ],

    [

        "IncomeModule",

        "./core/modules/incomeModule.js"

    ],

    [

        "CashflowModule",

        "./core/modules/cashflowModule.js"

    ],

    [

        "AssetsModule",

        "./core/modules/assetsModule.js"

    ]

];

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Testing SystemBootstrap Dependencies...</p>

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

    app.innerHTML = `

        <h1>

            SystemBootstrap Dependencies Test

        </h1>

        ${results.map(result => {

            if(

                result.status === "PASS"

            ){

                return `

                    <div style="

                        margin:10px 0;

                        padding:8px;

                    ">

                        ✅

                        <strong>

                            ${result.name}

                        </strong>

                        — PASS

                    </div>

                `;

            }

            return `

                <div style="

                    margin:10px 0;

                    padding:8px;

                ">

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

        }).join("")}

    `;

}

testDependencies();
