/*

Family Wealth AI OS V7

Assets Module Dependencies Test

*/

const app = document.getElementById("app");

const dependencies = [

    [

        "assetAgent",

        "./modules/assets/agent/assetAgent.js"

    ],

    [

        "assetAI",

        "./modules/assets/ai/assetAI.js"

    ],

    [

        "assetAPI",

        "./modules/assets/api/assetAPI.js"

    ],

    [

        "assetAnalysisEngine",

        "./modules/assets/engines/assetAnalysisEngine.js"

    ],

    [

        "assetEventHandler",

        "./modules/assets/events/assetEventHandler.js"

    ],

    [

        "assetRepository",

        "./modules/assets/repository/assetRepository.js"

    ],

    [

        "assetSchema",

        "./modules/assets/schema/assetSchema.js"

    ],

    [

        "assetService",

        "./modules/assets/services/assetService.js"

    ],

    [

        "assetView",

        "./modules/assets/ui/assetView.js"

    ]

];

app.innerHTML = `

    <h1>Family Wealth AI OS V7</h1>

    <p>Testing Assets Dependencies...</p>

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

            Assets Dependencies Test

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
