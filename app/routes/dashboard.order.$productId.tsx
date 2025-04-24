import {ActionFunctionArgs} from "@remix-run/node";
import claimCouponApi from "~/services/api";
import {baseUrl, requireUserToken} from "~/utils/session.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const userToken: string = await requireUserToken(request);

    const api = claimCouponApi(userToken, baseUrl);
    return await api.order(params?.productId);
}