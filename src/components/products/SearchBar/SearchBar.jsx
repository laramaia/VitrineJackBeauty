import { useState } from 'react'
import searchIcon from '../../../assets/icons/lupa.png'
import './SearchBar.css'

export function SearchBar() {
    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        window.dispatchEvent(new CustomEvent("searchProduct", { detail: value }));
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Pesquisa..."
                value={search}
                onChange={handleSearchChange}/>
            <img src={searchIcon} alt="Ícone de lupa" className="search-icon" />
        </div>
    )
}