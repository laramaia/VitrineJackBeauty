import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import '../../styles/global.css'

export function Layout(){
    const location = useLocation();
    const isFaqPage = location.pathname === "/faq";

    return(
        <div className={`layout-wrapper ${isFaqPage ? "faq-background" : ""}`}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}