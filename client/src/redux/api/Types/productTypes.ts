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

export interface IUpdateDeleteProductQueryParams {
    product_id: number
}

//create product
export interface ICreateProductResponse {
    message: string,
    data : IProduct
}