import React from "react";
import styled from "styled-components";

export default function Home() {
  const clientId = "fc68dfe18e2e8c79b2dfba1be0fc0eb7";
  const redirectURI = "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`;

  return (
    <>
      <a href={KAKAO_AUTH_URL}>
        <button>로그인</button>
        {/* <KakaoBtn>button</KakaoBtn> */}
      </a>
    </>
  );
}
//http://localhost:3000/oauth/callback/kakao

const KakaoBtn = styled.div`
  background-image: url("../src/images/kakao_login_medium_narrow.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px auto;
  /* padding: -10px; */
  color: transparent;
  width: 300px;
  height: 45px;
`;
