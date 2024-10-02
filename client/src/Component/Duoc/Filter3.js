import React, { useEffect, useRef, useState, useMemo, memo } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

const Filter3 = memo(( { filters,setFilters }) => {

    console.log('render dropdown', filters)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };



    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };


    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);


    return (
        <div className='w-full h-full inline-block text-left' ref={dropdownRef}>
            <div className="relative inline-block w-full">
                <div className='relative group flex '>
                    <div className='border flex items-center justify-between select-none outline-none h-8 w-40 py-1 px-2 text-[#0C1844] group-hover:border-blue-200 '>
                        No Filter
                    </div> 
                    <button className='bg-blue-400 size-8 flex items-center justify-center'>
                        <FiFilter className="h-5 w-5 text-white font-bold" />

                    </button>
                

                </div>
                {isDropdownOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-full max-h-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ">
                            <div className='flex flex-nowrap max-h-64'>
                                {filters.map((item) => (
                                    <div key={item.id}>
                                        <button
                                            className={`w-full text-left block px-4 py-2 text-sm select-none text-[#0C1844] hover:bg-[#667BC6] hover:text-white `}
                                            // onClick={() => handleClick(item.id, item.name)}
                                        >
                                            {item.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                    </div>
                )}
            </div>
        </div>
    )
})

export default Filter3;