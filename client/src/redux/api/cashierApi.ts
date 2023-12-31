import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { IAddTransactionDetailInput, IAddTransactionDetailResponse, IDeleteTransactionDetailInput, IGetProductSuggestionsQuery, IGetProductSuggestionsResponse, IGetTransactionDetailResponse, IGetTransactionDetailRowsQuery } from './Types/cashierTypes'
import { setTransactionDetails, setTransactionId, setTransactionTotalSubtotal } from '../features/transactionSlice'

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
        }),
        getTransactionDetailRows: builder.query<IGetTransactionDetailResponse, IGetTransactionDetailRowsQuery>({
            query(args) {
                const { transaction_id } = args
                return {
                    url: `transactions/${transaction_id}`,
                    method: 'GET',
                    credentials: 'same-origin'
                }
            },
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setTransactionDetails(data.data))
                    dispatch(setTransactionTotalSubtotal(data.total_subtotal))
                } catch(err) {
                    console.log(err)
                }
            },
        }),
        addTransactionRow: builder.mutation<IAddTransactionDetailResponse, IAddTransactionDetailInput>({
            query(data) {
                const { transaction_id, discount, product_id, quantity, subtotal } = data
                return {
                    url: `transaction/${transaction_id}`,
                    method: 'POST',
                    body: {
                        'product_id': product_id,
                        'quantity': quantity,
                        'discount': discount,
                        'subtotal': subtotal
                    },
                    credentials: 'same-origin'
                }
            },
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setTransactionId(data.data.transaction_id))
                } catch(err) {
                    console.log(err)
                }
            },
        }),
        deleteTransactionDetail: builder.mutation<IAddTransactionDetailResponse, IDeleteTransactionDetailInput>({
            query(params) {
                const { transaction_id, transaction_detail_id} = params
                return {
                    url: `transactions/${transaction_id}/${transaction_detail_id}`,
                    method: 'DELETE',
                    credentials: 'same-origin'
                }
            }
        }),
        cancelTransaction: builder.mutation<any, number>({
            query(transaction_id) {
                return {
                    url: `transactions-cancel/${transaction_id}`,
                    method: 'PUT',
                    credentials: 'same-origin'
                }
            }
        })
    })
})

export const {
    useLazyGetProductSuggestionsQuery,
    useLazyGetTransactionDetailRowsQuery,
    useAddTransactionRowMutation,
    useDeleteTransactionDetailMutation,
    useCancelTransactionMutation
} = cashierApi

// TODO: 
// CLEAR INPUT AFTER SUBMIT DATA