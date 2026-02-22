"use client";

import { cn, generateAvatarProps } from "@/helper/generic";
import { IRoom, IUser } from "@/types/system/slice";
import { Bell, ExternalLink, MoreVertical, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Avatar } from "../avatar";
import Button from "../button";
import GroupAvatars from "../group-avatar";
import Popper from "../popper";

interface ChatHeaderProps {
  room: IRoom;
}

export function ChatHeader({ room }: ChatHeaderProps) {
  const { user } = useSelector((state: any) => state.authReducer);
  const otherUser = room.isGroup
    ? null
    : (room.users.find((u) => u._id !== user?._id) ?? null);

  return (
    <header
      className="flex shrink-0 items-center justify-between border-b border-[var(--chat-border)] bg-[var(--chat-header-bg)] px-4"
      style={{ height: "var(--chat-header-height)" }}
    >
      <div className={cn("flex items-center gap-3")}>
        {room.isGroup ? (
          <GroupAvatars users={room.users} />
        ) : otherUser ? (
          <UserAvatar user={otherUser} />
        ) : null}

        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-[var(--chat-text-main)]">
            {room.isGroup ? room.name : otherUser?.name}
          </h2>
          {room.isGroup && (
            <span className="text-xs text-[var(--chat-text-muted)]">
              {`${room.users.length} members`}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 ">
        <Popper
          items={[
            {
              label: "Profile",
              value: "view_profile",
              icon: <User className="size-4" />,
            },
            {
              label: "Notifications",
              value: "mute_notifications",
              icon: <Bell className="size-4" />,
            },
            {
              label: "Leave",
              value: "leave_group",
              icon: <ExternalLink className="size-4" />,
            },
          ]}
        >
          <Button variant="primary" size="sm" aria-label="More options">
            <MoreVertical className="size-4 text-[var(--white-color)]" />
          </Button>
        </Popper>
      </div>
    </header>
  );
}

function UserAvatar({ user }: { user: IUser }) {
  const props = generateAvatarProps(user);
  return (
    <div className="relative">
      <Avatar {...props} className="size-10" />
    </div>
  );
}
