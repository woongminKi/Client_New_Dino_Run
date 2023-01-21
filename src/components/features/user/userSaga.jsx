import axios from "axios";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import { userInfoRequest, userInfoFailure } from "./userSlice";

function* userInfo({ payload }) {
  const { userId, nickName, profileImage } = payload;

  try {
    yield axios.post("http://localhost:8000/user/register", {
      userId,
      nickName,
      profileImage,
    });
  } catch (err) {
    yield put(userInfoFailure(err));
  }
}

function* watchUserInfo() {
  yield takeLatest(userInfoRequest, userInfo);
}

export default function* userSaga() {
  yield all([fork(watchUserInfo)]);
}
