"use client";

import { messages as messagesData, meUser, roomsData } from "@/data/dummy";
import { RootState } from "@/redux/store/store";
import { IMessage } from "@/types/system/slice";
import { MessageCircleOff } from "lucide-react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { MessagesList } from "./messages-list";

export function ChatWindow() {
  const { user } = useSelector((state: RootState) => state.authReducer);

  const { activeRoomId } = useSelector((state: RootState) => state.chatReducer);
  const [messages, setMessages] = useState<IMessage[]>(messagesData);

  const room = roomsData.find((r) => r._id === activeRoomId) ?? null;

  const handleSendMessage = useCallback(
    (text: string, attachments: File[] = []) => {
      console.log("handleSendMessage called with:", { text, attachments });
      if (!room) return;
      const currentUser = meUser;
      if (!currentUser) return;

      const newMessage: IMessage = {
        _id: `m${Date.now()}`,
        roomId: room._id,
        senderId: user?._id!,
        text,
        attachments: [],
        to: room.users.filter((u) => u._id !== user?._id).map((u) => u._id),
        from: currentUser,
        createdAt: new Date().toISOString(),
        readBy: [user?._id!],
      };
      console.log("New message:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    },
    [room],
  );

  if (!room) {
    return (
      <div className="flex flex-1  w-full flex-col items-center justify-center gap-3 bg-[var(--chat-bg)]">
        <div className="flex size-16 items-center justify-center rounded-full bg-[var(--chat-room-hover)]">
          <MessageCircleOff className="size-8 text-[var(--chat-text-muted)]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--chat-text-main)]">
            Select a conversation
          </p>
          <p className="text-xs text-[var(--chat-text-muted)]">
            Choose a room from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  const roomMessages = messages.filter((m) => m.roomId === room._id);

  return (
    <div className="flex h-full min-h-0 flex-col w-full">
      <ChatHeader room={room} />
      <MessagesList messages={roomMessages} currentUserId={user?._id!} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
