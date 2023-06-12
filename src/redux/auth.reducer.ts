import { createSlice } from "@reduxjs/toolkit"

interface IAuthState {
    isLoggedIn: boolean
}

const initialState:IAuthState = {
    isLoggedIn: false
}

const authSlices = createSlice({
    name:"auth",
    initialState: {
        isLoggedIn: false,
        status: "false"
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
            state.status = "true"
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.status = "false"
        }
    }
})

export const {login, logout} = authSlices.actions
export const authSelector = (state:any) => state.auth
export default authSlices.reducer
