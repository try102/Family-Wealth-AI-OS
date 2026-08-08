/*

Family Wealth AI OS V7

V7 System Entry

*/

const app = document.getElementById("app");

app.innerHTML =

    "Starting Family Wealth AI OS V7...";

import("./core/system/systemManager.js")

    .then(({ default: SystemManager }) => {

        const system =

            SystemManager.start();

        console.log(

            "Family Wealth AI OS",

            system

        );

        window.WealthOS = {

            system:

                SystemManager

        };

        import("./ai/advisor.js")

            .then(({ default: Advisor }) => {

                window.WealthOS.advisor =

                    Advisor;

                app.innerHTML = `

                    <h1>

                        🏠 Family Wealth AI OS V7

                    </h1>

                    <p>

                        System Status:

                        <strong>

                            ${system.status}

                        </strong>

                    </p>

                    <p>

                        Advisor:

                        <strong>

                            ${Advisor.name}

                        </strong>

                    </p>

                    <p>

                        V7 System Started

                    </p>

                `;

                console.log(

                    "Wealth OS Ready"

                );

            })

            .catch(error => {

                console.error(

                    "Advisor Load Error:",

                    error

                );

                app.innerHTML = `

                    <h1>

                        Family Wealth AI OS V7

                    </h1>

                    <h2>

                        Advisor Load Failed

                    </h2>

                    <pre>

${error.stack || error.message}

                    </pre>

                `;

            });

    })

    .catch(error => {

        console.error(

            "V7 Startup Error:",

            error

        );

        app.innerHTML = `

            <h1>

                Family Wealth AI OS V7

            </h1>

            <h2>

                Startup Error

            </h2>

            <pre>

${error.stack || error.message}

            </pre>

        `;

    });
