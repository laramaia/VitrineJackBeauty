import { useState } from "react";

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