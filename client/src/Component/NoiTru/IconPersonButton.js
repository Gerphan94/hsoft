import React, { useEffect, useRef, useState } from 'react'
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { GiTestTubes, GiMedicines } from "react-icons/gi";
import { BiSolidShieldPlus } from "react-icons/bi";
import { FaAlignJustify } from "react-icons/fa6";

const IconPersonButton = ({
    setShowCabinetModal,
    setShowDSPhieuModal,
    setShowQLGiuongModal
}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState('bottom'); // Track dropdown position (top or bottom)

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
            // Check the dropdown position when opened
            const dropdownElement = dropdownRef.current;
            const dropdownRect = dropdownElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // If the dropdown is too close to the bottom of the viewport, show it on top
            if (dropdownRect.bottom > windowHeight - 200) {
                setDropdownPosition('top');
            } else {
                setDropdownPosition('bottom');
            }

            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className='w-full items-center inline-block' ref={dropdownRef}>
            <div className="relative inline-block ">

                <button
                    className='flex items-center justify-between gap-2 w-full h-full p-1  px-2  select-none'
                    onClick={toggleDropdown}
                >
                    <FaAlignJustify />
                    
                </button>

                {isDropdownOpen && (
                    <div className={`origin-top-right absolute  ${dropdownPosition === 'top' ? 'bottom-full' : 'top-full'} left-0 w-60 max-h-96 shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-y-auto`}>
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <button
                                    className="w-full text-left flex gap-1 items-center px-4 py-2 hover:bg-gray-300 select-none"
                                    onClick={() => {
                                        setShowCabinetModal(true);
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    <BiSolidShieldPlus className='text-green-500' />
                                    Tủ trực
                                </button>
                                <button
                                    className="w-full text-left flex gap-1 items-center px-4 py-2 hover:bg-gray-300 select-none"
                                    onClick={() => {
                                        setShowDSPhieuModal(true);
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    <BiSolidShieldPlus className='text-green-500' />
                                    Danh sách phiếu đã lập
                                </button>
                                <button
                                    className="w-full text-left flex gap-1 items-center px-4 py-2 hover:bg-gray-300 select-none"
                                    onClick={() => {
                                        setShowQLGiuongModal(true);
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    <BiSolidShieldPlus className='text-green-500' />
                                    Quản lý giường
                                </button>


                            </li>

                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default IconPersonButton;