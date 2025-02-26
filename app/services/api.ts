import axios from "axios"
import type {Register} from "~/model/auth-model";

const axClient = (token : string | null , baseURL : string | undefined = "") => {
    return axios.create({
        baseURL : baseURL,
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
        }
    })
}

const claimCouponApi = (token : string | null,  baseUrl : string | undefined) => {
    const client = axClient(token, baseUrl);

    return {
        login() {
            return client.post('/auth/login');
        },
        register(data : Register) {
            return client.post('/auth/register', data);
        },
        profile(){
            return client.get('/profile')
        },
        products() {
            return client.get('/products')
        },
        buy(productId: string | undefined) {
            return client.post(`/buy/${productId}`);
        },
        claimCoupons(couponCode: File | string | null) {
            return client.post(`/claim-coupons?coupon=${couponCode}`);
        },
        orderHistory() {
            return client.get('/orders');
        }
    }
}

export default claimCouponApi;