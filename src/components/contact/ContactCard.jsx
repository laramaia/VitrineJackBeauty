import { motion } from "framer-motion";
import whatsappIcon from "../../assets/icons/whatsapp-white.png";
import "./ContactCard.css";

export function ContactCard({ title, subtitle, buttonLabel, href }) {
  return (
    <section className="contact-card-wrapper">
      <div className="contact-card-text">
        <h2 className="contact-card-title cormorant-x-md">{title}</h2>
        <p className="contact-card-subtitle dm-sans-sm">{subtitle}</p>
      </div>

      <motion.a
        className="contact-card-button"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <img className="contact-card-icon" src={whatsappIcon} alt="" />
        <span className="contact-card-button-label dm-sans-sm">
          {buttonLabel}
        </span>
      </motion.a>
    </section>
  );
}