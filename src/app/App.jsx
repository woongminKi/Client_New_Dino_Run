import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import KakaoRedirectHandler from "../components/kakao/KakaoRedirectHandler";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
      </Routes>
    </>
  );
}

export default App;
