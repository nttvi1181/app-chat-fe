import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  conversations as ConversationSelector,
  setConversations as setConversationsAction,
} from "../redux/slices/conversationSlice";

const useConversations = () => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(ConversationSelector);

  const setConversations = (user: Profile | null) => {
    dispatch(setConversationsAction(user));
  };

  return { conversations, setConversations };
};

export default useConversations;
