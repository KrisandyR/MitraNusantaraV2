import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../interfaces";

interface IAuthState {
  isLoggedIn: boolean;
  userId: string;
  status: string;
}

const initState: IAuthState = {
  isLoggedIn: false,
  userId: "",
  status: "false",
};

const authSlices = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
      state.status = "true";
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
      state.status = "false";
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlices.actions;
export const authSelector = (state: any) => state.auth;
export default authSlices.reducer;
