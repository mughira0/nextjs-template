import { meUser } from "@/data/dummy";
import { IAuthState, IUser } from "@/types/system/slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  user: meUser,
  isLogin: false,
  unreadCount: 0,
  access_token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveLoginUserData(
      state,
      action: PayloadAction<{ user: IUser; token: string }>,
    ) {
      state.user = action.payload.user;
      state.access_token = action.payload.token;
      state.isLogin = true;
    },
    logoutUser(state) {
      state.user = null;
      state.access_token = null;
      state.isLogin = false;
    },
    updateUser(state, action: PayloadAction<IUser>) {
      state.user = { ...action.payload };
    },
    updateToken(state, action: PayloadAction<string>) {
      state.access_token = action.payload;
    },
    updateUnread(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },
  },
});

export const {
  saveLoginUserData,
  logoutUser,
  updateUser,
  updateToken,
  updateUnread,
} = authSlice.actions;

export default authSlice.reducer;
