import { CHAT_VIEW_STATE } from "@/data/usage";
import { IChatState } from "@/types/system/slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IChatState = {
  activeRoomId: null,
  unreadCount: 0,
  chatView: CHAT_VIEW_STATE.EXPAND,
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setActiveRoomId(state, action: PayloadAction<string>) {
      state.activeRoomId = action.payload;
    },
    updateUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },
    setChatView(
      state,
      action: PayloadAction<
        (typeof CHAT_VIEW_STATE)[keyof typeof CHAT_VIEW_STATE]
      >,
    ) {
      state.chatView = action.payload;
    },
    clearChatState() {
      return initialState;
    },
  },
});

export const {
  setActiveRoomId,
  updateUnreadCount,
  setChatView,
  clearChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
