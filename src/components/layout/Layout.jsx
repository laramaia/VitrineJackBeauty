import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { Outlet } from 'react-router-dom'

export function Layout(){
    return(
        <div className="layout-wrapper">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}