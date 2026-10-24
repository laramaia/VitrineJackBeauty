import { useState } from "react";
import './SearchBar.css'

export function SearchBar(){
    const [search, setSearch] = useState("");

    return(
        <>
            <input 
            type="text" 
            placeholder="Pesquisa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </>
    )
}