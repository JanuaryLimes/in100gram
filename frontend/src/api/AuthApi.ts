import {AxiosInstance} from "axios";
import {SignInCredentials, SignInResult, SignInResultApiDto, User} from "./types";

export class AuthApi {
    constructor(private axiosInstance: AxiosInstance) {
    }

    async signIn(payload: SignInCredentials): Promise<SignInResult> {
        try {
            const response = await this.axiosInstance.post('/auth/local', payload, {
                params: {public: true}
            });
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

    async me(): Promise<User> {
        try {
            const response = await this.axiosInstance.get('/users/me');
            const data = response.data;
            // TODO
            console.warn('me', {
                data
            })
            return data;
        } catch (e) {
            console.warn('me', {e})
            throw e;
        }
    }
}