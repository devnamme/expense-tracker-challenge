import { AddSquare, Driver, Home } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAdding } from "../redux/modules/expense-modal";
import { AppDispatch, RootState } from "../redux/store";

export default function NavMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();

  const expenseModalState = useSelector(
    (state: RootState) => state.expenseModalState
  );

  const onHomeClick = () => navigate("/");
  const onAddClick = () => {
    dispatch(setAdding());
  };
  const onListClick = () => navigate("/list");

  return (
    <nav className="bg-gray-dark flex flex-row flex-nowrap items-center justify-between py-4 px-8">
      <Home
        size="2rem"
        color="white"
        className="cursor-pointer"
        onClick={onHomeClick}
        variant={pathname === "/" ? "Bold" : "Outline"}
      />

      <AddSquare
        size="2rem"
        color="white"
        className="cursor-pointer"
        onClick={onAddClick}
        variant={expenseModalState.active ? "Bold" : "Outline"}
      />

      <Driver
        size="2rem"
        color="white"
        className="cursor-pointer"
        onClick={onListClick}
        variant={pathname === "/list" ? "Bold" : "Outline"}
      />
    </nav>
  );
}
