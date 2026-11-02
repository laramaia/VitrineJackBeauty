import "./ProductCard.css";

export function ProductCard({ title, brand, price, image }) {
  const formattedPrice = Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  return (
    <article className="product-card-wrapper">
      <img className="product-card-image" src={image} alt={title} />
      <div className="product-card-info">
        <h3 className="dm-sans-md">{title}</h3>
        <p className="product-card-brand manrope-sm">{brand}</p>
        <p className="manrope-md">{formattedPrice}</p>
      </div>
    </article>
  );
}