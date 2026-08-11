/*

Family Wealth AI OS V7.7

Tax View Test

测试 Tax View：

1. View 初始化

2. Dashboard 渲染

3. Create Tax Plan

4. Refresh

5. Back

6. TaxFacade 连接

*/

import TaxView from "../taxView.js";

describe(

    "TaxView",

    () => {

        // ==================================================

        // Test Container

        // ==================================================

        let container;

        beforeEach(

            () => {

                container =

                    document.createElement(

                        "div"

                    );

                document.body.appendChild(

                    container

                );

            }

        );

        afterEach(

            () => {

                document.body.innerHTML =

                    "";

            }

        );

        // ==================================================

        // Test Render

        // ==================================================

        test(

            "should render Tax Dashboard",

            () => {

                TaxView.render(

                    container,

                    () => {}

                );

                expect(

                    container.innerHTML

                ).toContain(

                    "Tax Center"

                );

                expect(

                    container.innerHTML

                ).toContain(

                    "Tax Dashboard"

                );

            }

        );

        // ==================================================

        // Test Tax Module Status

        // ==================================================

        test(

            "should show Tax Module status",

            () => {

                TaxView.render(

                    container,

                    () => {}

                );

                expect(

                    container.innerHTML

                ).toContain(

                    "TAX SYSTEM READY"

                );

            }

        );

        // ==================================================

        // Test Create Plan Button

        // ==================================================

        test(

            "should render Create Tax Plan button",

            () => {

                TaxView.render(

                    container,

                    () => {}

                );

                const button =

                    container.querySelector(

                        "#tax-create-plan-button"

                    );

                expect(

                    button

                ).not.toBeNull();

            }

        );

        // ==================================================

        // Test Refresh Button

        // ==================================================

        test(

            "should render Refresh button",

            () => {

                TaxView.render(

                    container,

                    () => {}

                );

                const button =

                    container.querySelector(

                        "#tax-refresh-button"

                    );

                expect(

                    button

                ).not.toBeNull();

            }

        );

        // ==================================================

        // Test Back Button

        // ==================================================

        test(

            "should render Back button",

            () => {

                TaxView.render(

                    container,

                    () => {}

                );

                const button =

                    container.querySelector(

                        "#tax-back-button"

                    );

                expect(

                    button

                ).not.toBeNull();

            }

        );

        // ==================================================

        // Test Create Plan Form

        // ==================================================

        test(

            "should open Create Tax Plan form",

            () => {

                TaxView.render(

                    container,

                    () => {}

                );

                TaxView.createPlanForm();

                expect(

                    container.innerHTML

                ).toContain(

                    "Create Tax Plan"

                );

                expect(

                    container.querySelector(

                        "#tax-plan-form"

                    )

                ).not.toBeNull();

            }

        );

        // ==================================================

        // Test Tax Plan Fields

        // ==================================================

        test(

            "should render Tax Plan input fields",

            () => {

                TaxView.render(

                    container,

                    () => {}

                );

                TaxView.createPlanForm();

                expect(

                    container.querySelector(

                        "#tax-plan-name"

                    )

                ).not.toBeNull();

                expect(

                    container.querySelector(

                        "#tax-plan-year"

                    )

                ).not.toBeNull();

                expect(

                    container.querySelector(

                        "#tax-plan-income"

                    )

                ).not.toBeNull();

                expect(

                    container.querySelector(

                        "#tax-plan-deductions"

                    )

                ).not.toBeNull();

            }

        );

        // ==================================================

        // Test Formatter

        // ==================================================

        test(

            "should format currency correctly",

            () => {

                const result =

                    TaxView.formatCurrency(

                        1000

                    );

                expect(

                    result

                ).toContain(

                    "$1,000"

                );

            }

        );

        // ==================================================

        // Test Percentage Formatter

        // ==================================================

        test(

            "should format percentage correctly",

            () => {

                const result =

                    TaxView.formatPercent(

                        12.3456

                    );

                expect(

                    result

                ).toBe(

                    "12.35%"

                );

            }

        );

        // ==================================================

        // Test HTML Escape

        // ==================================================

        test(

            "should escape HTML correctly",

            () => {

                const result =

                    TaxView.escapeHTML(

                        "<script>"

                    );

                expect(

                    result

                ).toBe(

                    "&lt;script&gt;"

                );

            }

        );

    }

);
