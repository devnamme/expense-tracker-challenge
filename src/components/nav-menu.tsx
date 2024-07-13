import { AddSquare, Driver, Home } from "iconsax-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdding } from "../redux/modules/expense-modal";
import { AppDispatch } from "../redux/store";

export default function NavMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onHomeClick = () => navigate("/");
  const onAddClick = () => {
    dispatch(setAdding());
  };
  const onListClick = () => navigate("/list");

  return (
    <nav className="bg-gray-700 flex flex-row flex-nowrap items-center justify-between py-4 px-8">
      <Home
        size="2rem"
        color="white"
        className="cursor-pointer"
        onClick={onHomeClick}
      />

      <AddSquare
        size="2rem"
        color="white"
        className="cursor-pointer"
        onClick={onAddClick}
      />

      <Driver
        size="2rem"
        color="white"
        className="cursor-pointer"
        onClick={onListClick}
      />
    </nav>
  );
}
