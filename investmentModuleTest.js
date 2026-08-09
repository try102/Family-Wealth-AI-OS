/*

Family Wealth AI OS V7

Investment Module Test

测试 Investment Module 注册入口

*/

const app =

    document.getElementById("app");

app.innerHTML = `

    <h1>

        Family Wealth AI OS V7

    </h1>

    <h2>

        Investment Module Test

    </h2>

    <p>

        Loading Investment Module...

    </p>

`;

try {

    const module =

        await import(

            "./core/modules/investmentModule.js?v=investment01"

        );

    const InvestmentModule =

        module.default;

    if(!InvestmentModule){

        throw new Error(

            "InvestmentModule default export not found"

        );

    }

    const results = {

        module:

            !!InvestmentModule,

        name:

            InvestmentModule.name,

        version:

            InvestmentModule.version,

        type:

            InvestmentModule.type,

        status:

            InvestmentModule.status,

        repository:

            !!InvestmentModule.repository,

        api:

            !!InvestmentModule.api,

        agent:

            !!InvestmentModule.agent,

        ai:

            !!InvestmentModule.ai,

        analysis:

            !!InvestmentModule.analysis,

        decision:

            !!InvestmentModule.decision,

        events:

            !!InvestmentModule.events,

        marketData:

            !!InvestmentModule.marketData,

        portfolio:

            !!InvestmentModule.portfolio

    };

    const failed =

        !results.module ||

        !results.repository ||

        !results.api ||

        !results.agent ||

        !results.ai ||

        !results.analysis ||

        !results.decision ||

        !results.events ||

        !results.marketData ||

        !results.portfolio;

    if(failed){

        throw new Error(

            "InvestmentModule registration incomplete"

        );

    }

    app.innerHTML = `

        <h1>

            Family Wealth AI OS V7

        </h1>

        <h2>

            Investment Module Test

        </h2>

        <p style="

            color:green;

            font-size:20px;

            font-weight:bold;

        ">

            ✅ INVESTMENT MODULE PASSED

        </p>

        <h3>

            Module Information

        </h3>

        <pre>${JSON.stringify(

            results,

            null,

            2

        )}</pre>

        <h3>

            Components

        </h3>

        <p>

            Repository: ✅ PASS

        </p>

        <p>

            API: ✅ PASS

        </p>

        <p>

            Agent: ✅ PASS

        </p>

        <p>

            AI: ✅ PASS

        </p>

        <p>

            Analysis: ✅ PASS

        </p>

        <p>

            Decision: ✅ PASS

        </p>

        <p>

            Events: ✅ PASS

        </p>

        <p>

            Market Data: ✅ PASS

        </p>

        <p>

            Portfolio: ✅ PASS

        </p>

    `;

}

catch(error){

    app.innerHTML = `

        <h1>

            Family Wealth AI OS V7

        </h1>

        <h2>

            ❌ INVESTMENT MODULE TEST FAILED

        </h2>

        <pre style="

            white-space:pre-wrap;

            word-break:break-word;

            color:red;

        ">${error?.stack ||

           error?.message ||

           String(error)}</pre>

    `;

}
