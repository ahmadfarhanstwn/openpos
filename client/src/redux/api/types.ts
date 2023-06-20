export interface IUser {
    id: number,
    username: string,
    email: string,
    full_name: string,
    role: string,
    created_at: Date,
    updated_at: Date
}

export interface IGenericResponse {
    status: string,
    message: string
}

export interface ISignUpResponse {
    status: string,
    message: string,
    user: IUser
}

export interface ISignInResponse {
    status: string,
    user: IUser,
    authorization: {
        token: string,
        type: string
    }
}