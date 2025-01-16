import axios from "axios"
import type { Login, Register } from "~/model/auth-model";

const axClient = (baseURL : string | undefined = "") => {
    return axios.create({
        baseURL : baseURL,
        headers: {
            "Content-Type" : "application/json"
        }
    })
}

const authApi = (baseUrl : string | undefined) => {
    const client = axClient(baseUrl);

    return {
        login(data : Login) {
            return client.post('/auth/login', data);
        },
        register(data : Register) {
            return client.post('/auth/register', data);
        }
    }
}

export default authApi;