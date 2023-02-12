import { createSlice } from "@reduxjs/toolkit"

const initState = {
    transaction_id: 1
}

const transactionIdSlices = createSlice({
    name: "transaction id",
    initialState: initState,
    reducers: {
        increment: (state) => {
            state.transaction_id =  state.transaction_id+1
        }
    }
})

export const {increment} = transactionIdSlices.actions
export const transactionIdSelector = (state:any) => state.transactionId
export default transactionIdSlices.reducer