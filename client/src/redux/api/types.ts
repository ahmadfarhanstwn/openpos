export interface IUser {
    id: number,
    username: string,
    email: string,
    full_name: string,
    role: string,
    created_at: Date,
    updated_at: Date
}

export interface IProduct {
    product_id: number,
    product_barcode: string,
    product_name: string,
    unit_id: number,
    category_id: number,
    unit_in_stock: number,
    product_price: number,
    discount_percentage: number,
    user_id: number,
    is_deleted: 'Y' | 'N'
}

export interface IProductTransformed {
    product_id: number,
    product_barcode: string,
    product_name: string,
    unit_id: number,
    category_id: number,
    unit_in_stock: number,
    product_price: number,
    discount_percentage: number,
    user_id: number,
    is_deleted: 'Y' | 'N',
    id: number
}

export interface IGetPaginateProductsQueryParams {
    per_page: number,
    current_page: number, 
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