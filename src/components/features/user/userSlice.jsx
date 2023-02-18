import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  nickName: "",
  imageURL: "",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfoRequest: (state, payload) => {
      state.userId = payload.userId;
      state.nickName = payload.nickName;
      state.imageURL = payload.profileImage;
    },
    userInfoFailure: (state) => {
      state.error = false;
    },
  },
});

export const { userInfoRequest, userInfoFailure, checkSocketStatus } =
  userSlice.actions;
export default userSlice.reducer;
