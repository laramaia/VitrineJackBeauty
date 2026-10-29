import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { mockCategories } from "./mocks/Mockcategories.js";
import { ProductCategory } from "./components/products/category/ProductCategory.jsx";
import "./styles/constants.css";
import "./styles/global.css";
import "./styles/fonts.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
