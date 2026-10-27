import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { ProductGrid } from "./components/products/grid/ProductGrid";
import './styles/constants.css'
import './styles/global.css'
import "./styles/fonts.css";

const products = [
  { title: "titleA", brand: "brandA", price: "priceA", image: "imageA" },
  { title: "titleB", brand: "brandB", price: "priceB", image: "imageB" },
  { title: "titleC", brand: "brandC", price: "priceC", image: "imageC" },
  { title: "titleD", brand: "brandD", price: "priceD", image: "imageD" },
  { title: "titleE", brand: "brandE", price: "priceE", image: "imageE" },
  { title: "titleF", brand: "brandF", price: "priceF", image: "imageF" },
  { title: "titleG", brand: "brandG", price: "priceG", image: "imageG" },
  { title: "titleH", brand: "brandH", price: "priceH", image: "imageH" },
  { title: "titleA", brand: "brandA", price: "priceA", image: "imageA" },
  { title: "titleB", brand: "brandB", price: "priceB", image: "imageB" },
  { title: "titleC", brand: "brandC", price: "priceC", image: "imageC" },
  { title: "titleD", brand: "brandD", price: "priceD", image: "imageD" },
  { title: "titleE", brand: "brandE", price: "priceE", image: "imageE" },
  { title: "titleF", brand: "brandF", price: "priceF", image: "imageF" },
  { title: "titleG", brand: "brandG", price: "priceG", image: "imageG" },
  { title: "titleH", brand: "brandH", price: "priceH", image: "imageH" },
];

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/component"
            element={<ProductGrid products={products} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
