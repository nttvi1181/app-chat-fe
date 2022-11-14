import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  currentPage as currentPageSelector,
  loading as loadingSelector,
  imagePreview as imagePreviewSelector,
  isSearchChat as isSearchChatSelector,
  setCurrentPage as setcurrentPageAction,
  currentViewProfile as currentViewProfileSelector,
  setCurrentViewProfile as setCurrentViewProfileAction,
  setIsSearchChat as setIsSearchChatAction,
  setLoading as setLoadingAction,
  setImagePreview as setImagePreviewAction,
} from "../redux/slices/uiSlice";

const useUi = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(currentPageSelector);
  const currentViewProfile = useAppSelector(currentViewProfileSelector);
  const isSearchChat = useAppSelector(isSearchChatSelector);
  const loading = useAppSelector(loadingSelector);
  const imagePreview = useAppSelector(imagePreviewSelector);
  const setCurrentViewProfile = (value: null | Profile) => {
    dispatch(setCurrentViewProfileAction(value));
  };
  const setCurrentPage = (value: string) => {
    dispatch(setcurrentPageAction(value));
  };
  const setIsSearchChat = (value: boolean) => {
    dispatch(setIsSearchChatAction(value));
  };
  const setLoading = (value: boolean) => {
    dispatch(setLoadingAction(value));
  };

  const setImagePreview = (value: string) => {
    dispatch(setImagePreviewAction(value));
  };

  return {
    currentPage,
    currentViewProfile,
    isSearchChat,
    loading,
    imagePreview,
    setCurrentViewProfile,
    setCurrentPage,
    setLoading,
    setIsSearchChat,
    setImagePreview,
  };
};

export default useUi;
