import { createSlice } from "@reduxjs/toolkit";
import { IMyProduct } from "./interfaces";

type myProduct = {
    product: IMyProduct[]
}

const initState: myProduct = {
    product: []
}

const myProductSlices = createSlice({
    name:"My Product",
    initialState: initState,
    reducers: {
        addProduct: (state, action) => {
            state.product.push(action.payload)
        },
        removeProduct: (state, action) => {
            const filteredProduct = state.product.filter(item => {
                if(item.transaction_id !== action.payload.transaction_id){
                    return true
                }
            })
            state.product = filteredProduct
        }
    }
})

export const { addProduct, removeProduct } = myProductSlices.actions
export const myProductSelector = (state:any) => state.myProduct
export default myProductSlices.reducer