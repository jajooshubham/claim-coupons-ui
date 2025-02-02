import {Form, useActionData} from "@remix-run/react";
import {ActionFunctionArgs} from "@remix-run/node";
import {baseUrl, requireUserToken} from "~/utils/session.server";
import claimCouponApi from "~/services/api";

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const couponCode = form.get("couponCode");
    const userToken: string = await requireUserToken(request);
    console.log(couponCode);
    const api = claimCouponApi(userToken, baseUrl);
    return await api.claimCoupons(couponCode);
}

export default function Account() {
    const actionData = useActionData<typeof action>();

    console.log(actionData);
    return (
        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
            <h5 className="mb-2 text-3xl font-bold text-gray-900">Claim coupons</h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg">Input Coupon code and claim points.</p>
            <Form method="POST" className="w-full max-w-sm m-auto space-y-4 md:space-y-6" action="#">
                <div>
                    <label htmlFor="coupon" className="block mb-2 text-sm font-medium text-gray-900">Coupon code</label>
                    <input type="text" name="couponCode" id="coupon"
                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                           placeholder="xxxxx-xxxx" required/>
                </div>

                <button
                    type="submit"
                    className="w-full text-primary bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Claim point
                </button>
            </Form>
        </div>
    );
}