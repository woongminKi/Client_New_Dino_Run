import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ReadyRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomStatus = useSelector((state) => state.room);

  return <div>Room</div>;
}
