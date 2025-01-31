import {ActionFunctionArgs} from "@remix-run/node";
import claimCouponApi from "~/services/api";
import {baseUrl, requireUserToken} from "~/utils/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const productId: number = await request.json();
    const userToken: string = await requireUserToken(request);

    const api = claimCouponApi(userToken, baseUrl);

    const response = await api.buy(productId);
    return response.data;
}