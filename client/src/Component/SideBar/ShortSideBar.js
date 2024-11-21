import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import { FaAngleRight } from "react-icons/fa6";

function ShortSideBar({ data, isShortSideBar, setIsShortSideBar, site }) {

    const navigate = useNavigate();

    const location = useLocation();
    const pathName = location.pathname;

    const Tooltip = ({ text, children, shortMenu }) => {
        const [showTooltip, setShowTooltip] = useState(false);

        return (
            <div className="relative flex items-center">
                <div
                    className="cursor-pointer"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    {children}
                </div>

                {showTooltip && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-5 px-3 py-2 bg-gray-800 text-white rounded text-sm z-50">
                        {text}
                    </div>
                )}
            </div>
        );
    };



    const [shortMenu, setShortMenu] = useState(false);


    const handleClick = (id, path) => {
        navigate(path);

    };

    return (
        <>
            <div className={`w-16 bg-[#031C30]  text-white h-screen overflow-visible`}>
                <ul className="py-2 ml-3 mt-10 w-full space-y-1 ">
                    {data.map((func, index) => (
                        <Tooltip text={func.name} key={index}>
                            <li
                                className={` gap-2 w-full inline-block p-2 cursor-pointer hover:bg-gray-700 rounded-lg border-white  ${pathName === func.path ? 'border opacity-100' : 'opacity-75'}`}
                                key={index}
                                onClick={() => handleClick(func.id, func.path)}
                            >
                                <span><func.icon className="size-full font-bold" /></span>

                            </li>
                        </Tooltip>
                    ))}
                </ul>
            </div>
        </>
    )

}

export default ShortSideBar;