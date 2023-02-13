import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import RoomModal from "./modal/RoomModal";
import { userInfoRequest } from "./features/user/userSlice";
import {
  roomRegister,
  totalRoomUsers,
  fetchRoomDB,
  saveMyInfoData,
} from "./features/room/roomSlice";
import {
  readyRequest,
  otherPlayerReadyRequest,
} from "./features/game/gameSlice";
import { MAIN_COLOR_1 } from "../utils/color";
import { socketAction } from "../modules/useSocket";
import { getCookie } from "../utils/cookies";

export default function Main() {
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [title, setTitle] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roomStatus = useSelector((state) => state.room);
  const { roomDbArray } = roomStatus;

  console.log("roomStatus::", roomStatus);
  console.log("roomDbArray::", roomDbArray);

  const myInfo = { userId, nickName, profileImage };

  const getProfile = async () => {
    try {
      const data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      console.log("카카오 getProfile:::", data);
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

  const handleGoToRoom = (data) => {
    const roomId = data._id;
    const title = data.roomInfo.title;
    const userId = data.author.id;
    const { nickName, profileImage } = data.author;

    socketAction.joinRoom({
      title,
      userId,
      nickName,
      profileImage,
      roomId,
      myInfo,
    });
    navigate(`/readyRoom/${userId}`);
  };

  if (!getCookie("accessToken")) {
    navigate("/");
  }

  useEffect(() => {
    getProfile();
    dispatch(fetchRoomDB(userId));
    dispatch(readyRequest(false));
    dispatch(otherPlayerReadyRequest(false));
    // dispatch(clearRoom());
  }, []);

  useEffect(() => {
    if (userId && nickName && profileImage) {
      dispatch(userInfoRequest({ userId, nickName, profileImage }));
      dispatch(saveMyInfoData(myInfo));
    }
  }, [dispatch, nickName, profileImage, userId]);

  return (
    <>
      <Container>
        <Header
          image={profileImage}
          name={nickName}
          func={handleOpenRoomModal}
          children={"방만들기"}
        />

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

        {/* <RoomContainer>
          {roomDbArray.map((roomArr) => {
            console.log("roomArr", roomArr);
            return (
              <RoomWrapper key={roomArr._id}>
                <RoomUserImage
                  src={roomArr.author.profileImage}
                  alt="유저 프로필 이미지"
                />
                <ContentsWrapper>
                  <RoomTitle>제목: {roomArr.roomInfo.title}</RoomTitle>
                  <EnterButton
                    className="enter-button"
                    onClick={() => handleGoToRoom(roomArr)}
                  >
                    입장
                  </EnterButton>
                </ContentsWrapper>
              </RoomWrapper>
            );
          })}
        </RoomContainer> */}
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
