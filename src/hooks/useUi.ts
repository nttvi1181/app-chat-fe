import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  currentPage as currentPageSelector,
  setCurrentPage as setcurrentPageAction,
} from "../redux/slices/uiSlice";

const useUi = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(currentPageSelector);

  const setCurrentPage = (value: string) => {
    dispatch(setcurrentPageAction(value));
  };

  return { currentPage, setCurrentPage };
};

export default useUi;
