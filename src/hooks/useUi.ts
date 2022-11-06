import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  currentPage as currentPageSelector,
  isSearchChat as isSearchChatSelector,
  setCurrentPage as setcurrentPageAction,
  currentViewProfile as currentViewProfileSelector,
  setCurrentViewProfile as setCurrentViewProfileAction,
  setIsSearchChat as setIsSearchChatAction,
} from "../redux/slices/uiSlice";

const useUi = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(currentPageSelector);
  const currentViewProfile = useAppSelector(currentViewProfileSelector);
  const isSearchChat = useAppSelector(isSearchChatSelector);

  const setCurrentViewProfile = (value: null | Profile) => {
    dispatch(setCurrentViewProfileAction(value));
  };
  const setCurrentPage = (value: string) => {
    dispatch(setcurrentPageAction(value));
  };
  const setIsSearchChat = (value: boolean) => {
    dispatch(setIsSearchChatAction(value));
  };
  return {
    currentPage,
    currentViewProfile,
    isSearchChat,
    setCurrentViewProfile,
    setCurrentPage,
    setIsSearchChat,
  };
};

export default useUi;
