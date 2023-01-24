import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Main from "../components/Main";
import ReadyRoom from "../components/game/ReadyRoom";
import KakaoRedirectHandler from "../components/KakaoRedirectHandler";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/readyRoom/:roomid" element={<ReadyRoom />} />

        <Route
          path="/oauth/kakao/callback"
          element={<KakaoRedirectHandler />}
        />
      </Routes>
    </>
  );
}

export default App;
