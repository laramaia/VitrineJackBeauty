import mainBanner from '../assets/mainBanner.png'
import { Highlights } from '../components/Highlights/Highlights'

export function Home(){
    return(
        <main>
            <div className="main-banner">
                <img src={mainBanner} alt="Banner principal" />
            </div>
            <Highlights />
        </main>
    )
}