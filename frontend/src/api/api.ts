import {AuthApi} from "./AuthApi";
import axios, {AxiosInstance} from "axios";

const baseURL = process.env.NODE_ENV == "production" ?
    process.env.API_BASE_URL :
    'http://localhost:1337'

class Api {
    private readonly axiosInstance: AxiosInstance
    readonly authApi: AuthApi;

    constructor() {
        this.axiosInstance = Api.createInstance();
        this.authApi = new AuthApi(this.axiosInstance);
    }

    private static createInstance() {
        const instance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json"
            }
        })
        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem('jwt')
            if (token && !config.params?.public) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`
                }
            }
            // TODO token header? redirect to login page?
            return config;
        })

        return instance;
    }
}

export const api = new Api();