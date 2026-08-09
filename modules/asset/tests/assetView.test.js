/*

Family Wealth AI OS V7

AssetView Test

测试：

Add Asset

*/

import AssetView

    from "../ui/assetView.js";

import AssetAPI

    from "../api/assetAPI.js";

const testContainer =

    document.createElement(

        "div"

    );

document.body.appendChild(

    testContainer

);

AssetView.render(

    testContainer

);

// ==========================================

// Test 1

// ==========================================

const addButton =

    testContainer.querySelector(

        "#add-asset-button"

    );

if(!addButton){

    throw new Error(

        "Add Asset button not found"

    );

}

// ==========================================

// Open Form

// ==========================================

addButton.click();

const form =

    testContainer.querySelector(

        "#asset-create-form"

    );

if(!form){

    throw new Error(

        "Asset create form not found"

    );

}

// ==========================================

// Fill Form

// ==========================================

form.querySelector(

    "#asset-name"

).value =

    "V7 AssetView Test Cash";

form.querySelector(

    "#asset-category"

).value =

    "Cash";

form.querySelector(

    "#asset-value"

).value =

    "5000";

form.querySelector(

    "#asset-liquidity"

).value =

    "High";

// ==========================================

// Submit

// ==========================================

form.dispatchEvent(

    new Event(

        "submit",

        {

            bubbles:

            true,

            cancelable:

            true

        }

    )

);

// ==========================================

// Verify

// ==========================================

const assets =

    AssetAPI.getAll();

const createdAsset =

    assets.find(

        asset =>

            asset.name ===

            "V7 AssetView Test Cash"

    );

const passed =

    !!createdAsset &&

    createdAsset.category ===

    "Cash" &&

    Number(

        createdAsset.currentValue

    ) === 5000;

// ==========================================

// Output

// ==========================================

document.body.innerHTML = `

    <h1>

        Family Wealth AI OS V7

    </h1>

    <h2>

        AssetView Add Asset Test

    </h2>

    <h2 style="

        color:${passed

            ? "green"

            : "red"};

    ">

        ${

            passed

            ?

            "✅ ASSETVIEW ADD ASSET PASSED"

            :

            "❌ ASSETVIEW ADD ASSET FAILED"

        }

    </h2>

    <h3>

        Test Details

    </h3>

    <p>

        Add Button:

        ${

            addButton

            ? "✅ PASS"

            : "❌ FAIL"

        }

    </p>

    <p>

        Form:

        ${

            form

            ? "✅ PASS"

            : "❌ FAIL"

        }

    </p>

    <p>

        Create Asset:

        ${

            createdAsset

            ? "✅ PASS"

            : "❌ FAIL"

        }

    </p>

    <h3>

        Created Asset

    </h3>

    <pre>${JSON.stringify(

        createdAsset,

        null,

        2

    )}</pre>

`;
