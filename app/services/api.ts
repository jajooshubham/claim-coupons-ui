import axios from "axios"

const axClient = (token : string , baseURL : string | undefined = "") => {
    return axios.create({
        baseURL : baseURL,
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
        }
    })
}

const claimCouponApi = (token : string,  baseUrl : string | undefined) => {
    const client = axClient(token, baseUrl);

    return {
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
            return client.post(`/clain-coupons?coupon=${couponCode}`);
        },
        orderHistory() {
            return client.get('/orderhistory');
        }
    }
}

export default claimCouponApi;