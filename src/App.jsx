import { Layout } from "./components/layout/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import { Faq } from "./pages/faq/Faq";
import "./styles/constants.css";
import "./styles/global.css";
import "./styles/fonts.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<Faq />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
