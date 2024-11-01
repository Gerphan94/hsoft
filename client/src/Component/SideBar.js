import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import { GiEarbuds, GiAlarmClock } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { CiPill } from "react-icons/ci";
import { PiFileSqlDuotone } from "react-icons/pi";
import { IoFileTrayFullSharp, IoNewspaperOutline } from "react-icons/io5";
import { FaBook, FaBed } from "react-icons/fa";
import { MdAttachMoney, MdBackpack, MdLocalHospital } from "react-icons/md";
import { useAppContext } from "./Store/AppContext";
import ChooseSiteModal from "./Site/ChooseSiteModal";
import { SiSitepoint } from "react-icons/si";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function SideBar() {

    const { site, setSite, selectedSideBar, area } = useAppContext();

    const navigate = useNavigate();

    const location = useLocation();
    const pathName = location.pathname;
    console.log('pathName', pathName)

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

                {showTooltip && shortMenu && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-1 px-3 py-2 bg-gray-800 text-white rounded text-sm z-50">
                        {text}
                    </div>
                )}
            </div>
        );
    };


    const [showChooseSite, setShowChooseSite] = useState(false);

    const [shortMenu, setShortMenu] = useState(false);

    const funcs = [
        { id: 'hosobenhan', name: 'Hồ sơ bệnh án', icon: IoFileTrayFullSharp, path: '/hosobenhan' },
        { id: 'khambenh', name: 'Khám bệnh', icon: GiEarbuds, path: '/kham-benh' },
        { id: 'noitru', name: 'Nội trú', icon: FaBed, path: '/noi-tru' },
        { id: 'vienphi', name: 'Viện phí', icon: MdAttachMoney, path: '/vien-phi' },
        { id: 'duoc', name: 'Dược', icon: CiPill, path: '/duoc' },
        { id: 'todieutri', name: 'Tờ điều trị', icon: IoNewspaperOutline, path: '/to-dieu-tri' },
        { id: 'danhmuc', name: 'Danh mục', icon: TbCategoryFilled, path: '/danh-muc' },
        { id: 'sql', name: 'SQL', icon: PiFileSqlDuotone, path: 'https://aged-trader-e9b.notion.site/SQL-1150ea29bab180eeb4d6c8ad8290221b?pvs=4' },
        { id: 'document', name: 'Documents', icon: FaBook, path: '/document' }
    ];

    const handleClick = (id, path) => {
        navigate(path);

    };

    return (
        <>
            <div className={`${shortMenu ? 'w-16' : 'w-56'} bg-[#031C30] relative text-white h-screen overflow-visible`}>
                <span
                    className="absolute flex items-center justify-center bg-[#031C30] rounded-full size-6 right-0 top-6 transform -translate-y-1/2 translate-x-1/2 cursor-pointer z-[1000]"
                    onClick={() => setShortMenu(!shortMenu)}
                >
                    {shortMenu ? <FaAngleRight /> : <FaAngleLeft />}
                </span>
                <div className='h-10 w-full flex items-center justify-left px-5 py-1'>
                    <div className="w-full bg-[#384B70]"> {site}</div>
                </div>

                <ul className="p-4 w-full space-y-1 ">

                    {funcs.map((func, index) => (
                        <li
                            className={`flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-700 rounded-lg border-white  ${pathName === func.path ? 'border opacity-100' : 'opacity-75'}`}
                            key={index}
                            onClick={() => handleClick(func.id, func.path)}
                        >
                            <span><func.icon /></span>
                            {func.name}
                        </li>
                    ))}
                </ul>



            </div>
            {showChooseSite && <ChooseSiteModal setSite={setSite} setShowModal={setShowChooseSite} />}
        </>
    )

}

export default SideBar;