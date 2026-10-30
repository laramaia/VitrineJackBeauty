import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "../card/ProductCard";
import arrowIcon from "../../../assets/icons/highlights-arrow.png";
import "./ProductGrid.css";

function toPages(list, size) {
  const pages = [];
  for (let i = 0; i < list.length; i += size) {
    pages.push(list.slice(i, i + size));
  }
  return pages;
}

function ArrowButton({ direction, disabled, hidden, onClick }) {
  const label = direction === "prev" ? "Página anterior" : "Próxima página";

  return (
    <motion.button
      className="product-grid-arrow"
      data-direction={direction}
      data-hidden={hidden}
      onClick={onClick}
      disabled={disabled || hidden}
      aria-label={label}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      <img className="product-grid-arrow-icon" src={arrowIcon} />
    </motion.button>
  );
}

export function ProductGrid({ products }) {
  const [page, setPage] = useState(0);
  const pages = toPages(products, 8);
  const lastPage = pages.length - 1;
  const hasMultiplePages = pages.length > 1;

  const go = (delta) => setPage((p) => p + delta);

  return (
    <section className="product-grid-wrapper">
      <div className="product-grid-stage">
        <ArrowButton
          direction="prev"
          hidden={!hasMultiplePages}
          disabled={page === 0}
          onClick={() => go(-1)}
        />

        <div className="product-grid-viewport">
          <motion.div
            className="product-grid-track"
            initial={false}
            animate={{ x: `${-page * 100}%` }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          >
            {pages.map((items, index) => (
              <div className="product-grid-page" key={index}>
                {items.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <ArrowButton
          direction="next"
          hidden={!hasMultiplePages}
          disabled={page === lastPage}
          onClick={() => go(1)}
        />
      </div>

      <div className="product-grid-dots" data-hidden={!hasMultiplePages}>
        {pages.map((_, index) => (
          <motion.button
            key={index}
            className="product-grid-dot"
            onClick={() => setPage(index)}
            aria-current={index === page}
            aria-label={`Ir para a página ${index + 1}`}
            animate={{ scale: index === page ? 1.3 : 1 }}
            whileHover={{ scale: 1.4 }}
          />
        ))}
      </div>
    </section>
  );
}
