import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Faq } from "./pages/Faq";
import "./styles/constants.css";
import "./styles/global.css";
import "./styles/fonts.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/faq" index element={<Faq />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
