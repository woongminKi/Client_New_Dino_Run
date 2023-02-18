import axios from "axios";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import { roomRegister, responseRoomDB, fetchRoomDB } from "./roomSlice";
import { getCookie } from "../../../utils/cookies";

function* roomInfo({ payload }) {
  const { title, userId, nickName, profileImage } = payload;

  try {
    yield axios.post(`${process.env.REACT_APP_SERVER_URL}/rooms/${userId}`, {
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
      `${process.env.REACT_APP_SERVER_URL}/rooms/${userId}`,
      {
        headers: {
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      }
    );

    yield put(responseRoomDB(getRoomArray.data));
  } catch (err) {
    console.log("Room saga Error exist: ", err);
  }
}

function* fetchDBList({ payload }) {
  const userId = payload;

  try {
    const getRoomArray = yield axios.get(
      `${process.env.REACT_APP_SERVER_URL}/rooms/${userId}`,
      {
        headers: {
          accessAuthorization: `${getCookie("accessToken")}`,
          refreshAuthorization: `${getCookie("refreshToken")}`,
        },
      }
    );

    yield put(responseRoomDB(getRoomArray.data));
  } catch (err) {
    console.log("Room fetchDBList Error::", err);
  }
}

function* watchRoomInfo() {
  yield takeLatest(roomRegister, roomInfo);
}

function* watchFetchRoomDB() {
  yield takeLatest(fetchRoomDB, fetchDBList);
}

export default function* roomSaga() {
  yield all([fork(watchRoomInfo), fork(watchFetchRoomDB)]);
}
