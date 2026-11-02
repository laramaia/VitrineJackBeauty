import arrowIcon from '../../../assets/icons/highlights-arrow.png'
import { useDominantColors } from '../../../hooks/useDominantColors'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { fetchSheets } from '../../../services/sheetsApi'
import './Highlights.css'

export function Highlights() {
    const [products, setProducts] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    // Busca os produtos da planilha ao montar o componente
    useEffect(() => {
        async function loadHighlights() {
            try {
                const allProducts = await fetchSheets()
                const highlightedProducts = allProducts.filter(item => item.destaque)
                setProducts(highlightedProducts.length > 0 ? highlightedProducts : allProducts.slice(0, 5))
            } catch (error) {
                console.error("Erro ao carregar destaques:", error)
            } finally {
                setLoading(false)
            }
        }

        loadHighlights()
    }, [])

    // Mapeia as imagens dos produtos vindos da planilha para extrair as cores
    const images = products.map((product) => product.imagem)
    const palettes = useDominantColors(images)

    const goToPrevious = () =>
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    const goToNext = () =>
        setCurrentIndex((prev) => (prev + 1) % products.length)

    useEffect(() => {
        if (products.length === 0) return
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [products.length])

    // Enquanto os dados da planilha estiverem carregando
    if (loading || products.length === 0) {
        return <div className="highlights-carousel"><p>Carregando destaques...</p></div>
    }

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
                            <span className="highlights-product-name">{currentProduct.nome}</span> chegou!
                        </h3>
                        <p>Realce a sua beleza todos os dias</p>
                    </div>
                    <button>Quero conhecer</button>
                </div>

                <motion.img
                    key={currentProduct.id}
                    className="highlights-image"
                    src={currentProduct.imagem}
                    alt={currentProduct.nome}
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