import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ITransactionDetail } from "../api/Types/cashierTypes"

export interface iTransactionState {
    transactionId : number,
    transactionDetails: ITransactionDetail[],
    transactionTotalSubtotal: number,
}

const initialState : iTransactionState = {
    transactionId: 0,
    transactionDetails: [],
    transactionTotalSubtotal: 0,
}

export const transactionSlice = createSlice({
    name: 'transactionSlice',
    initialState,
    reducers: {
        default : () => initialState,
        setTransactionId: (state, action: PayloadAction<number>) => {
            state.transactionId = action.payload
        },
        setTransactionDetails: (state, action: PayloadAction<ITransactionDetail[]>) => {
            state.transactionDetails = action.payload
        },
        setTransactionTotalSubtotal: (state, action: PayloadAction<number>) => {
            state.transactionTotalSubtotal = action.payload 
        }
    }
})

export default transactionSlice.reducer;

export const { setTransactionId, setTransactionDetails, setTransactionTotalSubtotal } = transactionSlice.actions