import "./ProductCard.css";

function driveThumb(url, width = 400) {
  const match = url?.match(/\/d\/([^/?]+)/) || url?.match(/[?&]id=([^&]+)/);
  return match
    ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${width}`
    : url;
}

export function ProductCard({ id, title, brand, price, image, onSelect }) {
  const product = { id, title, brand, price, image };
  
  const formattedPrice = Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  
  return (
    <article className="product-card-wrapper">
      <button
        type="button"
        className="product-card-button"
        onClick={() => onSelect(product)}
        aria-label={`Selecionar ${title}, ${price}`}
      >
         <img
            className="product-card-image"
            src={driveThumb(image, 200)}
            alt={title}
            loading="lazy"
            decoding="async"
         />

        <div className="product-card-info">
          <h3 className="dm-sans-md">{title}</h3>
          <p className="product-card-brand manrope-sm">{brand}</p>
          <p className="manrope-md">{formattedPrice}</p>
        </div>
      </button>
    </article>
  );
}