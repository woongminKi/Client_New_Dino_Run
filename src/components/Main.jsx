import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userInfoRequest } from "./features/user/userSlice";
import { loginSuccess } from "./features/auth/authSlice";
import RoomModal from "./modal/RoomModal";
import styled from "styled-components";

export default function Main() {
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [title, setTitle] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const getProfile = async () => {
    try {
      const data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

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

  const handleOpenRoomModal = () => {
    setIsOpenModal(true);
  };

  const handleCancleRoom = () => {
    setIsOpenModal(false);
  };

  const handleMakeRoom = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Container>
        <div>{userId}</div>
        <Header>
          <ProfileWapper>
            <ProfileImage src={profileImage} alt="프로필 사진" />
            <UserName>{nickName}</UserName>
          </ProfileWapper>
          <RoomMakeButton className="make-room" onClick={handleOpenRoomModal}>
            방 만들기
          </RoomMakeButton>
        </Header>
      </Container>

      {isOpenModal && (
        <RoomModal isMade={handleMakeRoom} isClosed={handleCancleRoom}>
          {
            <form>
              제목:
              <input
                type="text"
                name="roomTitle"
                placeholder="방 제목을 입력해주세요."
                onChange={(e) => setTitle(e.target.value)}
              />
            </form>
          }
        </RoomModal>
      )}
    </>
  );
}

const Container = styled.div`
  background: url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile8.uf.tistory.com%2Fimage%2F993F4C3359C52BF5379685);
  background-repeat: repeat-y;
  background-size: 100% 300px;
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  display: felx;
  border-bottom: 1px solid lightgray;
  line-height: 1.5;
  justify-content: space-between;
  align-items: center;

  .make-room:hover {
    padding: 15px 50px 15px 50px;
    transition: all 0.2s linear 0s;
  }
`;

const ProfileWapper = styled.div`
  display: flex;
  margin: 10px 0 10px 50px;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
`;

const UserName = styled.div`
  margin-left: 15px;
`;

const RoomMakeButton = styled.button`
  margin-right: 50px;
  padding: 10px 30px 10px 30px;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s;
  font-size: 18px;
  font-weight: 50;
`;
