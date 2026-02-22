"use client";

import { Check, CheckCheck } from "lucide-react";
import { IMessage } from "@/types/system/slice";
import { cn, formatMessageDate, generateAvatarProps } from "@/helper/generic";
import { Avatar } from "../avatar";

const MESSAGE_MAX_WIDTH = "70%";

interface MessageBubbleProps {
  message: IMessage;
  currentUserId: string;
  showSenderInfo?: boolean;
}

export function MessageBubble({
  message,
  currentUserId,
  showSenderInfo = true,
}: MessageBubbleProps) {
  const isOwn = message.senderId === currentUserId;
  const avatarProps = generateAvatarProps(message.from);
  const isRead = message.readBy.length > 1;

  return (
    <div
      className={cn(
        "flex gap-2.5 px-1",
        isOwn ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!isOwn && showSenderInfo && (
        <Avatar {...avatarProps} className="mt-1 size-8 shrink-0" />
      )}

      {!isOwn && !showSenderInfo && <div className="size-8 shrink-0" />}

      <div
        className={cn(
          "flex flex-col gap-1",
          isOwn ? "items-end" : "items-start",
        )}
        style={{ maxWidth: MESSAGE_MAX_WIDTH }}
      >
        {!isOwn && showSenderInfo && (
          <span className="text-xs font-medium text-[var(--chat-text-muted)]">
            {message.from.name}
          </span>
        )}

        <div
          className={cn(
            "rounded-[var(--chat-radius)] px-3.5 py-2.5 text-sm leading-relaxed border border-[var(--chat-border)] shadow-sm",
            isOwn
              ? "rounded-br-[var(--chat-radius-sm)] bg-[var(--chat-message-own-bg)] text-[var(--chat-message-own-text)]"
              : "rounded-bl-[var(--chat-radius-sm)] bg-[var(--chat-message-other-bg)] text-[var(--chat-message-other-text)]",
          )}
        >
          {message.text}
        </div>

        <div
          className={cn(
            "flex items-center gap-1",
            isOwn ? "flex-row-reverse" : "flex-row",
          )}
        >
          <span className="text-[10px] text-[var(--chat-text-muted)]">
            {formatMessageDate(message.createdAt)}
          </span>
          {isOwn &&
            (isRead ? (
              <CheckCheck className="size-3.5 text-[var(--chat-message-own-text)] opacity-80" />
            ) : (
              <Check className="size-3.5 text-[var(--chat-text-muted)]" />
            ))}
        </div>
      </div>
    </div>
  );
}
