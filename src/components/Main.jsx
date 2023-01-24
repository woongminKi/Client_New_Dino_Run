import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { userInfoRequest } from "./features/user/userSlice";
import { roomRegister, totalRoomUsers } from "./features/room/roomSlice";
import RoomModal from "./modal/RoomModal";
import { MAIN_COLOR_1 } from "../utils/color";
import { socketAction } from "../modules/useSocket";

export default function Main() {
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [title, setTitle] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const roomStatus = useSelector((state) => state.room);
  const { roomList } = roomStatus;

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

  const handleOpenRoomModal = () => {
    setIsOpenModal(true);
  };

  const handleCancleRoom = () => {
    setIsOpenModal(false);
  };

  const handleMakeRoom = () => {
    setIsOpenModal(false);
    dispatch(roomRegister({ title, userId, nickName, profileImage }));
    dispatch(totalRoomUsers({ title, userId, nickName, profileImage }));
  };

  const handleGoToRoom = (userId) => {
    socketAction.joinRoom({ title, userId, nickName, profileImage });
    navigate(`/readyRoom/${userId}`);
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (userId && nickName && profileImage) {
      dispatch(userInfoRequest({ userId, nickName, profileImage }));
    }
  }, [dispatch, nickName, profileImage, userId]);

  return (
    <>
      <Container>
        <Header>
          <ProfileWapper>
            <ProfileImage src={profileImage} alt="프로필 사진" />
            <UserName>{nickName}</UserName>
          </ProfileWapper>
          <RoomMakeButton className="make-room" onClick={handleOpenRoomModal}>
            방 만들기
          </RoomMakeButton>
        </Header>

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

        <RoomContainer>
          {roomList.map((room) => {
            console.log("리스트:", room);
            return (
              <RoomWrapper key={room.title}>
                <RoomUserImage
                  src={room.profileImage}
                  alt="유저 프로필 이미지"
                />
                <ContentsWrapper>
                  <RoomTitle>제목: {room.title}</RoomTitle>
                  <EnterButton
                    className="enter-button"
                    onClick={() => handleGoToRoom(room.userId)}
                  >
                    입장
                  </EnterButton>
                </ContentsWrapper>
              </RoomWrapper>
            );
          })}
        </RoomContainer>
      </Container>
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
    color: ${MAIN_COLOR_1};
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

const RoomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RoomWrapper = styled.div`
  display: flex;
  margin: 10px;
  border-radius: 0.5rem;
  width: 300px;
  height: 150px;
  background-color: white;
`;

const RoomUserImage = styled.img`
  width: 150px;
  height: 100%;
`;

const RoomTitle = styled.div`
  font-weight: 500;
  font-family: NanumGothic;
`;

const EnterButton = styled.button`
  margin-top: 25px;
  width: 130px;
  height: 30px;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
`;

const ContentsWrapper = styled.div`
  margin: 55px 0 0 10px;
  .enter-button: hover {
    transition: all 0.2s linear 0s;
    color: ${MAIN_COLOR_1};
  }
`;
