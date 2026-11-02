import arrowIcon from '../../../assets/icons/highlights-arrow.png'
import { useDominantColors } from '../../../hooks/useDominantColors'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { mockHighlights as products } from '../../../mocks/Mockcategories'
import './Highlights.css'

const images = products.map((product) => product.image)

export function Highlights() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const palettes = useDominantColors(images)
    const goToPrevious = () =>
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    const goToNext = () =>
        setCurrentIndex((prev) => (prev + 1) % products.length)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const currentProduct = products[currentIndex]
    const palette = palettes[currentIndex]
    const slideStyle = palette && {
        '--slide-bg': palette.background,
        '--slide-title': palette.titleText,
        '--slide-text': palette.text,
        '--slide-button': palette.button,
        '--slide-button-text': palette.buttonText,
    }

    return (
        <div className="highlights-carousel">
            <div className="highlights-slide" style={slideStyle}>
                <button
                    type="button"
                    className="highlights-arrow highlights-arrow-prev"
                    onClick={goToPrevious}
                    aria-label="Slide anterior">
                    <img src={arrowIcon} alt="" />
                </button>

                <div className="highlights-info">
                    <div className="highlights-description">
                        <h4>Lançamento</h4>
                        <h3>
                            <span className="highlights-product-name">{currentProduct.title}</span> chegou!
                        </h3>
                        <p>Realce a sua beleza todos os dias</p>
                    </div>
                    <button>Quero conhecer</button>
                </div>

                <motion.img
                    key={currentProduct.id}
                    className="highlights-image"
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                />

                <button
                    type="button"
                    className="highlights-arrow highlights-arrow-next"
                    onClick={goToNext}
                    aria-label="Próximo slide">
                    <img src={arrowIcon} alt="" />
                </button>
            </div>
        </div>
    )
}