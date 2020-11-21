import {AxiosInstance} from "axios";
import {SignInPayload} from "./types";

type UserApiDto = {
    email: string,
    username: string
}

type SignInResultApiDto = {
    jwt: string,
    user: UserApiDto
}

type User = {
    email: string,
    username: string
}

type SignInResult = {
    jwt: string,
    user: User
}

export class AuthApi {
    constructor(private axiosInstance: AxiosInstance) {
    }

    async signIn(payload: SignInPayload): Promise<SignInResult> {
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
            console.error(e);
        }
    }
}