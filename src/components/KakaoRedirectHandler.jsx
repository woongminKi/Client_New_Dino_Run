import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginRequest } from "./features/auth/authSlice";
import { useEffect } from "react";

export default function KakaoRedirectHandler() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  useEffect(() => {
    async function handleLogin() {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get("code");
      const grantType = "authorization_code";
      const clientId = "fc68dfe18e2e8c79b2dfba1be0fc0eb7";
      const redirectURI = "http://localhost:3000/oauth/callback/kakao";

      const tokenURL = "https://kauth.kakao.com/oauth/token";
      const data = {
        grant_type: grantType,
        client_id: clientId,
        redirect_uri: redirectURI,
        code,
      };

      const responseToken = await axios.post(tokenURL, data, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      console.log("res::", responseToken);

      if (!loginStatus) {
        dispatch(loginRequest({ responseToken }));
      }

      if (responseToken.status === 200) {
        navigate("/main");
      }
    }
    handleLogin();
  }, [loginStatus]);
}
