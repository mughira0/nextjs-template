"use client";

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import { IMessage } from "@/types/system/slice";

interface MessagesListProps {
  messages: IMessage[];
  currentUserId: string;
}

export function MessagesList({ messages, currentUserId }: MessagesListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-[var(--chat-bg)]">
        <div className="flex size-14 items-center justify-center rounded-full bg-[var(--chat-room-hover)]">
          <MessageCircle className="size-7 text-[var(--chat-text-muted)]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--chat-text-main)]">
            No messages yet
          </p>
          <p className="text-xs text-[var(--chat-text-muted)]">
            Send a message to start the conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[var(--chat-bg)] scrollbar-themed">
      <div className="flex flex-col gap-3 px-4 py-4">
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showSenderInfo =
            !prevMessage || prevMessage.senderId !== message.senderId;

          return (
            <MessageBubble
              key={message._id}
              message={message}
              currentUserId={currentUserId}
              showSenderInfo={showSenderInfo}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
