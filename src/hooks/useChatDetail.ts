import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  list_messages as list_messages_selector,
  conversation_info as conversation_info_selector,
  chat_detail_info as chat_detail_selector,
  setChatDetailInfo as setChatDetailInfoAction,
  setListMessages as setListMessagesAction,
  setConversationInfo as setConversationInfoAction,
  resetChatDetail as resetChatDetailAction,
} from "../redux/slices/chatSlice";

const useChatDetail = () => {
  const dispatch = useAppDispatch();
  const list_messages = useAppSelector(list_messages_selector);
  const conversation_info = useAppSelector(conversation_info_selector);
  const chat_detail_info = useAppSelector(chat_detail_selector);

  const setChatDetailInfo = (data: any) => {
    dispatch(setChatDetailInfoAction(data));
  };

  const setListMessages = (data: any) => {
    dispatch(setListMessagesAction(data));
  };

  const setConversationInfo = (data: any) => {
    dispatch(setConversationInfoAction(data));
  };

  const resetChatDetail = () => {
    dispatch(resetChatDetailAction());
  };

  return {
    setConversationInfo,
    setListMessages,
    setChatDetailInfo,
    resetChatDetail,
    chat_detail_info,
    conversation_info,
    list_messages,
  };
};

export default useChatDetail;