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
        }
    }
}

export default claimCouponApi;