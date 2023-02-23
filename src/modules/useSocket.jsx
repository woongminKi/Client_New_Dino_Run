import { io } from "socket.io-client";
import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import { joinRoom } from "../components/features/room/roomSlice";
import {
  otherPlayerReadyRequest,
  getPlayer2Score,
} from "../components/features/game/gameSlice";

export const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
  path: "/socket.io",
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
  withCredentials: true,
});

console.log("소켓 연결됨?", socket.connected);
socket.on("connect", function () {
  console.log("소켓 연결됨?22", socket.connected);
});

export const socketAction = {
  joinRoom: (data) => {
    socket.emit("joinRoom", data);
  },
  otherPlayerReadyRequest: (data) => {
    socket.emit("otherPlayerReadyStatus", data);
  },
  gameScore: (score) => {
    socket.emit("gameScore", score);
  },
  otherPlayerVideo: (video) => {
    socket.emit("otherPlayerVideo", video);
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
    socket.on("gameScore", (score) => {
      emit(getPlayer2Score(score));
    });

    return () => {
      socket.off("joinRoom");
      socket.off("otherPlayerReadyStatus");
      socket.off("gameScore");
      socket.off("otherPlayerVideo");
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
