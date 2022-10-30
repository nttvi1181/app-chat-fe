import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  currentPage as currentPageSelector,
  setCurrentPage as setcurrentPageAction,
  currentViewProfile as currentViewProfileSelector,
  setCurrentViewProfile as setCurrentViewProfileAction,
} from "../redux/slices/uiSlice";

const useUi = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(currentPageSelector);
  const currentViewProfile = useAppSelector(currentViewProfileSelector);

  const setCurrentViewProfile = (value: null | Profile) => {
    dispatch(setCurrentViewProfileAction(value));
  };
  const setCurrentPage = (value: string) => {
    dispatch(setcurrentPageAction(value));
  };

  return {
    currentPage,
    currentViewProfile,
    setCurrentViewProfile,
    setCurrentPage,
  };
};

export default useUi;
