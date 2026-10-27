import "./ProductCard.css";

export function ProductCard({ title, brand, price, image }) {
  return (
    <article className="product-card-wrapper">
      <img className="product-card-image" src={image} alt={title} />
      <div className="product-card-info">
        <p className="cormorant-md">{title}</p>
        <p className="manrope-sm">{brand}</p>
        <p className="dm-sans-md">{price}</p>
      </div>
    </article>
  );
}
