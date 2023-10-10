import { useSelector, useDispatch } from "react-redux";
import { setIsModalOpen } from "../store/globalPropsSlice";

export function useModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.globalProps.isModalOpen);

  const triggerModal = () => {
    dispatch(setIsModalOpen(!isModalOpen));
  };

  return {
    isModalOpen,
    triggerModal,
  };
}
