import mainBanner from "../assets/mainBanner.png";
import { ProductCategory } from "../components/products/category/ProductCategory";
import { mockCategories } from "../mocks/Mockcategories";

export function Home() {
  return (
    <main>
      <div className="main-banner">
        <img src={mainBanner} alt="Banner principal" />
      </div>
      <ProductCategory categories={mockCategories} />
    </main>
  );
}