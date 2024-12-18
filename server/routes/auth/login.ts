import axios from "axios";
import { SHOPIFY_URL } from "~/services/global.variables";
export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const response:any = {};

    try {
        const data = await login({ email, password });
        setCookie(event, "token",JSON.stringify(data?.data?.token));
        setCookie(event, "refresh_token",JSON.stringify(data?.data?.refresh_token));
        setCookie(event, "user", JSON.stringify(data));
        setCookie(event, "username ", JSON.stringify(data?.data?.user.name));
        setCookie(event, "role ", JSON.stringify(data?.data?.user?.role?.name));
        setCookie(event, "user_shop ", JSON.stringify(data?.data?.user?.shop?.id));
        response['login'] = data;
        response['success'] = true;
    } catch (error:any) {
        response['success'] = false;
        response['message'] = error.toString();
    }

    return response;
});

export const login = async (data:any) => {
    const url = `${SHOPIFY_URL}/api/auth/login`;
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    const body = {
        "email": data?.email,
        "password": data?.password
    };

    try {
        const response = await axios.post(url, body, { headers });
        console.log("my data", response.data);
        return response.data;
    } catch (error:any) {
        // Handle specific errors or rethrow for generic handling
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Server Error:", error.response.data);
            
        
            throw new Error(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("Network Error:", error.request);
            throw new Error("Network Error. Please check your internet connection.");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Request Error:", error.message);
            throw new Error("Request Error. Please try again.");
        }
    };
};