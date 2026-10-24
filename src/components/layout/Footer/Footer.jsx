import gmailIcon from '../../../assets/icons/gmail.png'
import instagramIcon from '../../../assets/icons/instagram.png'
import whatsappIcon from '../../../assets/icons/whatsapp.png'
import './Footer.css'

export function Footer(){
    return(
        <footer>
            <nav className="sections">
                <h3>Seções</h3>
                <ul>
                    <li>Novidades & Destaques</li>
                    <li>Todos os Produtos</li>
                    <li>Dúvidas</li>
                </ul>
            </nav>

            <nav className="categories">
                <h3>Explore por categoria</h3>
                <ul>
                    <li>Maquiagem</li>
                    <li>Skincare</li>
                    <li>Banho & Corpo</li>
                </ul>
            </nav>

            <nav className="help">
                <h3>Precisa de ajuda?</h3>
                <ul>
                    <li>Como comprar</li>
                    <li>Formas de pagamento</li>
                    <li>Entregas e prazos</li>
                </ul>
            </nav>

            <nav className="contacts">
                <h3>Entre em contato</h3>
                <ul>
                    <li>
                        <img src={gmailIcon} alt="Gmail" className="icon"/>
                        <span>Jaquelinequaresma.r@gmail.com</span>
                    </li>
                    <li>
                        <img src={instagramIcon} alt="Instagram" className="icon"/>
                        <span>@mundojack_beauty</span>
                    </li>
                    <li>
                        <img src={whatsappIcon} alt="Gmail" className="icon"/>
                        <span>(69) 99282-2919</span>
                    </li>
                </ul>
            </nav>

            <p>© 2026 Mundo da Jack. Todos os direitos reservados.</p>
        </footer>
    )
}