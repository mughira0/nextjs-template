"use client";

import { CHAT_VIEW_STATE } from "@/data/usage";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import Rooms from "./chat-rooms";
import { ChatWindow } from "./chat-window";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDispatch } from "react-redux";
import { clearChatState, setChatView } from "@/redux/slices/chat";
import { cn } from "@/helper/generic";

function RenderChat() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const { chatView, activeRoomId } = useSelector(
    (state: RootState) => state.chatReducer,
  );

  // 1. Sync view state based on screen size + active room
  useEffect(() => {
    if (!isMobile) {
      if (chatView !== CHAT_VIEW_STATE.EXPAND) {
        dispatch(setChatView(CHAT_VIEW_STATE.EXPAND));
      }
      return;
    }
    if (activeRoomId) {
      dispatch(setChatView(CHAT_VIEW_STATE.CHAT));
    } else {
      dispatch(setChatView(CHAT_VIEW_STATE.ROOMS));
    }
  }, [isMobile, activeRoomId, chatView, dispatch]);

  // 2. Cleanup only when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearChatState());
    };
  }, [dispatch]);
  return (
    <div
      className={cn(
        "h-full min-h-0 p-2 gap-3",
        "grid grid-cols-1", // base
        chatView === CHAT_VIEW_STATE.EXPAND ? "grid-rows-1" : "grid-rows-1", // mobile = single row ALWAYS
        "lg:grid-cols-[320px_1fr] lg:grid-rows-1",
      )}
    >
      {chatView != CHAT_VIEW_STATE.CHAT && <Rooms />}
      {chatView != CHAT_VIEW_STATE.ROOMS && (
        <div className="flex w-full min-h-0 overflow-hidden rounded-[var(--chat-radius)] border border-[var(--chat-border)] bg-[var(--chat-bg)] shadow-sm lg:min-w-0">
          <ChatWindow />
        </div>
      )}
    </div>
  );
}

export default RenderChat;
