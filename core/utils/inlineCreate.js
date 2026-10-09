/*

Family Wealth AI OS V7

Inline create helpers.

Entry forms (income, expense, trades, payments,
asset events, cash flow) let the user pick an
existing member / account OR create one on the
spot by typing a name. The new record is created
through the owning module's API at submit time,
so it immediately exists in the Member Center /
Account module as well. The standalone modules
keep working as before; this is only an
additional entry path.

*/

import MemberAPI from "../../modules/member/api/memberAPI.js?v=20261008ap";

import AccountAPI from "../../modules/account/api/accountAPI.js?v=20261008ae";

export const NEW_MEMBER_VALUE =

    "__new__";

export const NEW_ACCOUNT_VALUE =

    "__new_account__";

/*

Show or hide the inline-create fields that belong
to a select, based on its current value.

fields: array of elements (or ids resolved by
the caller) to toggle.

*/

export function syncInlineCreateFields(

    select,

    fields

) {

    if (!select) {

        return;

    }

    const show =

        select.value ===

            NEW_MEMBER_VALUE ||

        select.value ===

            NEW_ACCOUNT_VALUE;

    (fields || []).forEach(

        field => {

            if (field) {

                field.style.display =

                    show

                        ? ""

                        : "none";

            }

        }

    );

}

/*

Attach the toggle behaviour between a select and
its inline-create field elements (elements, not
ids). Call once when the form is rendered.

*/

export function wireInlineCreate(

    select,

    fields

) {

    if (!select) {

        return;

    }

    syncInlineCreateFields(

        select,

        fields

    );

    select.addEventListener(

        "change",

        () =>

            syncInlineCreateFields(

                select,

                fields

            )

    );

}

/*

Resolve the member for a submit: when the select
is on "+ new member", create the member from the
typed name (if any) and return its id; otherwise
return the selected value unchanged.

*/

export function resolveMemberId(

    select,

    nameInput

) {

    if (!select) {

        return "";

    }

    if (select.value !== NEW_MEMBER_VALUE) {

        return select.value || "";

    }

    const name =

        nameInput

            ? nameInput.value.trim()

            : "";

    if (!name) {

        return "";

    }

    try {

        const created =

            MemberAPI.saveMember({

                name

            });

        return created && created.id

            ? created.id

            : "";

    } catch (error) {

        return "";

    }

}

/*

Resolve the account for a submit: when the select
is on "+ new account", create the account from
the typed name and optional opening balance and
return its id; otherwise return the selected
value unchanged.

*/

export function resolveAccountId(

    select,

    nameInput,

    balanceInput,

    ownerMemberId = ""

) {

    if (!select) {

        return "";

    }

    if (select.value !== NEW_ACCOUNT_VALUE) {

        return select.value || "";

    }

    const name =

        nameInput

            ? nameInput.value.trim()

            : "";

    if (!name) {

        return "";

    }

    const balance =

        balanceInput

            ? Number(balanceInput.value || 0)

            : 0;

    try {

        const created =

            AccountAPI.create({

                name,

                accountType:

                    "Cash",

                type:

                    "Cash",

                balance:

                    Number.isFinite(balance)

                        ? balance

                        : 0,

                memberId:

                    ownerMemberId || ""

            });

        return created && created.id

            ? created.id

            : "";

    } catch (error) {

        return "";

    }

}

export default {

    NEW_MEMBER_VALUE,

    NEW_ACCOUNT_VALUE,

    syncInlineCreateFields,

    wireInlineCreate,

    resolveMemberId,

    resolveAccountId

};
