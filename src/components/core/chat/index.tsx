"use client";
import { useSocket } from "@/socket";
import React from "react";

function RenderChat() {
  const { socket, isConnected } = useSocket();
  console.log("Socket in RenderChat:", socket, isConnected);
  return <div></div>;
}

export default RenderChat;
