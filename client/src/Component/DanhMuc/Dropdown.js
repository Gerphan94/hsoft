import React, { useState } from 'react'
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";

const Dropdown = ({ setSelectedOption }) => {

    const menuData = [
        { id: 'nhanvien', name: 'Nhân viên' }
    ]

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleClick = (id, name) => {
        setSelectedOption({ id, name });
        closeDropdown();
    };

    return (
        <div className='w-20 text-left p-3'>
            <div className="relative inline-block">
                <button
                    className="w-8 h-8 text-2xl flex items-center justify-center"
                    onClick={toggleDropdown}
                >
                    <RiAlignJustify />
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {menuData.map((item) => (
                                <li>
                                    <button
                                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => handleClick(item.id, item.name)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown;