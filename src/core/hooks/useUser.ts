import { useSelector } from "react-redux";
import { selectAuth } from "../../store/AuthSlice";


export const useUser = () => {
  return useSelector((state) => selectAuth(state).user);
};
