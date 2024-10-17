import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function LongSideBar( { data, isShortSideBar, setIsShortSideBar, site, setShowChooseSite }  ) {


    const navigate = useNavigate();

    const location = useLocation();
    const pathName = location.pathname;


    const handleClick = (id, path) => {
        navigate(path);

    };

    return (
        <>
            <div className={`w-56 bg-[#031C30] relative text-white h-screen overflow-visible`}>
                <span
                    className="absolute flex items-center justify-center bg-[#031C30] rounded-full size-6 right-0 top-6 transform -translate-y-1/2 translate-x-1/2 cursor-pointer z-[1000]"
                    onClick={() => setIsShortSideBar(!isShortSideBar)}
                >
                   <FaAngleLeft />
                </span>
                <div className='h-10 w-full flex items-center justify-left px-5 py-1'>
                    <button 
                    className="w-full bg-[#384B70]"
                    onClick={() => setShowChooseSite(true)}
                    
                    > {site}</button>
                </div>

                <ul className="p-4 w-full space-y-1 ">
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