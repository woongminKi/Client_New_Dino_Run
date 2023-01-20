import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loginStatus = false;
    },
    loginSuccess: (state) => {
      state.loginStatus = true;
    },
    loginFailure: (state) => {
      state.error = "error exist";
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
