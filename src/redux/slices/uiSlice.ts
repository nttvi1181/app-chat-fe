import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  currentPage: "CHAT" | "CONTACT" | null;
} = {
  currentPage: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

export const currentPage = (state: AppState) => state.ui.currentPage;

export const { setCurrentPage } = uiSlice.actions;

export default uiSlice.reducer;
