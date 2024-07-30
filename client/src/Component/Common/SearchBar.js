import React, { useState, memo } from "react";
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";


const SearchBar = memo(({placeholder='', searchTerm, setSearchTerm, handleSearch}) => {

    const [value, setValue] = useState('')      

    const onChange = (e) => {
        console.log(e.target.value)
        setSearchTerm(e.target.value)
    }
    return (
        <>
            <div className="flex">
                <input
                    type="text"
                    className="border px-2 py-1 outline-none h-8 "
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={onChange}
                    spellCheck="false"
                    
                />
                <button className="bg-blue-400 h-8 w-8 flex items-center justify-center">
                    <RiSearch2Line className="h-full text-white font-bold" onClick={handleSearch} />
                </button>
            </div>
        </>
    )

})


export default SearchBar