import axios from "axios";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import { userInfoRequest, userInfoFailure } from "./userSlice";

function* userInfo({ payload }) {
  const { userId, nickName, profileImage } = payload;
  console.log("REACT_APP_SERVER_URL::", process.env.REACT_APP_SERVER_URL);
  try {
    yield axios.post(`${process.env.REACT_APP_SERVER_URL}/user/register`, {
      userId,
      nickName,
      profileImage,
    });
  } catch (err) {
    console.log("user saga Error exist: ", err);
    yield put(userInfoFailure(err));
  }
}

function* watchUserInfo() {
  yield takeLatest(userInfoRequest, userInfo);
}

export default function* userSaga() {
  yield all([fork(watchUserInfo)]);
}
