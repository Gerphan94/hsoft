import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../Store/AppContext';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function LongSideBar({ data, setShowChooseSite, area }) {

    const navigate = useNavigate();

    const location = useLocation();
    const pathName = location.pathname;


    const handleClick = (id, path) => {
        navigate(path);

    };

    return (
        <>
            <div className={`w-56 bg-[#031C30] relative text-white h-screen overflow-y-auto`}>
                <ul className="p-4 mt-10 w-full space-y-1 select-none">
                    {data.map((item, index) => (
                        <li
                            className={`flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-700 rounded-lg border-white  ${pathName === item.path ? 'border opacity-100' : 'opacity-75'}`}
                            key={index}
                            onClick={() => handleClick(item.id, item.path)}
                        >
                            <span><item.icon /></span>
                            {item.name}
                        </li> 
                    ))}
                </ul>
            </div>
        </>
    )

}

export default LongSideBar;