import mainBanner from '../assets/mainBanner.png'

export function Home(){
    return(
        <main>
            <div className="main-banner">
                <img src={mainBanner} alt="Banner principal" />
            </div>
        </main>
    )
}