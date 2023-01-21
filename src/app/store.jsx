import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import auth from "../components/features/auth/authSlice";
import user from "../components/features/user/userSlice";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import authSaga from "../components/features/auth/authSaga";
import userSaga from "../components/features/user/userSaga";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth,
  user,
});

function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;
