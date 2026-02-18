"use client";

import Rooms from "./rooms";

function RenderChat() {
  return (
    <div className="grid gap-2 p-2  h-[var(--chat-height)]   grid-cols-[320px_1fr] ">
      <Rooms />
      <div className="flex items-center justify-center text-sm text-[rgb(var(--chat-text-muted))]">
        Select a conversation to start chatting
      </div>
    </div>
  );
}

export default RenderChat;
