import { Profile } from "@/interfaces/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  currentPage: "CHAT" | "CONTACT" | null;
  currentViewProfile: null | Profile;
  isSearchChat: boolean;
} = {
  currentPage: null,
  currentViewProfile: null,
  isSearchChat: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setCurrentViewProfile: (state, { payload }) => {
      state.currentViewProfile = payload;
    },
    setIsSearchChat: (state, { payload }) => {
      state.isSearchChat = payload;
    },
  },
});

export const currentPage = (state: AppState) => state.ui.currentPage;
export const isSearchChat = (state: AppState) => state.ui.isSearchChat;
export const currentViewProfile = (state: AppState) =>
  state.ui.currentViewProfile;

export const { setCurrentPage, setCurrentViewProfile, setIsSearchChat } =
  uiSlice.actions;

export default uiSlice.reducer;
