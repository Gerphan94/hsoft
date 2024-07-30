import React, { useEffect, useRef, useState } from 'react'
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";

const Dausinhton = ({ dst }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClick = (id, name) => {
        setIsDropdownOpen(false);

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
        <div className='w-full items-center inline-block' ref={dropdownRef}>
            <div className="relative inline-block w-full">
                <div className='flex items-center'>
                    <button className='w-full h-full p-1'
                        onClick={toggleDropdown}>
                        <RiAlignJustify className='size-6' />
                    </button>
                </div>
                {isDropdownOpen && (
                    <div className="origin-top-left absolute right-0 mt-2 w-44 max-h-96 shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-y-auto">
                        <div className='border-b'>Dấu sinh tồn</div>
                        <div className='grid grid-cols-1 p-2 text-left'>
                            <div>Mạch: </div>
                            <div>Nhiệt độ: </div>
                            <div>Huyết áp </div>
                            <div>Nhịp thở: </div>
                            <div>Cân nặng: </div>
                            <div>Chiều cao:</div>
                        </div>



                    </div>
                )}
            </div>
        </div>
    )
}

export default Dausinhton;