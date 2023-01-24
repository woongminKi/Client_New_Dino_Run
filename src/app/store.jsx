import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import auth from "../components/features/auth/authSlice";
import user from "../components/features/user/userSlice";
import room from "../components/features/room/roomSlice";

import authSaga from "../components/features/auth/authSaga";
import userSaga from "../components/features/user/userSaga";
import roomSaga from "../components/features/room/roomSaga";
import { gameSocketSaga } from "../modules/useSocket";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth,
  user,
  room,
});

function* rootSaga() {
  yield all([authSaga(), userSaga(), roomSaga(), gameSocketSaga()]);
}

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;
