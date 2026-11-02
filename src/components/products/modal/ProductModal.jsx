import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import whatsappIcon from "../../../assets/icons/whatsapp-white.png";
import "./ProductModal.css";

const WHATSAPP_NUMBER = "5569992822919";

export function ProductModal({ product, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusableElements = () =>
      modalRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled])',
      );

    focusableElements()?.[0]?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const elements = focusableElements();

        if (!elements?.length) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  function handleConfirm() {
    const message = `Olá, Jack! Tenho interesse no produto *${product.title}*. Podemos agendar uma encomenda?`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <motion.div
      className="product-modal-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={modalRef}
        className="product-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <img
          className="product-modal-image"
          src={product.image}
          alt={product.title}
        />

        <div className="product-modal-info">
          <span className="product-modal-brand manrope-sm">
            {product.brand}
          </span>

          <h2
            id="product-modal-title"
            className="product-modal-title cormorant-sm"
          >
            {product.title}
          </h2>

          <span className="product-modal-price dm-sans-sm">
            {product.price}
          </span>
        </div>

        <div className="product-modal-divider" />

        <div className="product-modal-badge manrope-sm">
          <img src={whatsappIcon} alt="" />
          <span>Atendimento pelo WhatsApp</span>
        </div>
        <p className="product-modal-description manrope-sm">
          Você vai ser redirecionado para o WhatsApp e a mensagem
          com o seu produto escolhido já vai aparecer para a Jack :)
        </p>

        <p className="product-modal-question cormorant-md">
          Deseja confirmar?
        </p>

        <div className="product-modal-actions">
          <motion.button
            type="button"
            className="product-modal-button"
            onClick={onClose}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Voltar
          </motion.button>

          <motion.button
            type="button"
            className="product-modal-button"
            data-confirm
            onClick={handleConfirm}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <img src={whatsappIcon} alt="" />
            Confirmar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}