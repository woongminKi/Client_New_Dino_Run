import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GameCanvas from "./GameCanvas";

export default function GameContainer() {
  const { myScore, player2Score } = useSelector((state) => state.game);

  return (
    <>
      <div>내 점수: {myScore} </div>
      <div>상대 점수: {player2Score} </div>
      <GameCanvas />
    </>
  );
}
