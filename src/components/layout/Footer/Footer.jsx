import { Link, useLocation, useNavigate } from 'react-router-dom';
import gmailIcon from '../../../assets/icons/gmail.png';
import instagramIcon from '../../../assets/icons/instagram.png';
import whatsappIcon from '../../../assets/icons/whatsapp.png';
import './Footer.css';

export function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCategoryClick = (e, categoryName) => {
        e.preventDefault();
        navigate(`/?category=${encodeURIComponent(categoryName)}#products`);
        
        if (location.pathname === "/") {
            const element = document.getElementById("products");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleSectionClick = (e, targetId) => {
        e.preventDefault();
        navigate(`/#${targetId}`);
        
        if (location.pathname === "/") {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <footer>
            <nav className="sections">
                <h3>Seções</h3>
                <ul>
                    <li>
                        <a href="#highlights" className="link-reset" onClick={(e) => handleSectionClick(e, "highlights")}>
                            Novidades & Destaques
                        </a>
                    </li>
                    <li>
                        <a href="#products" className="link-reset" onClick={(e) => handleSectionClick(e, "products")}>
                            Todos os Produtos
                        </a>
                    </li>
                    <li>
                        <Link to="/faq" className="link-reset" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            Dúvidas
                        </Link>
                    </li>
                </ul>
            </nav>

            <nav className="categories">
                <h3>Explore por categoria</h3>
                <ul>
                    <li>
                        <a href="#products" className="link-reset" onClick={(e) => handleCategoryClick(e, "Maquiagem")}>
                            Maquiagem
                        </a>
                    </li>
                    <li>
                        <a href="#products" className="link-reset" onClick={(e) => handleCategoryClick(e, "Skincare")}>
                            Skincare
                        </a>
                    </li>
                    <li>
                        <a href="#products" className="link-reset" onClick={(e) => handleCategoryClick(e, "Banho & Corpo")}>
                            Banho & Corpo
                        </a>
                    </li>
                </ul>
            </nav>

            <nav className="help">
                <h3>Precisa de ajuda?</h3>
                <ul>
                    <Link to="/faq" className="link-reset" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <li>Como comprar</li>
                        <li>Formas de pagamento</li>
                        <li>Entregas e prazos</li>
                    </Link>
                </ul>
            </nav>

            <nav className="contacts">
                <h3>Entre em contato</h3>
                <ul>
                    <li>
                        <img src={gmailIcon} alt="Gmail" className="icon" />
                        <span>mundojackbeauty@gmail.com</span>
                    </li>
                    <li>
                        <img src={instagramIcon} alt="Instagram" className="icon" />
                        <span>@mundojack_beauty</span>
                    </li>
                    <li>
                        <img src={whatsappIcon} alt="WhatsApp" className="icon" />
                        <span>(69) 99282-2919</span>
                    </li>
                </ul>
            </nav>

            <p>© 2026 Mundo da Jack. Todos os direitos reservados.</p>
        </footer>
    );
}