import {AxiosInstance} from "axios";
import {SignInCredentials, SignInResult, SignInResultApiDto} from "./types";

export class AuthApi {
    constructor(private axiosInstance: AxiosInstance) {
    }

    async signIn(payload: SignInCredentials): Promise<SignInResult> {
        try {
            const response = await this.axiosInstance.post('/auth/local', payload);
            const data: SignInResultApiDto = response.data;
            return {
                jwt: data.jwt,
                user: {
                    email: data.user.email,
                    username: data.user.username
                }
            }
        } catch (e) {
            throw new Error(e.response.data.data[0].messages[0].message)
        }
    }
}