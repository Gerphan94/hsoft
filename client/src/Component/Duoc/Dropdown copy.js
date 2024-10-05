import React, { useState } from 'react'
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";

const Dropdown = ({ setSelectedOption }) => {


    const menuData = [
        { id: 'tonkho_ketoa_bhyt', name: 'Tồn kho - kê toa BHYT', borderTop: false },
        { id: 'tonkho_ketoa_nhathuoc', name: 'Tồn kho - kê toa NT', borderTop: false },
        { id: 'tonkho_tonbhyt', name: 'Tồn BHYT', borderTop: false },
        { id: 'tonkho_theokho', name: 'Tồn Theo kho', borderTop: false },
        { id: 'tontutruc', name: 'Tồn tủ trực', borderTop: true },
        { id: 'dmbd', name: 'Danh mục Dược', borderTop: true },
        { id: 4, name: 'Khác',borderTop: false  }
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
                                <li className={` ${item.borderTop ? 'border-t border-gray-200' : ''}`}>
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