import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import arrowIcon from "../../assets/icons/highlights-arrow.png";
import "./Accordion.css";

export function Accordion({ title, subtitle, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <article className="accordion-wrapper">
      <h3 className="accordion-header">
        <motion.button
          type="button"
          className="accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((current) => !current)}
          whileTap={{ scale: 0.99 }}
        >
          <span className="accordion-heading">
            <span className="accordion-title dm-sans-md">{title}</span>
            <span className="accordion-subtitle manrope-sm">{subtitle}</span>
          </span>
          <motion.img
            className="accordion-arrow"
            src={arrowIcon}
            alt=""
            animate={{ rotate: isOpen ? -90 : 90 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            className="accordion-panel"
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
          <div className="accordion-content">
              <p className="accordion-text dm-sans-sm">{content}</p>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}