import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './constants'
import { IProductResponse, IGetPaginateProductsQueryParams, IProductQueryParams, IProductUnitResponse, IProductCategoryResponse } from './Types/productTypes'
import { setCurrentPageProducts, setPerPageProducts, setProducts, setTotalDataProducts } from '../features/productSlice'
import { RootState } from '../store'
import { AddUpdateProductInput } from '../../pages/modules/Products/Schema/AddProductSchema'
import { AddProductUnitInput } from '../../pages/modules/Products/Schema/AddProductUnitSchema'
import { AddProductCategoryInput } from '../../pages/modules/Products/Schema/AddProductCategorySchema'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).userState.token
            headers.set('Authorization', `Bearer ${token}`);
            return headers
        }
    }),
    endpoints: (builder) => ({
        getPaginateProducts: builder.query<any, IGetPaginateProductsQueryParams>({
            query(args) {
                const {current_page, per_page, product_barcode, product_name, product_unit, product_category} = args
                return {
                    url: `product?current_page=${current_page}&per_page=${per_page}&product_barcode=${product_barcode}&product_name=${product_name}&product_unit=${product_unit}&product_category=${product_category}`,
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
        }),
        createProduct : builder.mutation<IProductResponse, AddUpdateProductInput>({
            query(data) {
                return {
                    url: 'product',
                    method: 'POST',
                    body: data,
                    credentials: 'same-origin'
                }
            }
        }),
        updateProduct : builder.mutation<IProductResponse, AddUpdateProductInput & { product_id: number }>({
            query(data) {
                const { product_id, ...requestData } = data;

                return {
                    url: `product/${product_id}`,
                    method: 'PUT',
                    body: requestData,
                    credentials: 'same-origin'
                }
            }
        }),
        getProductById: builder.query<IProductResponse, IProductQueryParams>({
            query(args) {
                const { product_id } = args
                return {
                    url: `product/${product_id}`,
                    method: 'GET',
                    credentials: 'same-origin'
                }
            }
        }),
        deleteProduct: builder.mutation<any, IProductQueryParams>({
            query(args) {
                const {product_id} = args
                return {
                    url: `product/${product_id}`,
                    method: 'DELETE',
                    credentials: 'same-origin'
                }
            },
        }),
        createProductUnit : builder.mutation<IProductUnitResponse, AddProductUnitInput>({
            query(data) {
                return {
                    url: 'unit',
                    method: 'POST',
                    body: data,
                    credentials: 'same-origin'
                }
            }
        }),
        getProductUnits: builder.query<any, void>({
            query() {
                return {
                    url: 'unit',
                    method: 'GET',
                    credentials: 'same-origin'
                }
            }
        }),
        getProductCategories: builder.query<any, void>({
            query() {
                return {
                    url: 'category',
                    method: 'GET',
                    credentials: 'same-origin'
                }
            }
        }),
        createProductCategory : builder.mutation<IProductCategoryResponse, AddProductCategoryInput>({
            query(data) {
                return {
                    url: 'category',
                    method: 'POST',
                    body: data,
                    credentials: 'same-origin'
                }
            }
        }),
    })
})

export const { 
    useGetPaginateProductsQuery, 
    useCreateProductMutation, 
    useGetProductUnitsQuery, 
    useLazyGetProductUnitsQuery,
    useGetProductCategoriesQuery, 
    useLazyGetPaginateProductsQuery, 
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetProductByIdQuery,
    useCreateProductUnitMutation,
    useCreateProductCategoryMutation
} = productApi