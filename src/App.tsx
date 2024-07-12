import { Route, Routes } from "react-router-dom";
import GeneralLayout from "./layouts/general";
import HomePage from "./pages/home";
import ListPage from "./pages/list";

function App() {
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
