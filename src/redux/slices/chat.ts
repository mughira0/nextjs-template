import { IChatState } from "@/types/system/slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IChatState = {
  activeRoomId: null,
  unreadCount: 0,
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
    clearChatState() {
      return initialState;
    },
  },
});

export const { setActiveRoomId, updateUnreadCount, clearChatState } =
  chatSlice.actions;

export default chatSlice.reducer;
