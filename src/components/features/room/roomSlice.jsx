import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  userCount: 0,
  nickName: "",
  users: [],
  userId: 0,
  profileImage: "",
  playStatus: false,
  isMadeRoomSuccess: false,
  roomList: [],
  roomDbArray: [],
  fetchDBArray: [],
  userData: {},
  myInfoData: {},
  currentRoomData: {},
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    roomRegister: (state, action) => {
      state.title = action.payload.title;
      state.userId = action.payload.userId;
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
      state.userData = action.payload;
    },
    clearRoom: (state) => {
      state.users = [];
      state.roomList = [];
      state.userCount = 0;
      state.userData = {};
      state.myInfoData = {};
    },
    responseRoomDB: (state, action) => {
      state.roomDbArray = action.payload;
    },
    fetchRoomDB: (state, action) => {
      console.log("roomSlice에서의 fetchDBList를 위한 값:", action.payload);
      state.fetchDBArray = action.payload;
    },
    saveMyInfoData: (state, action) => {
      state.myInfoData = action.payload;
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
  fetchRoomDB,
  saveMyInfoData,
} = roomSlice.actions;
export default roomSlice.reducer;
