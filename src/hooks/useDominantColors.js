import { useEffect, useState } from 'react'
import ColorThief from 'colorthief'

function soften([r, g, b], strength) {
    const mix = (c) => Math.round(c * strength + 255 * (1 - strength))
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

export function useDominantColors(sources, strength = 0.70) {
    const [colors, setColors] = useState([])

    useEffect(() => {
        let cancelled = false
        const thief = new ColorThief()

        const loadColor = (src) =>
            new Promise((resolve) => {
                const img = new Image()
                img.crossOrigin = 'anonymous'
                img.src = src
                img.onload = () => {
                    try {
                        resolve(soften(thief.getColor(img), strength))
                    } catch {
                        resolve(null)
                    }
                }
                img.onerror = () => resolve(null)
            })

        Promise.all(sources.map(loadColor)).then((result) => {
            if (!cancelled) setColors(result)
        })

        return () => { cancelled = true }
    }, [sources, strength])

    return colors
}