import axios from "axios";
import { all, fork, put, takeLatest, takeEvery } from "redux-saga/effects";
import { loginRequest, loginFailure } from "./authSlice";
import { setCookie } from "../../../utils/cookies";

function* userLogin({ payload }) {
  const { data } = payload.res;

  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;
  const accessTokenExpiresIn = data.expires_in;
  const refreshTokenExpiresIn = data.refresh_token_expires_in;

  try {
    yield axios.post("http://localhost:8000/user/login", {
      header: {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        refreshTokenExpiresIn,
      },
    });

    setCookie("accessToken", accessToken, {
      path: "/",
      expires: accessTokenExpiresIn,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    setCookie("refreshToken", refreshToken, {
      path: "/",
      expires: refreshTokenExpiresIn,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* watchLogin() {
  yield takeEvery(loginRequest, userLogin);
}

export default function* authSaga() {
  yield all([fork(watchLogin)]);
}
