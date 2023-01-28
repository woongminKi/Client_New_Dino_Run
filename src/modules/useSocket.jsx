import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import { joinRoom } from "../components/features/room/roomSlice";
import { otherPlayerReadyRequest } from "../components/features/game/gameSlice";

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
  otherPlayerReadyRequest: (data) => {
    socket.emit("otherPlayerReadyStatus", data);
  },
};

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("joinRoom", (userData, currentRoom) => {
      emit(joinRoom(userData, currentRoom));
    });
    socket.on("otherPlayerReadyStatus", (readyData) => {
      emit(otherPlayerReadyRequest(readyData));
    });

    return () => {
      socket.off("joinRoom");
      socket.off("otherPlayerReadyStatus");
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
