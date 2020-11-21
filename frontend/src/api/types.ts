export type SignInCredentials = {
    identifier: string;
    password: string;
}

export type UserApiDto = {
    email: string,
    username: string
}

export type SignInResultApiDto = {
    jwt: string,
    user: UserApiDto
}

export type User = {
    email: string,
    username: string
}

export type SignInResult = {
    jwt: string,
    user: User
}