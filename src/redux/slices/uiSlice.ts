import { Profile } from "@/interfaces/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  currentPage: "CHAT" | "CONTACT" | null;
  currentViewProfile: null | Profile;
} = {
  currentPage: null,
  currentViewProfile: null,
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
  },
});

export const currentPage = (state: AppState) => state.ui.currentPage;
export const currentViewProfile = (state: AppState) =>
  state.ui.currentViewProfile;

export const { setCurrentPage, setCurrentViewProfile } = uiSlice.actions;

export default uiSlice.reducer;
