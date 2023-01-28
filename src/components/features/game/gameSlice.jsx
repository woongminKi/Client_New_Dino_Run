import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myReadyState: false,
  player2Ready: false,
  player3Ready: false,
  player4Ready: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    readyRequest: (state, action) => {
      state.myReadyState = action.payload;
    },
    otherPlayerReadyRequest: (state, action) => {
      state.player2Ready = action.payload;
    },
  },
});

export const { readyRequest, otherPlayerReadyRequest } = gameSlice.actions;
export default gameSlice.reducer;
