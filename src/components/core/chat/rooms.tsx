import { Avatar } from "@/components/core/avatar";
import { roomsData } from "@/data/dummy";
import { cn, formatDate, generateAvatarProps } from "@/helper/generic";
import { setActiveRoomId } from "@/redux/slices/chat";
import { RootState } from "@/redux/store/store";
import { IRoom } from "@/types/system/slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Rooms() {
  const [rooms, setRooms] = useState<IRoom[] | []>(roomsData);

  return (
    <aside className="flex scrollbar-themed flex-col p-2 bg-[var(--chat-bg)]  bg-card shadow-md rounded-[var(--field-radius)]  gap-1 h-[var(--chat-height)] overflow-y-auto bg-[var(--chat-sidebar-bg)] border-r border-[var(--chat-border)]">
      {rooms.map((room) => (
        <Room key={room._id} room={room} />
      ))}
    </aside>
  );
}

export default Rooms;

const Room = ({ room }: { room: IRoom }) => {
  const { activeRoomId } = useSelector((state: RootState) => state.chatReducer);
  const active = activeRoomId === room._id;

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authReducer) || {};
  const otherUser = room.users.find((e) => e._id != user?._id)!;
  const { bg, text } = getActiveClassObj(activeRoomId || "", room._id);

  const handleGetName = () => {
    let name = "";
    if (room.isGroup) {
      name = room?.name || "";
    } else {
      name = otherUser.name;
    }
    return name;
  };
  return (
    <div
      onClick={() => {
        dispatch(setActiveRoomId(room._id));
      }}
      className={cn(
        `flex gap-3 p-2 rounded-xl cursor-pointer transition`,
        active ? `${bg}` : "hover:bg-[var(--chat-room-hover)]",
      )}
    >
      {/* Avatar */}
      <Avatar {...generateAvatarProps(otherUser)} />

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "font-medium text-sm text-[var(--chat-text-main)] truncate",
              active ? text : "text-[var(--chat-text-main)]",
            )}
          >
            {handleGetName()}
          </span>

          {room.lastMessage && (
            <span
              className={cn(
                "text-[11px] text-[var(--chat-text-muted)]",
                active ? text : "",
              )}
            >
              {formatDate(room.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <p
          className={cn(
            "text-sm text-[var(--chat-text-muted)] truncate",
            active ? text : "",
          )}
        >
          {room.lastMessage?.text || "No messages yet"}
        </p>
      </div>
    </div>
  );
};

const getActiveClassObj = (activeId: string, id: string) => {
  const isActive = activeId === id;
  const obj = {
    bg: isActive
      ? "bg-[var(--chat-room-active)]!"
      : "hover:bg-[var(--chat-room-hover)]!",
    text: isActive
      ? "text-[var(--chat-text-active)]!"
      : "text-[var(--chat-text-muted)]!",
  };
  return obj;
};
