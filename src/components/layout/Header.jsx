import logo from '../../assets/logo.png'
import instagramIcon from '../../assets/icons/instagram.png'
import whatsappIcon from '../../assets/icons/whatsapp.png'
import helpIcon from '../../assets/icons/help.png'
import { SearchBar } from '../SearchBar'
import { useLocation } from 'react-router-dom'

export function Header(){
    const location = useLocation();
    const isHome = location.pathname === "/";

    return(
        <header>
            <img src={logo} alt="Logo Mundo da Jack Beauty" className="logo" />

            {isHome && <SearchBar />}

            <nav>
                <ul>
                    <li>
                        <a href="https://wa.me/5569992822919" target='_blank'>
                            <img src={whatsappIcon} alt="WhatsApp" className="icon" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/mundodajack_beauty/" target='_blank'>
                            <img src={instagramIcon} alt="Instagram" className="icon" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/mundodajack_beauty/" target='_blank'>
                            <img src={helpIcon} alt="Instagram" className="icon" />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}