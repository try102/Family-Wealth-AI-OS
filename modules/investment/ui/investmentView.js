/*

Family Wealth AI OS

Investment View

*/

import InvestmentAPI from "../api/investmentAPI.js";

const InvestmentView = {

    render(

        container

    ){

        const portfolio =

        InvestmentAPI

        .getPortfolioSummary();

        const performance =

        InvestmentAPI

        .getPerformance();

        const risk =

        InvestmentAPI

        .getRiskReport();

        container.innerHTML =

        `

        <div class="investment-center">

            <h2>

            Investment Center

            </h2>

            <section>

            <h3>

            Portfolio Value

            </h3>

            <p>

            ${

            portfolio.totalValue

            }

            </p>

            </section>

            <section>

            <h3>

            Allocation

            </h3>

            <pre>

            ${

            JSON.stringify(

            portfolio.allocation,

            null,

            2

            )

            }

            </pre>

            </section>

            <section>

            <h3>

            Performance

            </h3>

            <pre>

            ${

            JSON.stringify(

            performance,

            null,

            2

            )

            }

            </pre>

            </section>

            <section>

            <h3>

            Risk

            </h3>

            <pre>

            ${

            JSON.stringify(

            risk,

            null,

            2

            )

            }

            </pre>

            </section>

        </div>

        `;

    }

};

export default InvestmentView;
