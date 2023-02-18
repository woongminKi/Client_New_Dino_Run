import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userInfoRequest } from "../components/features/user/userSlice";

//커스텀 훅처럼 따로 뺴서 관리하고 싶음..
export default async function Profile() {
  const [userId, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const dispatch = useDispatch();

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
    console.log("Err:", err);
  }

  if (userId && nickName && profileImage) {
    dispatch(userInfoRequest({ userId, nickName, profileImage }));
  }

  return (
    <div>
      <h2>{userId}</h2>
      <h2>{nickName}</h2>
      <img src={profileImage} alt="" />
    </div>
  );
}
