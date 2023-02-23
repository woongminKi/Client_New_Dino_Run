import axios from "axios";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import { roomRegister, responseRoomDB, fetchRoomDB } from "./roomSlice";
import { getCookie } from "../../../utils/cookies.jsx";

const accessToken = sessionStorage.getItem("accessToken");
const refreshToken = sessionStorage.getItem("refreshToken");
console.log("accessToken::", accessToken);
console.log("refreshToken::", refreshToken);

function* roomInfo({ payload }) {
  const { title, userId, nickName, profileImage } = payload;
  // const accessToken = sessionStorage.getItem("accessToken");
  // const refreshToken = sessionStorage.getItem("refreshToken");
  // console.log("accessToken::", accessToken);
  // console.log("refreshToken::", refreshToken);

  try {
    yield axios.post(`${process.env.REACT_APP_SERVER_URL}/rooms/${userId}`, {
      title,
      userId,
      nickName,
      profileImage,
      headers: {
        // accessAuthorization: `${getCookie("accessToken")}`,
        accessAuthorization: accessToken,
        // refreshAuthorization: `${getCookie("refreshToken")}`,
        refreshAuthorization: refreshToken,
      },
    });

    const getRoomArray = yield axios.get(
      `${process.env.REACT_APP_SERVER_URL}/rooms/${userId}`,
      {
        headers: {
          accessAuthorization: accessToken,
          refreshAuthorization: refreshToken,
          // accessAuthorization: `${getCookie("accessToken")}`,
          // refreshAuthorization: `${getCookie("refreshToken")}`,
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
  console.log("::: fetchDBList", {
    payload,
  });

  try {
    const getRoomArray = yield axios.get(
      `${process.env.REACT_APP_SERVER_URL}/rooms/${userId}`,
      {
        headers: {
          // accessAuthorization: `${getCookie("accessToken")}`,
          // refreshAuthorization: `${getCookie("refreshToken")}`,
          accessAuthorization: accessToken,
          refreshAuthorization: refreshToken,
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
