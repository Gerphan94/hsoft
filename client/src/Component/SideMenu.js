import React from "react";
import { GiEarbuds, GiAlarmClock } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { CiPill } from "react-icons/ci";
import { PiFileSqlDuotone } from "react-icons/pi";
import { IoFileTrayFullSharp, IoNewspaperOutline } from "react-icons/io5";
import { FaBook, FaBed } from "react-icons/fa";
import { MdAttachMoney, MdBackpack, MdLocalHospital } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "./Store/AppContext";

function SideMenu( { selectedMenu = '' } ) {

    const { site, setSite } = useAppContext();
    console.log(selectedMenu)

    const funcs = [
        { id: 'hosobenhan', name: 'Hồ sơ bệnh án', icon: IoFileTrayFullSharp, path: '/hosobenhan' },
        { id: 'goikham', name: 'Gói khám', icon: MdBackpack, path: '/goikham' },
        { id: 'khambenh', name: 'Khám bệnh', icon: GiEarbuds, path: '/khambenh' },
        { id: 'phongluu', name: 'Phòng lưu', icon: MdLocalHospital, path: '/phongluu' },
        { id: 'noitru', name: 'Nội trú', icon: FaBed, path: '/noitru' },
        { id: 'vienphi', name: 'Viện phí', icon: MdAttachMoney, path: '/vienphi' },
        { id: 'datkham', name: 'Đặt khám', icon: GiAlarmClock, path: '/datkham' },
        { id: 'duoc', name: 'Dược', icon: CiPill, path: '/duoc' },
        { id: 'todieutri', name: 'Tờ điều trị', icon: IoNewspaperOutline, path: '/todieutri' },
        { id: 'danhmuc', name: 'Danh mục', icon: TbCategoryFilled, path: '/danh-muc' },
        { id: 'sql', name: 'SQL', icon: PiFileSqlDuotone, path: '/sql' },
        { id: 'document', name: 'Documents', icon: FaBook, path: '/document' }
    ];




    return (

        <>
            <div className="w-56  h-screen border-r-2 bg-[#031C30]">
                <div className="flex justify-between">
                    <div className="text-white font-bold text-2xl p-2">{site}</div>
                    <div className="flex items-center">
                        <button
                            className="p-2  text-white"

                        >
                        </button>
                    </div>

                </div>
                {funcs.map((func, index) => (
                    <div key={index} className={`px-2 flex gap-1 text-white text-lg items-center hover:opacity-100 ${selectedMenu === func.id ?'opacity-100' : 'opacity-60'} `}>
                        <func.icon className="ml-2" />
                        <Link
                            key={index}
                            to={`${func.path}`}
                            className={`block py-2 w-full text-left px-1 `}
                        >{func.name}</Link>
                    </div>
                ))}
            </div>

        </>
    )

}

export default SideMenu;