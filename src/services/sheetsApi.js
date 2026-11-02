import Papa from 'papaparse'

const sheets_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xqjtRp75QCq2pL4sNpCMA7ZIQfqaCkS40bwxa2HOK76t8DBApykKVZihVP5XqqTlbgKLpiaknn0g/pub?gid=0&single=true&output=csv'

export function formatDriveImageLink(url) {
    if (!url) return '';
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        const rawDriveUrl = `https://drive.google.com/uc?id=${match[1]}`;
        // Proxy com conversão WebP e cache liberado de CORS
        return `https://wsrv.nl/?url=${encodeURIComponent(rawDriveUrl)}&w=800&output=webp`;
    }
    return url;
}

export async function fetchSheets() {
    try {
        const response = await fetch(sheets_url);

        if (!response.ok) throw new Error("Erro ao buscar planilha");

        const csv = await response.text();
        const { data } = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
        });

        return data.map((item, index) => ({
            id: index + 1,
            title: item.nome || "",
            brand: item.marca || "",
            price: Number(item.preco?.replace(",", ".")) || 0,
            image: formatDriveImageLink(item.imagem),
            category: item.categoria?.trim() || "Outros",
            isHighlight: item.destaque?.toLowerCase() === "sim",
        }));

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }
}