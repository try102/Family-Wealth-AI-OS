/*

Family Wealth AI OS

Asset View

*/

import AssetAPI from "../api/assetAPI.js";

const AssetView = {

    render(

        container

    ){

        const assets =

        AssetAPI.getAll();

        container.innerHTML =

        `

        <div class="asset-center">

            <h2>

            Asset Center

            </h2>

            <p>

            Total Assets:

            ${

                AssetAPI.getTotalValue()

            }

            </p>

            <ul>

            ${

                assets.map(

                    asset=>`

                    <li>

                    ${asset.name}

                    :

                    ${asset.currentValue}

                    </li>

                    `

                ).join("")

            }

            </ul>

        </div>

        `;

    }

};

export default AssetView;
