import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import GeneralLayout from "./layouts/general";
import HomePage from "./pages/home";
import ListPage from "./pages/list";
import { fetchExpenses } from "./redux/modules/expenses";
import { AppDispatch } from "./redux/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  return (
    <>
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />

          <Route path="*" element={<h1>404 Page</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
