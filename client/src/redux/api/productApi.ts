import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './constants'
import { IGetPaginateProductsQueryParams } from './types'
import { setCurrentPageProducts, setPerPageProducts, setProducts, setTotalDataProducts } from '../features/productSlice'
import { RootState } from '../store'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).userState.token
            // headers.set('Accept', 'application/json')
            headers.set('Authorization', `Bearer ${token}`);
            return headers
        }
    }),
    endpoints: (builder) => ({
        getPaginateProducts: builder.query<any, IGetPaginateProductsQueryParams>({
            query(args) {
                const {current_page, per_page} = args
                return {
                    url: `product?current_page=${current_page}&per_page=${per_page}`,
                    method: 'GET',
                    credentials: 'same-origin'
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data.data.data)
                    dispatch(setProducts(data.data.data))
                    dispatch(setCurrentPageProducts(data.data.current_page))
                    dispatch(setPerPageProducts(data.data.per_page))
                    dispatch(setTotalDataProducts(data.data.total))
                } catch(err) {}
            }
        })
    })
})

export const { useGetPaginateProductsQuery } = productApi