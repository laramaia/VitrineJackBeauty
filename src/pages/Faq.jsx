import mainBanner from "../assets/mainBanner.png";
import { Accordion } from "../components/accordion/Accordion";
import { ContactCard } from "../components/contact/ContactCard";
import { faqItems } from "../components/accordion/faqItems";

export function Faq() {
  return (
    <main>
      <div className="main-banner">
        <img src={mainBanner} alt="Banner principal" />
      </div>

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