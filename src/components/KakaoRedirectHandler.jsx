import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, loginSuccess } from "./features/auth/authSlice";
import { useCookies } from "react-cookie";

import qs from "qs";
import axios from "axios";

export default function KakaoRedirectHandler() {
  const [cookies, setCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const restAPIKey = `${process.env.REACT_APP_CLIENT_API_ID}`;
  const redirectURI = `${process.env.REACT_APP_CLIENT_URL}/oauth/kakao/callback`;
  // const clientSecret = process.env.REACT_APP_CLIENT_SECRET_ID;
  const grantType = "authorization_code";

  const code = new URL(window.location.href).searchParams.get("code");

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: grantType,
      client_id: restAPIKey,
      redirect_uri: redirectURI,
      code,
      // client_secret: clientSecret,
    });

    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );

      window.Kakao.init(restAPIKey);
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      setCookie("accessToken", res.data.access_token, {
        path: "/",
        sameSite: "none",
        secure: true,
        maxAge: 604800,
      });

      setCookie("refreshToken", res.data.refresh_token, {
        path: "/",
        sameSite: "none",
        secure: true,
        maxAge: 604800,
      });

      if (!loginStatus) {
        dispatch(loginRequest({ res }));
        dispatch(loginSuccess());
      }

      if (res.status === 200) {
        navigate("/main");
      }
    } catch (err) {
      console.log("Err:", err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
}
