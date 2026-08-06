/*

Family Wealth AI OS

Account View

*/

import AccountAPI from "../api/accountAPI.js";

const AccountView = {

    render(

        container

    ){

        const accounts =

        AccountAPI.getAll();

        container.innerHTML =

        `

        <div class="account-center">

            <h2>

            Account Center

            </h2>

            <p>

            Total Balance:

            ${

                AccountAPI

                .getTotalBalance()

            }

            </p>

            <ul>

            ${

                accounts.map(

                    account=>`

                    <li>

                    ${account.name}

                    -

                    ${account.balance}

                    </li>

                    `

                ).join("")

            }

            </ul>

        </div>

        `;

    }

};

export default AccountView;
