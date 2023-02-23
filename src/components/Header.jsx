import React from "react";
import styled from "styled-components";
import { MAIN_COLOR_1 } from "../utils/color";

export default function Header({
  image,
  name,
  func1,
  children1,
  func2,
  children2,
}) {
  return (
    <HeaderWrapper>
      <ProfileWapper>
        <ProfileImage src={image} alt="프로필 사진" />
        <UserName>{name}</UserName>
      </ProfileWapper>
      <RoomMakeButton className="action1" onClick={func1}>
        {children1}
      </RoomMakeButton>
      {children2 && (
        <RoomMakeButton className="action2" onClick={func2}>
          {children2}
        </RoomMakeButton>
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: felx;
  border-bottom: 1px solid lightgray;
  line-height: 1.5;
  justify-content: space-between;
  align-items: center;

  .action1:hover {
    padding: 15px 50px 15px 50px;
    transition: all 0.2s linear 0s;
    color: ${MAIN_COLOR_1};
  }
  .action2:hover {
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
