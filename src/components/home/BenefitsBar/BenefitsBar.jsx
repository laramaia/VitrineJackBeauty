import chatIcon from '../../../assets/icons/chat.png'
import deliveryIcon from '../../../assets/icons/delivery.png'
import starsIcon from '../../../assets/icons/stars.png'
import './BenefitsBar.css'

export function BenefitsBar() {
    return (
        <>
            <div className="benefits-bar">
                <div className="benefits-item">
                    <img src={chatIcon} alt="" />
                    <h3>Atendimento pelo<br />WhatsApp</h3>
                </div>
                <div className="benefits-item">
                    <img src={starsIcon} alt="" />
                    <h3>Produtos<br />selecionados</h3>
                </div>
                <div className="benefits-item">
                    <img src={deliveryIcon} alt="" />
                    <h3>Entrega com<br />a Jack</h3>
                </div>
            </div>
        </>
    )
}