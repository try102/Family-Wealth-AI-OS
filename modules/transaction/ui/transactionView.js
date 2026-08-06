/*

Family Wealth AI OS

Transaction View

*/

import TransactionAPI from "../api/transactionAPI.js";

const TransactionView = {

    render(

        container

    ){

        const transactions =

        TransactionAPI.getAll();

        container.innerHTML =

        `

        <div class="transaction-center">

            <h2>

            Transaction Center

            </h2>

            <p>

            Income:

            ${

                TransactionAPI

                .getIncome()

            }

            </p>

            <p>

            Expense:

            ${

                TransactionAPI

                .getExpense()

            }

            </p>

            <ul>

            ${

                transactions.map(

                    t=>`

                    <li>

                    ${t.description}

                    :

                    ${t.amount}

                    </li>

                    `

                ).join("")

            }

            </ul>

        </div>

        `;

    }

};

export default TransactionView;
