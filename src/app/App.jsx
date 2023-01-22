import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Main from "../components/Main";
import Lobby from "../components/Lobby";
import KakaoRedirectHandler from "../components/KakaoRedirectHandler";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/lobby" element={<Lobby />} />

        <Route
          path="/oauth/kakao/callback"
          element={<KakaoRedirectHandler />}
        />
      </Routes>
    </>
  );
}

export default App;
