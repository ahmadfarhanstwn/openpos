export interface IProductSuggestions {
    product_id : number,
    product_name : string
}

export interface ITransactionDetail {
    transaction_detail_id: number,
    transaction_id: number,
    product_id: number,
    quantity: number,
    discount: number,
    subtotal: number,
    product_name: string, 
    unit_in_stock: number,
    product_price: number,
    unit_name: string,
}

export interface IGetProductSuggestionsResponse {
    message: string,
    data : IProductSuggestions[],
}

export interface IGetProductSuggestionsQuery {
    product_name: string,
}

export interface IGetTransactionDetailRowsQuery {
    transaction_id: number
}

export interface IGetTransactionDetailResponse {
    data: ITransactionDetail[],
    total_subtotal: number
}

export interface IAddTransactionDetail {
    transaction_id: number,
    product_id: number,
    quantity: number,	
    discount: number,
    subtotal: number
}

export interface IAddTransactionDetailResponse {
    data : IAddTransactionDetail
}

export interface IAddTransactionDetailInput {
    transaction_id: number,
    product_id: number,
    quantity: number,
    discount: number,
    subtotal: number,
}

export interface IDeleteTransactionDetailInput {
    transaction_id: number,
    transaction_detail_id: number,
}