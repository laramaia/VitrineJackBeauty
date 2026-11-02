import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ProductGrid } from "../grid/ProductGrid";
import { ProductModal } from "../modal/ProductModal";
import "./ProductCategory.css";

export function ProductCategory({ categories }) {
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const active = categories.find((c) => c.id === activeId);

  return (
    <section className="product-category-wrapper">
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

      {active && (
        <ProductGrid
          key={active.id}
          products={active.products}
          onSelect={setSelectedProduct}
        />
      )}

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}