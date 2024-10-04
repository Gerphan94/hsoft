import React, { useState } from "react";
import { GiEarbuds, GiAlarmClock } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { CiPill } from "react-icons/ci";
import { PiFileSqlDuotone } from "react-icons/pi";
import { IoFileTrayFullSharp, IoNewspaperOutline } from "react-icons/io5";
import { FaBook, FaBed } from "react-icons/fa";
import { MdAttachMoney, MdBackpack, MdLocalHospital } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "./Store/AppContext";
import ChooseSiteModal from "./Site/ChooseSiteModal";

function SideMenu({ site, setSite , selectedMenu = '' }) {

    console.log(selectedMenu)

    const [showChooseSite, setShowChooseSite] = useState(false);

    const funcs = [
        { id: 'hosobenhan', name: 'Hồ sơ bệnh án', icon: IoFileTrayFullSharp, path: '/hosobenhan' },
        { id: 'goikham', name: 'Gói khám', icon: MdBackpack, path: '/goi-kham' },
        { id: 'khambenh', name: 'Khám bệnh', icon: GiEarbuds, path: '/kham-benh' },
        { id: 'phongluu', name: 'Phòng lưu', icon: MdLocalHospital, path: '/phong-luu' },
        { id: 'noitru', name: 'Nội trú', icon: FaBed, path: '/noi-tru' },
        { id: 'vienphi', name: 'Viện phí', icon: MdAttachMoney, path: '/vien-phi' },
        { id: 'datkham', name: 'Đặt khám', icon: GiAlarmClock, path: '/dat-kham' },
        { id: 'duoc', name: 'Dược', icon: CiPill, path: '/duoc' },
        { id: 'todieutri', name: 'Tờ điều trị', icon: IoNewspaperOutline, path: '/to-dieu-tri' },
        { id: 'danhmuc', name: 'Danh mục', icon: TbCategoryFilled, path: '/danh-muc' },
        { id: 'sql', name: 'SQL', icon: PiFileSqlDuotone, path: '/sql' },
        { id: 'document', name: 'Documents', icon: FaBook, path: '/document' }
    ];


    return (
        <>
            {site &&
                <div className="w-56  border-r-2 bg-[#031C30]">
                    <div className="flex justify-between p-2">
                        <button
                            className="text-white font-bold text-2xl px-2 py-1 w-full border border-white rounded-lg opacity-70 hover:opacity-100"
                            onClick={() => setShowChooseSite(true)}
                        >
                            {site}
                        </button>
                    </div>
                    {funcs.map((func, index) => (
                        <div key={index} className={`px-2 flex gap-1 text-white text-lg items-center hover:opacity-100 ${selectedMenu === func.id ? 'opacity-100' : 'opacity-60'} `}>
                            <func.icon className="ml-2" />
                            <Link
                                key={index}
                                to={`${func.path}`}
                                className={`block py-2 w-full text-left px-1 `}
                            >{func.name}</Link>
                        </div>
                    ))}
                </div>
            }

            {showChooseSite && <ChooseSiteModal setSite={setSite} setShowModal={setShowChooseSite} />}

        </>
    )

}

export default SideMenu;