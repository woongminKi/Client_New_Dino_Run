import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  userCount: 0,
  entireUser: 4,
  nickName: "",
  users: [],
  profileImage: "",
  playStatus: false,
  isMadeRoomSuccess: false,
  roomList: [],
  roomDbArray: [],
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    roomRegister: (state, action) => {
      state.title = action.payload.title;
      state.nickName = action.payload.nickName;
      state.profileImage = action.payload.profileImage;
      state.roomList = state.roomList.concat(action.payload);
    },
    totalRoomUsers: (state, action) => {
      if (!state.users.includes(action.payload.userId)) {
        state.users = state.users.concat(action.payload);
        state.userCount = state.userCount + 1;
      }
    },
    makeRoomSuccess: (state) => {
      state.isMadeRoomSuccess = true;
    },
    joinRoom: (state, action) => {
      console.log("action: ", action);
    },
    clearRoom: (state) => {
      state.users = [];
      state.roomList = [];
      state.userCount = 0;
      state.roomDbArray = [];
    },
    responseRoomDB: (state, action) => {
      state.roomDbArray = action.payload;
    },
  },
});

export const {
  roomRegister,
  totalRoomUsers,
  makeRoomSuccess,
  joinRoom,
  clearRoom,
  responseRoomDB,
} = roomSlice.actions;
export default roomSlice.reducer;
