import { useState } from "react";
import { ProductCard } from "../card/ProductCard";
import "./ProductGrid.css";

export function ProductGrid({ products }) {
  const pages = [];
  for (let i = 0; i < products.length; i += 8) {
    pages.push(products.slice(i, i + 8));
  }

  return (
    <section className="product-grid-wrapper">
      <div className="product-grid-container">
        {pages.map((page, index) => (
          <div className="product-grid-page" key={index}>
            {page.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
