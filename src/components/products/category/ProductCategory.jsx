import { useState, useEffect } from "react";
import { ProductGrid } from "../grid/ProductGrid";
import { fetchSheets } from "../../../services/sheetsApi";
import "./ProductCategory.css";

export function ProductCategory() {
  const [categories, setCategories] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const allProducts = await fetchSheets();


        const fixedCategories = [
          {
            id: 1,
            name: "Todos",
            products: allProducts,
          },
          {
            id: 2,
            name: "Banho & Corpo",
            products: allProducts.filter(p => p.category.toLowerCase() === "banho" || p.category.toLowerCase() === "corpo & banho"),
          },
          {
            id: 3,
            name: "Maquiagem",
            products: allProducts.filter(p => p.category.toLowerCase() === "maquiagem"),
          },
          {
            id: 4,
            name: "Skincare",
            products: allProducts.filter(p => p.category.toLowerCase() === "skincare"),
          },
        ];

        setCategories(fixedCategories);
        if (fixedCategories.length > 0) {
          setActiveId(fixedCategories[0].id);
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading || categories.length === 0) {
    return <section className="product-category-wrapper"><p>Carregando produtos...</p></section>;
  }

  const active = categories.find((c) => c.id === activeId);

  return (
    <section id="products" className="product-category-wrapper">
      <header className="product-category-header">
        <h2 className="dm-sans-lg">Todos os Produtos</h2>

        <nav className="product-category-nav">
          {categories.map((category) => (
            <button
              key={category.id}
              className="product-category-item dm-sans-sm"
              onClick={() => setActiveId(category.id)}
              aria-pressed={category.id === activeId}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </header>

      {active && <ProductGrid key={active.id} products={active.products} />}
    </section>
  );
}