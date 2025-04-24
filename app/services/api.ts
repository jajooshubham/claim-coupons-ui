import axios from "axios"
import type {Register} from "~/model/auth-model";
import {ProductOrderLists} from "~/model/product-order-lists";

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
        plantsCareProducts() {
            return client.get('/plantscare/products')
        },
        order(productId: string | undefined) {
            return client.post(`/order/${productId}`);
        },
        claimCoupons(productOrderLists: ProductOrderLists) {
            return client.post(`/claim-coupons`, productOrderLists);
        },
        orderHistory() {
            return client.get('/orders');
        }
    }
}

export default claimCouponApi;