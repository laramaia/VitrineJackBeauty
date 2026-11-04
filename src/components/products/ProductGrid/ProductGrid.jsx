import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "../ProductCard/ProductCard";
import arrowIcon from "../../../assets/icons/highlights-arrow.png";
import "./ProductGrid.css";

function toPages(list, size) {
  const pages = [];
  for (let i = 0; i < list.length; i += size) {
    pages.push(list.slice(i, i + size));
  }
  return pages;
}

function useColumns() {
  const get = () => (window.innerWidth >= 1024 ? 4 : 3);

  const [cols, setCols] = useState(get);

  useEffect(() => {
    const onResize = () => setCols(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return cols;
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
      <img className="product-grid-arrow-icon" src={arrowIcon} alt="" />
    </motion.button>
  );
}

export function ProductGrid({ products, onSelect }) {
  const [page, setPage] = useState(0);
  const cols = useColumns();
  const rows = 2;
  const pages = toPages(products, cols * rows);
  const lastPage = Math.max(pages.length - 1, 0);
  const safePage = Math.min(page, lastPage);
  const hasMultiplePages = pages.length > 1;

  const go = (delta) => setPage(safePage + delta);

  if (products.length === 0) {
    return (
      <section className="product-grid-wrapper">
        <p className="manrope-md">Nenhum produto encontrado.</p>
      </section>
    );
  }

  return (
    <section
      className="product-grid-wrapper"
      style={{ "--cols": cols, "--rows": rows }}
    >
      <div className="product-grid-stage">
        <ArrowButton
          direction="prev"
          hidden={!hasMultiplePages}
          disabled={safePage === 0}
          onClick={() => go(-1)}
        />

      <div className="product-grid-viewport">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 && safePage < lastPage) go(1);
            if (info.offset.x > 50 && safePage > 0) go(-1);
          }}
        >
          <motion.div
            className="product-grid-track"
            initial={false}
            animate={{ x: `${-safePage * 100}%` }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          >
            {pages.map((items, index) => (
              <div className="product-grid-page" key={index}>
                {items.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

        <ArrowButton
          direction="next"
          hidden={!hasMultiplePages}
          disabled={safePage === lastPage}
          onClick={() => go(1)}
        />
      </div>

      <div className="product-grid-dots" data-hidden={!hasMultiplePages}>
        {pages.map((_, index) => (
          <motion.button
            key={index}
            className="product-grid-dot"
            onClick={() => setPage(index)}
            aria-current={index === safePage}
            aria-label={`Ir para a página ${index + 1}`}
            animate={{ scale: index === safePage ? 1.3 : 1 }}
            whileHover={{ scale: 1.4 }}
          />
        ))}
      </div>
    </section>
  );
}