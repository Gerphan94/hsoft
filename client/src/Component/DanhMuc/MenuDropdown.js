import React, { useEffect, useRef, useState, useMemo, memo } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { FcManager, FcCurrencyExchange, FcConferenceCall } from "react-icons/fc";

const MenuDropdown = ({ selectedOption, setSelectedOption }) => {

    console.log('render dropdown')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedIcon, setSelectedIcon] = useState(null);

    const menuList = [
        { id: 'taikhoan', name: 'Tài khoản', icon: <FcManager /> },
        { id: 'nhanvien', name: 'Nhân viên', icon: <FcConferenceCall /> },
        { id: 'giavp', name: 'Giá viện phí', icon: <FcCurrencyExchange /> }
    ]

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClick = (id, name, icon) => {
        setSelectedOption({ id, name });
        setIsDropdownOpen(false);
        setSelectedIcon(icon);


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
                <button
                    className={`flex gap-1 justify-between items-center text-left border select-none outline-none h-full w-full py-1 px-2 text-[#0C1844] group-hover:border-blue-200 rounded-lg shadow-md shadow-[#667BC6] }`}
                    onClick={toggleDropdown}
                >
                    <div className='flex gap-1 items-center'>
                        <span>{selectedIcon}</span>
                        {selectedOption.name}
                    </div>

                    <span
                        className=" p-1"
                        onClick={toggleDropdown}
                    >
                        <FaAngleDown className="h-5 w-5 text-gray-500 group-hover:text-blue-200 " />
                    </span>
                </button>




                {isDropdownOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-full max-h-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ">

                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                            <div className='overflow-y-auto max-h-64'>
                                {menuList.map((item) => (
                                    <li key={item.id}>
                                        <div className='flex gap-1 items-center px-2 py-2 hover:bg-[#667BC6] '
                                            onClick={() => handleClick(item.id, item.name, item.icon)}
                                        >
                                            <span>

                                                {item.icon}

                                            </span>
                                            <button
                                                className="w-full text-left block text-md text-[#0C1844] select-none"

                                            >
                                                {item.name}
                                            </button>
                                        </div>

                                    </li>
                                ))}
                            </div>





                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MenuDropdown;