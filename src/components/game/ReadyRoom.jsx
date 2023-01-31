import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import { readyRequest } from "../features/game/gameSlice";
import { socketAction } from "../../modules/useSocket";
import { getCookie } from "../../utils/cookies";

export default function ReadyRoom() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomStatus = useSelector((state) => state.room);
  const { myReadyState, player2Ready } = useSelector((state) => state.game);
  const { authorInfo, myInfo } = roomStatus.userData;
  const { title } = roomStatus;

  const getReadyForGame = () => {
    setIsReady((current) => !current);
    dispatch(readyRequest(isReady));

    socketAction.otherPlayerReadyRequest(isReady);
  };

  if (!getCookie("accessToken")) {
    navigate("/");
  }

  useEffect(() => {
    if (myReadyState && player2Ready) {
      navigate("/gameRoom");
    }
  }, [myReadyState, player2Ready]);

  useEffect(() => {
    dispatch(readyRequest(isReady));
  }, []);

  return (
    <Container>
      <Header
        image={roomStatus.myInfoData.profileImage}
        name={title}
        func={getReadyForGame}
        children={"준비"}
      />

      <UserWrapper>
        {!authorInfo ? (
          <MyInfoWrapper>
            <ImageSource
              src={roomStatus.myInfoData.profileImage}
              alt="내 이미지"
            />
            <ContentsWrapper>
              {roomStatus.myInfoData.nickName}
              <ReadyText>{myReadyState ? "Ready" : ""}</ReadyText>
            </ContentsWrapper>
          </MyInfoWrapper>
        ) : authorInfo.nickName === roomStatus.myInfoData.nickName ? (
          <>
            <MyInfoWrapper>
              <ImageSource
                src={roomStatus.myInfoData.profileImage}
                alt="내 이미지"
              />
              <ContentsWrapper>
                {roomStatus.myInfoData.nickName}
                <ReadyText>{myReadyState ? "Ready" : ""}</ReadyText>
              </ContentsWrapper>
            </MyInfoWrapper>
            <OthersUserInfoWrapper>
              <ImageSource src={myInfo.profileImage} alt="상대방 이미지" />
              <ContentsWrapper>
                {myInfo.nickName}
                <ReadyText>{player2Ready ? "Ready" : ""}</ReadyText>
              </ContentsWrapper>
            </OthersUserInfoWrapper>
          </>
        ) : (
          <>
            <MyInfoWrapper>
              <ImageSource
                src={roomStatus.myInfoData.profileImage}
                alt="내 이미지"
              />
              <ContentsWrapper>
                {roomStatus.myInfoData.nickName}
                <ReadyText>{myReadyState ? "Ready" : ""}</ReadyText>
              </ContentsWrapper>
            </MyInfoWrapper>
            <OthersUserInfoWrapper>
              <ImageSource src={authorInfo.profileImage} alt="상대방 이미지" />
              <ContentsWrapper>
                {authorInfo.nickName}
                <ReadyText>{player2Ready ? "Ready" : ""}</ReadyText>
              </ContentsWrapper>
            </OthersUserInfoWrapper>
          </>
        )}
      </UserWrapper>
    </Container>
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

const UserWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MyInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  border-radius: 0.5rem;
  width: 490px;
  height: 250px;
  background-color: white;
`;

const ImageSource = styled.img`
  width: 250px;
  height: 100%;
`;

const OthersUserInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  border-radius: 0.5rem;
  width: 490px;
  height: 250px;
  background-color: white;
`;

const ContentsWrapper = styled.div`
  margin: 55px 0 0 10px;
  align-items: center;
`;

const ReadyText = styled.div`
  margin-top: 90px;
  font-weight: 900;
  font-size: 40px;
`;
