import axios from "axios";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import { roomRegister, responseRoomDB } from "./roomSlice";
import { getCookie } from "../../../utils/cookies";

function* roomInfo({ payload }) {
  const { title, userId, nickName, profileImage } = payload;

  try {
    yield axios.post(`http://localhost:8000/rooms/${userId}`, {
      title,
      userId,
      nickName,
      profileImage,
      headers: {
        accessAuthorization: `${getCookie("accessToken")}`,
        refreshAuthorization: `${getCookie("refreshToken")}`,
      },
    });

    const getRoomArray = yield axios.get(
      `http://localhost:8000/rooms/${userId}`,
      {
        headers: {
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      }
    );
    console.log("getRoomArray::", getRoomArray);
    yield put(responseRoomDB(getRoomArray.data));
  } catch (err) {
    console.log("Room saga Error exist: ", err);
  }
}

function* watchRoomInfo() {
  yield takeLatest(roomRegister, roomInfo);
}

export default function* roomSaga() {
  yield all([fork(watchRoomInfo)]);
}
