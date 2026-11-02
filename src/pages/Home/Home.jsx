import { Highlights } from "../../components/home/Highlights/Highlights";
import { ProductCategory } from "../../components/products/ProductCategory/ProductCategory";
import { BenefitsBar } from "../../components/home/BenefitsBar/BenefitsBar";
import './Home.css'

export function Home() {
  return (
    <main>
      <div className="main-banner">
        <h1 className="title-lg">O seu momento de autocuidado começa aqui.</h1>
      </div>

      <BenefitsBar />
      <Highlights />
      <ProductCategory />
    </main>
  );
}