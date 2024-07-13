import { useDispatch } from "react-redux";
import { closeModal } from "../redux/modules/expense-modal";
import { AppDispatch } from "../redux/store";

interface Props {
  active: boolean;
  children: JSX.Element;
}

export default function ModalLayout({ active, children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => dispatch(closeModal());

  return (
    <div
      className={`fixed top-0 left-0 bg-black/40 w-screen h-screen z-10 flex flex-col flex-nowrap justify-end ${
        active ? "opacity-1" : "pointer-events-none opacity-0"
      } duration-300`}
    >
      <div
        className="fixed top-0 left-0 w-full h-full cursor-pointer"
        onClick={handleClose}
      />
      <div
        className={`z-[11] ${
          active ? "translate-y-0" : "translate-y-full"
        } duration-300 p-4`}
      >
        {children}
      </div>
    </div>
  );
}
