import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function KakaoRedirectHandler() {
  const navigate = useNavigate();

  const postLogin = async () => {
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

    try {
      await axios.post("http://localhost:8000/login", responseToken);
    } catch (error) {
      console.log("error::", error);
    }
  };

  //react query에서 데이터를 수정하는 post, update, patch(put)을 할 때 useMutation을 사용
  //로그인은 로그인 시에는 POST를 써서 ID와 PW가 body에 담겨서 보내지는데 이것을 HTTPS를 적용하면 암호화가 된다. 그래서 로그인시 post 사용: https://ssdragon.tistory.com/92
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    postLogin,
    {
      onSuccess: () => {
        navigate("/main");
      },
      onError: (err) => {
        console.log("err::", err);
      },
    }
  );

  console.log(
    `isLoading: ${isLoading}, isError: ${isError}, error: ${error}, isSuccess: ${isSuccess}`
  );

  useEffect(() => {
    mutate();
  }, []);
}
