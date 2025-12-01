import { CommonState } from "@/types/system/slice";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CommonState = {
  sidebarCollapsed: false,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const { toggleSidebar } = commonSlice.actions;

export default commonSlice.reducer;
