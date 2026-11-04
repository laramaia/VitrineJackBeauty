import { Link } from "react-router-dom";
import { Accordion } from "../../components/accordion/Accordion";
import { ContactCard } from "../../components/contact/ContactCard";
import { faqItems } from "../../components/accordion/faqItems";
import "./Faq.css";

export function Faq() {
  return (
    <main>
      <header className="faq-banner-wrapper">
        <div className="faq-banner-breadcrumb manrope-md" aria-label="Você está em">
          <Link to="/" className="link-reset">
            Início
          </Link>
          <span aria-hidden="true">/</span>
          <span className="faq-banner-current" aria-current="page">
            Dúvidas frequentes
          </span>
        </div>

        <h1 className="faq-banner-title cormorant-x-lg">Dúvidas frequentes</h1>

        <p className="faq-banner-subtitle manrope-lg">
          Tire suas dúvidas sobre pedidos, entrega e pagamento.
        </p>
      </header>

      <section className="faq-wrapper" aria-label="Perguntas frequentes">
            {faqItems.map((item) => (
            <Accordion
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                content={item.content}
            />
            ))}

        <ContactCard
          title="Não encontrou o que procurava?"
          subtitle="Fale com a Jack, ela responde sua dúvida pelo WhatsApp."
          buttonLabel="Chama no WhatsApp"
          href="https://wa.me/5569992822919"
        />
      </section>
    </main>
  );
}