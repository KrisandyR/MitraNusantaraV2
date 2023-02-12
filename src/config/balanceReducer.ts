import { createSlice } from "@reduxjs/toolkit";

const initState = {
    value: 4000
}

const balanceSlices = createSlice({
    name: "balance",
    initialState: initState,
    reducers: {
        resetBalance: (state) => {
            state.value = 3000
        },
        subtractBalance: (state, action) => {
            state.value = state.value - action.payload
        },
        addBalance: (state, action) => {
            state.value = state.value + action.payload
        }
    }
})

export const {subtractBalance, addBalance, resetBalance} = balanceSlices.actions
export const balanceSelector = (state:any) => state.balance
export default balanceSlices.reducer