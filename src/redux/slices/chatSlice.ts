import { Profile } from "@/interfaces/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  conversation_info: {
    conversation_id: string | null;
    origin_conversation_id: string | null;
    conversation_name: string | null;
    conversation_avatar: Array<string> | null;
    conversation_members: Array<any>;
  };
  list_messages: Array<any>;
} = {
  conversation_info: {
    conversation_id: null,
    origin_conversation_id: null,
    conversation_name: null,
    conversation_avatar: null,
    conversation_members: [],
  },
  list_messages: [],
};

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setConversationInfo: (state, { payload }) => {
      state.conversation_info = payload;
    },
    setListMessages: (state, { payload }) => {
      state.list_messages = payload;
    },
    setChatDetailInfo: (state, { payload }) => {
      state = { ...payload };
      return state;
    },

    resetChatDetail: (state) => {
      state = {
        conversation_info: {
          conversation_id: null,
          origin_conversation_id: null,
          conversation_name: null,
          conversation_avatar: null,
          conversation_members: [],
        },
        list_messages: [],
      };
    },
  },
});

export const conversation_info = (state: AppState) =>
  state.chat.conversation_info;
export const list_messages = (state: AppState) => state.chat.list_messages;
export const chat_detail_info = (state: AppState) => state.chat;

export const {
  setConversationInfo,
  setListMessages,
  setChatDetailInfo,
  resetChatDetail,
} = chatSlice.actions;

export default chatSlice.reducer;
