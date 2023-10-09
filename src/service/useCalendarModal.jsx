import { useSelector, useDispatch } from "react-redux";
import { setIsCalendarOpen } from "../store/globalPropsSlice";

export function useCalendarModal() {
  const dispatch = useDispatch();
  const isCalendarOpen = useSelector((state) => state.globalProps.isCalendarOpen);

  const triggerCalendarModal = () => {
    dispatch(setIsCalendarOpen(!isCalendarOpen));
  };

  return {
    isCalendarOpen,
    triggerCalendarModal,
  };
}

