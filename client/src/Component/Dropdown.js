import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";

const Dropdown = ({ data, selectedOption, setSelectedOption, searchable = true, placeholder = '', chooseIndex = 0, optionALL = false }) => {

    const [viewData, setViewData] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        setViewData(data);
    }, [data]);

    useEffect(() => {
        if (chooseIndex > 0 && data.length > 0) {
            setSelectedOption({ id: data[chooseIndex - 1].id, name: data[chooseIndex - 1].name });
            setSearchTerm(data[chooseIndex - 1].name)
        }
    }, [data, setSelectedOption]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClick = (id, name) => {
        setSelectedOption({ id, name });
        setIsDropdownOpen(false);
        setSearchTerm('')
        setViewData(data);

    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(true);
        if (e.target.value === '') {
            setViewData(data);
        }
        else {
            const filedata = data.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setViewData(filedata);
        }
    }

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
                <div className='relative group'>
                    <input
                        className={`border select-none outline-none h-full w-full py-1 px-2 text-[#0C1844] group-hover:border-blue-200 }`}
                        onClick={toggleDropdown}
                        type='text'
                        placeholder={placeholder}
                        value={selectedOption.name}
                        readOnly={true}
                    />
                    <span
                        className="absolute flex items-center justify-center inset-y-0 right-0 pr-3  px-2 py-1 group-hover:border-blue-200 "
                        onClick={toggleDropdown}
                    >
                        <FaAngleDown className="h-5 w-5 text-gray-500 group-hover:text-blue-200 " />
                    </span>
                </div>

                {isDropdownOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-full max-h-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ">
                        {searchable &&
                            <div className='p-2'>
                                <input
                                    className={`border outline-none h-full w-full py-1 px-2 text-[#0C1844] group-hover:border-blue-200 }`}
                                    value={searchTerm}
                                    onChange={handleChange}
                                    placeholder='Search'
                                    autoComplete='off'
                                    spellCheck={false}
                                    // readOnly={!searchable}
                                />
                            </div>
                        }
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {viewData.length === 0 ?
                                <li className="">
                                    <button
                                        className="w-full text-left block px-4 py-2 text-sm text-[#0C1844] hover:bg-gray-100 select-none"
                                    >
                                        None
                                    </button>

                                </li> :
                                <>
                                    {optionALL &&
                                        <li className="border-b border-t">
                                            <button
                                                className="w-full text-left block px-4 py-2 text-sm text-[#0C1844] hover:bg-[#667BC6] select-none"
                                                onClick={() => handleClick(0, 'Tất cả')}
                                            >
                                                Tất cả
                                            </button>


                                        </li>
                                    }
                                    <div className='overflow-y-auto max-h-64'>


                                        {viewData.map((item) => (
                                            <li key={item.id}>
                                                <button
                                                    className="w-full text-left block px-4 py-2 text-sm text-[#0C1844] hover:bg-[#667BC6] select-none"
                                                    onClick={() => handleClick(item.id, item.name)}
                                                >
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </div>
                                </>


                            }


                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown;