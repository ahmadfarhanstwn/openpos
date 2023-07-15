export interface IProductSuggestions {
    product_id : number,
    product_name : string
}

export interface IGetProductSuggestionsResponse {
    message: string,
    data : IProductSuggestions[],
}

export interface IGetProductSuggestionsQuery {
    product_name: string,
}