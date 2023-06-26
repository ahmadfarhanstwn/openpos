import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../api/types";

export interface iProductState {
    products: IProduct[],
    currentPage: number,
    perPage: number,
    totalData: number
}

const initialState: iProductState = {
    products: [],
    currentPage: 1,
    perPage: 10,
    totalData: 0
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        default: () => initialState,
        setProducts: (state, action: PayloadAction<[]>) => {
            state.products = action.payload
        },
        setCurrentPageProducts: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setPerPageProducts: (state, action: PayloadAction<number>) => {
            state.perPage = action.payload
        },
        setTotalDataProducts: (state, action: PayloadAction<number>) => {
            state.totalData = action.payload
        },
    }
})

export default productSlice.reducer;

export const {setProducts, setCurrentPageProducts, setPerPageProducts, setTotalDataProducts} = productSlice.actions