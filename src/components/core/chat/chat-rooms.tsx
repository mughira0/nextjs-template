"use client";

import { Avatar } from "@/components/core/avatar";
import { roomsData } from "@/data/dummy";
import { cn, formatDate, generateAvatarProps } from "@/helper/generic";
import { setActiveRoomId, setChatView } from "@/redux/slices/chat";
import { RootState } from "@/redux/store/store";
import { IRoom } from "@/types/system/slice";
import { useDispatch, useSelector } from "react-redux";
import GroupAvatars from "../group-avatar";
import SearchInput from "../search-input";
import { CHAT_VIEW_STATE } from "@/data/usage";

function getRoomDisplayName(room: IRoom, currentUserId: string): string {
  if (room.isGroup) return room.name ?? "Group";
  const otherUser = room.users.find((u) => u._id !== currentUserId);
  return otherUser?.name ?? "Unknown";
}

function Rooms() {
  return (
    <aside className="flex min-h-0 w-full flex-col overflow-hidden rounded-[var(--chat-radius)] border border-[var(--chat-border)] bg-[var(--chat-sidebar-bg)] shadow-sm">
      <div className="p-2">
        <SearchInput
          onSearch={(query) => console.log("Searching for:", query)}
        />
      </div>

      <div className="flex flex-col gap-1 overflow-y-auto p-2 scrollbar-themed">
        {roomsData.map((room) => (
          <RoomItem key={room._id} room={room} />
        ))}
      </div>
    </aside>
  );
}

export default Rooms;

interface RoomItemProps {
  room: IRoom;
}

function RoomItem({ room }: RoomItemProps) {
  const dispatch = useDispatch();
  const { activeRoomId, chatView } = useSelector(
    (state: RootState) => state.chatReducer,
  );
  const { user } = useSelector((state: RootState) => state.authReducer);

  const currentUserId = user?._id!;
  const otherUser = room.users.find((u) => u._id !== currentUserId);
  const isActive = activeRoomId === room._id;

  if (!otherUser) return null;

  const displayName = getRoomDisplayName(room, currentUserId);

  const handleSelect = () => {
    dispatch(setActiveRoomId(room._id));
    if (chatView === CHAT_VIEW_STATE.ROOMS) {
      dispatch(setChatView(CHAT_VIEW_STATE.CHAT));
    }
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={cn(
        "grid  grid-cols-[55px_1fr] w-full gap-3 rounded-[var(--chat-radius)] p-2 text-left transition-colors",
        isActive
          ? "bg-[var(--chat-room-active)] text-[var(--chat-text-active)]"
          : "text-[var(--chat-text-main)] hover:bg-[var(--chat-room-hover)]",
      )}
    >
      {room.isGroup ? (
        <GroupAvatars users={room.users} />
      ) : (
        <Avatar
          {...generateAvatarProps(otherUser)}
          className="size-10 shrink-0"
        />
      )}

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium">{displayName}</span>
          {room.lastMessage && (
            <span
              className={cn(
                "shrink-0 text-[11px]",
                isActive
                  ? "text-[var(--chat-text-active)] opacity-90"
                  : "text-[var(--chat-text-muted)]",
              )}
            >
              {formatDate(room.lastMessage.createdAt)}
            </span>
          )}
        </div>
        <p
          className={cn(
            "truncate text-sm",
            isActive
              ? "text-[var(--chat-text-active)] opacity-90"
              : "text-[var(--chat-text-muted)]",
          )}
        >
          {room.lastMessage?.text ?? "No messages yet"}
        </p>
      </div>
    </button>
  );
}
