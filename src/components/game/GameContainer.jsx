import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GameCanvas from "./GameCanvas";

export default function GameContainer() {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const { myScore, player2Score, isDead } = useSelector((state) => state.game);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, []);

  return (
    <GameWrapper>
      <ScoreWrapper>
        <div>내 점수: {myScore} /</div>
        <div>상대 점수: {player2Score} </div>
      </ScoreWrapper>
      {isDead && Number(myScore) === Number(player2Score) ? (
        <div className="same">무승부</div>
      ) : Number(myScore) > Number(player2Score) ? (
        <div className="winner">승</div>
      ) : (
        <div className="loser">패</div>
      )}
      <GameCanvas />
    </GameWrapper>
  );
}

const GameWrapper = styled.div`
  background-color: #f5f5f5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .winner {
    color: red;
  }

  .loser {
    color: blue;
  }
`;

const ScoreWrapper = styled.div`
  display: flex;
  margin-top: 70px;
`;
