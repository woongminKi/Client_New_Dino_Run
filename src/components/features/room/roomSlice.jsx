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
      state.users = state.users.concat(action.payload.userId);
      state.userCount = state.userCount + 1;
    },
    makeRoomSuccess: (state) => {
      state.isMadeRoomSuccess = true;
    },
    clearRoom: (state) => {
      state.users = [];
      state.roomList = [];
      state.userCount = 0;
    },
  },
});

export const { roomRegister, totalRoomUsers, makeRoomSuccess, clearRoom } =
  roomSlice.actions;
export default roomSlice.reducer;
