const MIN_CONTRAST = 2

function rgbToHsl([r, g, b]) {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const l = (max + min) / 2
    if (max === min) return [0, 0, l]
    const d = max - min
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    let h
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    return [h * 60, s, l]
}

function hslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    const sectors = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]]
    return sectors[Math.floor(h / 60)].map((v) => Math.round((v + m) * 255))
}

function luminance([r, g, b]) {
    const f = (c) => {
        c /= 255
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function contrast(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (hi + 0.05) / (lo + 0.05)
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const hsl = (h, s, l) =>
    `hsl(${Math.round(((h % 360) + 360) % 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`

function soften([r, g, b], strength) {
    const mix = (c) => Math.round(c * strength + 255 * (1 - strength))
    return [mix(r), mix(g), mix(b)]
}

function vividText(hue, saturation, backgroundRgb) {
    const [, , backgroundLightness] = rgbToHsl(backgroundRgb);
    const sat = clamp(saturation + 0.15, 0.6, 0.9); 
    
    let lightness = backgroundLightness > 0.5 ? backgroundLightness - 0.45 : backgroundLightness + 0.45;
    lightness = clamp(lightness, 0.15, 0.85);

    return hsl(hue, sat, lightness);
}

function pastelText(hue, saturation, backgroundRgb) {
    const [, , backgroundLightness] = rgbToHsl(backgroundRgb)
    const sat = clamp(saturation, 0.4, 0.6)
    let lightness = backgroundLightness - 0.15

    while (
        contrast(hslToRgb(hue, sat, lightness), backgroundRgb) < MIN_CONTRAST &&
        lightness > 0.1
    ) {
        lightness -= 0.02
    }
    return hsl(hue, sat, lightness)
}

export function buildPalette(rgb, strength) {
    const [hue, saturation] = rgbToHsl(rgb)
    const background = soften(rgb, strength)

    return {
        background: `rgb(${background.join(', ')})`,
        titleText: vividText(hue, saturation, background),
        text: pastelText(hue, saturation, background),
        button: hsl(hue + 180, 0.55, 0.30),
        buttonText: '#ffffff',
    }
}