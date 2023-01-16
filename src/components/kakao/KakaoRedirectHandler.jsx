import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function KakaoRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleRedirect() {
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

      const res = await axios.post(tokenURL, data, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      console.log("res:::", res);
      if (res.status === 200) {
        navigate("/main");
      }
    }
    handleRedirect();
  }, []);

  return <div>KakaoRedirectHandler</div>;
}
