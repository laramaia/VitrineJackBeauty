import { useState } from 'react'
import searchIcon from  '../../../assets/icons/lupa.png'
import './SearchBar.css'

export function SearchBar(){
    const [search, setSearch] = useState("");

    return(
        <div className="search-bar">
            <input 
            type="text" 
            placeholder="Pesquisa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <img src={searchIcon} alt="Ícone de lupa" className="search-icon" />
        </div>
    )
}