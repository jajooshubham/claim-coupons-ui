import {Form, useActionData, useLoaderData, useNavigate, useNavigation} from "@remix-run/react";
import {useEffect, useState} from "react";
import {ProductOrderLists} from "~/model/product-order-lists";
import {ActionFunctionArgs, data, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {baseUrl, requireUserToken} from "~/utils/session.server";
import claimCouponApi from "~/services/api";
import InputGridData from "~/components/InputGridData";
import {getRandomInt} from "~/utils/functions";
import {badRequest} from "~/utils/request.server";
import {useToast} from "~/hooks/useToast";

export const loader = async ({request}: LoaderFunctionArgs) => {
    const userToken = await requireUserToken(request);
    const api = claimCouponApi(userToken, baseUrl);

    return await api.plantsCareProducts();
};

export const action = async ({request}: ActionFunctionArgs) => {
    const userToken = await requireUserToken(request);

    const formData = await request.formData();
    const productIds = formData.getAll('productId'); // ['1', '1']
    const quantities = formData.getAll('quantity');  // ['1', '2']

    const productOrderLists : ProductOrderLists = productIds.map((_, i) => ({
        id: getRandomInt(),
        productId: Number(productIds[i]),
        quantity: Number(quantities[i]),
    }));

    const api = claimCouponApi(userToken, baseUrl);

    try {
        const result = await api.claimCoupons(productOrderLists);

        return data({
            successMessage: result.data || "Coupons claimed successfully!",
        });
    } catch (Error) {
        return badRequest({
            formError: "Error in claiming points"
        });
    }
};

export default function Account() {
    const loaderData = useLoaderData<typeof loader>();
    const firstProductId: number = loaderData.data[0].productId;
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const {addToast} = useToast();
    const navigate = useNavigate();

    const [productOrderLists, setProductOrderLists] = useState<ProductOrderLists>([{
        id: getRandomInt(),
        productId: firstProductId,
        quantity: 1
    }]);

    useEffect(() => {
        if (!actionData) return;

        if ("formError" in actionData) {
            addToast(actionData.formError, "error");
        }

        if ("successMessage" in actionData) {
            addToast(actionData.successMessage, "success");
        }

        navigate("/dashboard");
    }, [actionData]);

    return (
        <div className="w-full py-4 text-center sm:py-8">
            <h5 className="mb-2 text-3xl font-bold text-gray-900">Claim coupons</h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg">Add your billing products to claim points.</p>
            <Form method="POST"
                  className="md:container md:max-w-screen-sm m-auto space-y-4 md:space-y-6" action="/dashboard/claim-coupons">
                <InputGridData
                    productOrderLists={productOrderLists}
                    setProductOrderLists={setProductOrderLists}
                    plantscareProducts={loaderData.data}
                    firstProductId={firstProductId}
                />
                <div className="text-right">
                    <button type="submit" className="p-2 rounded bg-lime-600 text-white w-40">
                        {isSubmitting ? "Claiming..." : "Claim Points"}
                    </button>
                </div>
            </Form>
        </div>
    );
}