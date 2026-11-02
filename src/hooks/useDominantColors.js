import { useEffect, useState } from 'react'
import ColorThief from 'colorthief'
import { buildPalette } from '../utils/colors'

export function useDominantColors(sources = [], strength = 0.70) {
    const [palettes, setPalettes] = useState([])

    useEffect(() => {
        if (!sources || sources.length === 0) return

        let isCancelled = false
        const thief = new ColorThief()

        const loadPalette = (src) =>
            new Promise((resolve) => {
                const img = new Image()
                img.crossOrigin = 'anonymous'
                img.src = src

                img.onload = () => {
                    try {
                        const dominantColor = thief.getColor(img)
                        resolve(buildPalette(dominantColor, strength))
                    } catch {
                        resolve(null)
                    }
                }

                img.onerror = () => {
                    resolve(null)
                }
            })

        Promise.all(sources.map(loadPalette)).then((result) => {
            if (!isCancelled) {
                setPalettes(result)
            }
        })

        return () => {
            isCancelled = true
        }
    }, [sources, strength])

    return palettes
}