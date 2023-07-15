import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { IGetProductSuggestionsQuery, IGetProductSuggestionsResponse } from './Types/cashierTypes'

export const cashierApi = createApi({
    reducerPath: 'cashierApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getProductSuggestions: builder.query<IGetProductSuggestionsResponse, IGetProductSuggestionsQuery>({
            query(args) {
                const { product_name } = args
                return {
                    url: `products/query?product_name=${product_name}`,
                    method: 'GET',
                    credentials: 'same-origin'
                }
            }
        })
    })
})

export const {
    useLazyGetProductSuggestionsQuery
} = cashierApi