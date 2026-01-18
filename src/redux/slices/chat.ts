import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Message, Room } from "@/types/system/slice";

const initialState: ChatState = {
  rooms: [],
  activeRoomId: null,
  messages: [],
  typingUsers: [],
  unreadCount: 0,
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    // ---------- ROOMS ----------
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
    },

    setActiveRoom(state, action: PayloadAction<string>) {
      state.activeRoomId = action.payload;
      state.messages = []; // clear active room messages on switch
    },

    addRoom(state, action: PayloadAction<Room>) {
      state.rooms.push(action.payload);
    },

    // ---------- MESSAGES ----------
    setRoomMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },

    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
      const room = state.rooms.find((r) => r._id === action.payload.roomId);
      if (room) {
        room.lastMessage = action.payload;
      }
    },

    updateLastMessageReadBy(
      state,
      action: PayloadAction<{ roomId: string; userId: string }>
    ) {
      const room = state.rooms.find((r) => r._id === action.payload.roomId);
      if (room?.lastMessage) {
        if (!room.lastMessage.readBy.includes(action.payload.userId)) {
          room.lastMessage.readBy.push(action.payload.userId);
        }
      }
    },

    // ---------- TYPING ----------
    userTyping(state, action: PayloadAction<string>) {
      if (!state.typingUsers.includes(action.payload)) {
        state.typingUsers.push(action.payload);
      }
    },

    userStoppedTyping(state, action: PayloadAction<string>) {
      state.typingUsers = state.typingUsers.filter(
        (id) => id !== action.payload
      );
    },

    // ---------- UNREAD ----------
    updateUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },

    // ---------- CLEAR ----------
    clearChatState() {
      return initialState;
    },
  },
});

export const {
  setRooms,
  setActiveRoom,
  addRoom,
  setRoomMessages,
  addMessage,
  updateLastMessageReadBy,
  userTyping,
  userStoppedTyping,
  updateUnreadCount,
  clearChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
