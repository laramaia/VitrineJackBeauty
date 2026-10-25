import blushImg from '../../assets/images/blush.jpeg'
import bodyImg from '../../assets/images/bodysplash.png'
import lipImg from '../../assets/images/lipfruit.jpg'
import { useDominantColors } from '../../hooks/useDominantColors'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import './Highlights.css'

const products = [
    { id: 1, name: "Blush Radiante", image: blushImg },
    { id: 2, name: "Body Splash Vanilla", image: bodyImg },
    { id: 3, name: "Lip Fruit Gloss", image: lipImg }
]
const images = products.map((product) => product.image)

export function Highlights() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const colors = useDominantColors(images)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const currentProduct = products[currentIndex]

    return (
    <div className="highlights-carousel">
        <motion.div
            className="highlights-slide"
            animate={{ backgroundColor: colors[currentIndex] ?? '#F9E9EC' }}
            transition={{ duration: 0.6 }}>
            <div className="highlights-info">
                <div className="highlights-description">
                    <h4>Lançamento</h4>
                    <h3>{currentProduct.name} chegou!</h3>
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
        </motion.div>
    </div>
)
}