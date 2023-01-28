import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "../components/features/auth/authSlice";
import user from "../components/features/user/userSlice";
import room from "../components/features/room/roomSlice";
import game from "../components/features/game/gameSlice";

import authSaga from "../components/features/auth/authSaga";
import userSaga from "../components/features/user/userSaga";
import roomSaga from "../components/features/room/roomSaga";
import { gameSocketSaga } from "../modules/useSocket";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  auth,
  user,
  room,
  game,
});

const persistedReducer = persistReducer(persistConfig, reducer);

function* rootSaga() {
  yield all([authSaga(), userSaga(), roomSaga(), gameSocketSaga()]);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;
