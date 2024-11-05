import React, { useEffect, useRef, useState } from 'react'
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { GiTestTubes, GiMedicines } from "react-icons/gi";
import { BiSolidShieldPlus } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { FcSurvey, FcDocument } from "react-icons/fc";

const ButtonMenu = ({ selectedMenu, menuData, setSelectedMenu }) => {

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
        <div className='w-full items-center inline-block' ref={dropdownRef}>
            <div className="relative inline-block ">
                <button
                    className={`flex items-center justify-between gap-2 w-full h-full p-1 whitespace-nowrap  px-2 border bg-[#667BC6] text-white font-bold select-none disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed outline-none'}`}
                    onClick={toggleDropdown}
                >
                    Tồn kho
                    <span><FaAngleDown /></span>
                </button>


                {isDropdownOpen && (
                    <div className="origin-top-left absolute right-0 mt-2 w-60 max-h-96 shadow-lg shadow-gray-300 border border-gray-400 bg-white  ring-1 ring-black ring-opacity-5 z-50 overflow-y-auto">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {menuData.map((item) => (
                                <li key={item.id}>
                                    <button
                                        className="w-full text-left flex gap-1 items-center px-4 py-2 hover:bg-gray-300 select-none"
                                        onClick={() => {
                                            setSelectedMenu({id:item.id, name:item.name});
                                            setIsDropdownOpen(!isDropdownOpen);
                                        }}
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

export default ButtonMenu;