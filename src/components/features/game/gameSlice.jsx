import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myReadyState: false,
  player2Ready: false,
  faceEmotionHappyScore: 0,
  myScore: 0,
  player2Score: 0,
  isDead: false,
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
    getFaceEmotion: (state, action) => {
      if (action.payload.length) {
        state.faceEmotionHappyScore = action.payload[0].expressions.happy;
      }
    },
    getMyScore: (state, action) => {
      state.myScore = action.payload;
    },
    getPlayer2Score: (state, action) => {
      state.player2Score = action.payload;
    },
    gameFinished(state) {
      state.isDead = true;
      state.player2Score = 0;
      state.myScore = 0;
    },
  },
});

export const {
  readyRequest,
  otherPlayerReadyRequest,
  getFaceEmotion,
  getMyScore,
  getPlayer2Score,
  gameFinished,
} = gameSlice.actions;
export default gameSlice.reducer;
