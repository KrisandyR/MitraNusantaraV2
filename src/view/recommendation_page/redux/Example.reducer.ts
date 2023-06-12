import { createSlice } from "@reduxjs/toolkit";

const initState = {
    
}

const ExampleSlices = createSlice({
    name:"Example",
    initialState: initState,
    reducers: {
        actionExample: (state, action) => {

        },
    }
})

export const { actionExample } = ExampleSlices.actions
export const myProductSelector = (state:any) => state.myProduct
export default ExampleSlices.reducer