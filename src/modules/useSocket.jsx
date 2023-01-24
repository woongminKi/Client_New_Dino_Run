import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import { roomRegister, joinRoom } from "../components/features/room/roomSlice";

export const socket = io.connect("http://localhost:8000", {
  path: "/socket.io",
  transports: ["websocket"],
  cors: {
    origin: "http://localhost:8000",
  },
});

export const socketAction = {
  joinRoom: (data) => {
    socket.emit("joinRoom", data);
  },
};

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("joinRoom", (data) => {
      emit(joinRoom(data));
    });

    return () => {
      socket.off("joinRoom");
    };
  });
}

export function* gameSocketSaga() {
  const readyGame = yield call(createSocketChannel, socket);
  while (true) {
    const action = yield take(readyGame);
    yield put(action);
  }
}
