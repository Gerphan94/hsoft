import React, { useEffect, useRef, useState } from 'react'
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { GiTestTubes, GiMedicines } from "react-icons/gi";
import { BiSolidShieldPlus } from "react-icons/bi";

const ButtonChucNang = ({
    selectedPatient, 
    setShowHealthInsurance, 
    setShowServiceModal, 
    setShowBloodModal, 
    setShowMedicineModal,
    setShowTreatmentSheet
}) => {

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
            <div className="relative inline-block w-32">
                    <button
                        className={`flex items-center justify-between gap-2 w-full h-full p-1  px-2 border bg-[#667BC6] text-white font-bold select-none disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed outline-none'}`}
                        onClick={toggleDropdown}
                        disabled = {selectedPatient && selectedPatient.pid ? false : true}
                    >
                        Chức năng
                        <span><FaAngleDown /></span>
                    </button>
                
                {isDropdownOpen && (
                    <div className="origin-top-right absolute mt-0 w-full max-h-96 shadow-lg  bg-white  ring-1 ring-black ring-opacity-5 z-50 overflow-y-auto">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <button
                                    className="w-full text-left flex gap-1 items-center px-4 py-2 hover:bg-gray-300 select-none"
                                    onClick={() => {
                                        setShowHealthInsurance(true);
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    <BiSolidShieldPlus className='text-green-500' />
                                    BHYT
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-300 select-none flex items-center gap-1"
                                    onClick={() => {
                                        setShowServiceModal(true);
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    <GiTestTubes className='text-blue-500' />
                                    Dịch vụ
                                </button>
                                <button
                                    className="w-full text-left flex gap-1 items-center px-4 py-2  hover:bg-gray-300 select-none"
                                    onClick={() => {
                                        setShowMedicineModal(true);
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    <GiMedicines className='text-red-500' />
                                    Thuốc
                                </button>
                                <button
                                    className="w-full text-left flex gap-1 items-center px-4 py-2  hover:bg-gray-300 select-none"
                                    onClick={() => {
                                        setShowTreatmentSheet(true);
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    <GiMedicines className='text-red-500' />
                                    Tờ điều trị
                                </button>
                            </li>

                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ButtonChucNang;