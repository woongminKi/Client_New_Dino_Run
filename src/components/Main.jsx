import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoRequest } from "./features/user/userSlice";
import { loginSuccess } from "./features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function Main() {
  const [userId, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      const data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  if (userId && nickName && profileImage) {
    dispatch(userInfoRequest({ userId, nickName, profileImage }));
  }

  // if (loginStatus) {
  //   Navigate("/main");
  // }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h2>{userId}</h2>
      <h2>{nickName}</h2>
      <img src={profileImage} alt="" />
    </div>
  );
}
