import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  currentUser as currentUserSelector,
  removeCurrentUser as removeCurrentUserAction,
  setCurrentUser as setCurrentUserAction,
} from "../redux/slices/userSlice";

const useProfile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(currentUserSelector);

  const setCurrentUser = (user: Profile) => {
    dispatch(setCurrentUserAction(user));
  };

  const removeCurrentUser = () => {
    dispatch(removeCurrentUserAction());
  };

  return { currentUser, setCurrentUser, removeCurrentUser };
};

export default useProfile;
