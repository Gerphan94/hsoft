import React, { useEffect, useRef, useState, useMemo, memo } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

const Filter3 = memo(({ filters, setFilters, onClick }) => {
    console.log('filters', filters)

    const numberView = 4;

    console.log('render dropdown', filters)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [filterCount, setFilterCount] = useState(0);
    const [filtertext, setFilterText] = useState([]);

    const color = ["#EB8317", "#387478", "#295F98", "#A04747", "#00712D"]



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

    const countFilter = (data) => setFilterCount(data?.filter(filter => filter.value).length || 0);
    const handleFilterText = (data) => {
        let result = [];
        let countMore = 0;
        data.forEach(filter => {
            if (filter.value) {
                if (result.length < numberView) {
                    result.push(filter.name);
                } else {
                    countMore++;
                }
            }
        })
        if (countMore > 0) {
            result.push(`+${countMore} more`);
        }
        setFilterText(result);

    }

    const handleClick = (id) => {
        const updaeData = filters.map(filter => {
            if (filter.id === id) {
                return { ...filter, value: !filter.value };
            }
            return filter;
        });
        setFilters(updaeData);
        countFilter(updaeData);
        handleFilterText(updaeData);
    }

    const handleClear = () => {
        setFilters(filters.map(item => ({ ...item, value: false })));
        countFilter([]);
        setIsDropdownOpen(false);
        handleFilterText([])
    }

    return (
        <div className='w-full h-full inline-block text-left' ref={dropdownRef}>
            <div className="relative inline-block w-full">
                <div className='relative group flex '>
                    {filtertext.length === 0 ?
                        <div
                            onClick={toggleDropdown}
                            className='border flex items-center justify-between select-none outline-none h-8 w-full py-1 px-2 text-[#0C1844] group-hover:border-blue-200 '>
                            No Filter
                        </div>
                        :
                        <div
                            onClick={toggleDropdown}

                            className='border flex items-center text-sm gap-1 select-none outline-none h-8 w-full p-1  text-[#0C1844] group-hover:border-blue-200 '>
                            {filtertext.map((item, index) => (
                                <div
                                    key={index}
                                    className={`border px-1 py-0.5`}
                                    style={{ borderColor: color[index] }}
                                >
                                    {item}
                                </div>
                            ))}

                        </div>
                    }
                    <button
                        onClick={onClick}
                        className='bg-blue-400 size-8 flex items-center justify-center'>
                        <FiFilter className="h-5 w-5 text-white font-bold" />

                    </button>


                </div>
                {isDropdownOpen && (
                    <div className="origin-top-right absolute  left-0 mt-2  max-h-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 text-sm">
                        <div className='p-2 w-full grid grid-cols-2 gap-2 mb-4'>
                            {filters.map((item) => (
                                <div key={item.id}>
                                    <button
                                        className={`w-full text-left block px-4 py-1 rounded-2xl border select-none ${item.value ? 'bg-[#667BC6] text-white' : 'text-[#0C1844]'}  hover:bg-[#667BC6] hover:text-white `}
                                        onClick={() => handleClick(item.id, item.name)}
                                    >
                                        {item.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='border-t p-2 space-y-2'>
                            <button
                                className='w-full rounded-2xl border py-1 bg-[#557C56] text-white'
                                onClick={toggleDropdown}


                            >Apply</button>
                            <button
                                className='w-full rounded-2xl border py-1 bg-[#A04747] text-white'
                                onClick={handleClear}

                            >Clear</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
})

export default Filter3;