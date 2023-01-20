import axios from "axios";
import { all, fork, put, takeLatest, takeEvery } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";

function* userLogin({ payload }) {
  const { data } = payload.responseToken;

  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;
  const accessTokenExpiresIn = data.expires_in;
  const refreshTokenExpiresIn = data.refresh_token_expires_in;

  try {
    yield axios.post("http://localhost:8000/login", {
      header: {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        refreshTokenExpiresIn,
      },
    });
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest, userLogin);
}

export default function* authSaga() {
  yield all([fork(watchLogin)]);
}