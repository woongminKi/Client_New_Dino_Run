import React from "react";
import { useSelector } from "react-redux";

export default function Lobby() {
  const userId = useSelector((state) => state.user.userId);
  console.log("userId:", userId);
  return <div>Lobby</div>;
}
