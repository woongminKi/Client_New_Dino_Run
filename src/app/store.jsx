import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import auth from "../components/features/auth/authSlice";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import authSaga from "../components/features/auth/authSaga";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth,
});

function* rootSaga() {
  yield all([authSaga()]);
}

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;
