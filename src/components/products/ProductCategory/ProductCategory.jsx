import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 
import { ProductGrid } from "../ProductGrid/ProductGrid"
import { ProductModal } from "../ProductModal/ProductModal";
import { fetchSheets } from "../../../services/sheetsApi";
import "./ProductCategory.css";

let cachedProducts = null;

export function ProductCategory() {
    const [categories, setCategories] = useState([]);
    const [activeId, setActiveId] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [fade, setFade] = useState({ left: false, right: false });

    const location = useLocation();
    const navRef = useRef(null);

    function updateFade() {
    const el = navRef.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setFade((prev) =>
        prev.left === left && prev.right === right ? prev : { left, right }
    );
    }

    useEffect(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
    }, [categories]);


    useEffect(() => {
        function handleSearch(e) {
            setSearchTerm(e.detail);

            if (e.detail.trim() !== "") {
                const element = document.getElementById("products");
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }

        window.addEventListener("searchProduct", handleSearch);
        return () => window.removeEventListener("searchProduct", handleSearch);
    }, []);

    useEffect(() => {
        async function loadCategories() {
            try {
                let allProducts = cachedProducts;

                if (!allProducts) {
                    allProducts = await fetchSheets();
                    cachedProducts = allProducts;
                }

                const fixedCategories = [
                    { id: 1, name: "Todos", products: allProducts },
                    { id: 2, name: "Maquiagem", products: allProducts.filter(p => p.category?.toLowerCase() === "maquiagem") },
                    { id: 3, name: "Skincare", products: allProducts.filter(p => p.category?.toLowerCase() === "skincare") },
                    { id: 4, name: "Banho & Corpo", products: allProducts.filter(p => p.category?.toLowerCase() === "banho") },
                ];

                setCategories(fixedCategories);

                const params = new URLSearchParams(location.search);
                const categoryParam = params.get("category");

                if (categoryParam) {
                    const matchedCategory = fixedCategories.find(
                        (c) => c.name.toLowerCase() === categoryParam.toLowerCase()
                    );

                    if (matchedCategory) {
                        setActiveId(matchedCategory.id);
                    } else {
                        setActiveId(1);
                    }
                    setTimeout(() => {
                        const element = document.getElementById("products");
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                        }
                    }, 100);
                } else {
                    setActiveId(1);
                }

            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, [location.search]);

    if (loading || categories.length === 0) {
        return <section className="product-category-wrapper"><p>Carregando produtos...</p></section>;
    }

    const active = categories.find((c) => c.id === activeId) || categories[0];

    const filteredProducts = active ? active.products.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <section id="products" className="product-category-wrapper">
            <header className="product-category-header">
                <h2 className="dm-sans-lg">Todos os Produtos</h2>

                <nav
                ref={navRef}
                onScroll={updateFade}
                className="product-category-nav"
                data-fade-left={fade.left}
                data-fade-right={fade.right}
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className="product-category-item dm-sans-sm"
                            onClick={() => setActiveId(category.id)}
                            aria-pressed={category.id === activeId}>
                            {category.name}
                        </button>
                    ))}
                </nav>
            </header>

            {active && (
                <ProductGrid
                    key={active.id}
                    products={filteredProducts}
                    onSelect={setSelectedProduct}
                />
            )}

            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}