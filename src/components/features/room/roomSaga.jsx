import axios from "axios";
import { all, fork, put, takeLatest, takeEvery } from "redux-saga/effects";
import { roomRegister, makeRoomSuccess } from "./roomSlice";
import { getCookie } from "../../../utils/cookies";

function* roomInfo({ payload }) {
  const { title, userId, nickName, profileImage } = payload;

  try {
    if (title) {
      yield axios.post(`http://localhost:8000/room/register/${userId}`, {
        title,
        userId,
        nickName,
        profileImage,
        headers: {
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      });
    }

    const getRoomArray = yield axios.get(
      `http://localhost:8000/room/register/${userId}`,
      {
        userId,
        headers: {
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      }
    );
    console.log("getRoomArray::", getRoomArray);
  } catch (err) {
    console.log("Error exist: ", err);
  }
}

function* watchRoomInfo() {
  // yield takeEvery(roomRegister, roomInfo);
}

export default function* roomSaga() {
  yield all([fork(watchRoomInfo)]);
}
