import React from "react";
import { GiEarbuds, GiAlarmClock } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { CiPill } from "react-icons/ci";
import { PiFileSqlDuotone } from "react-icons/pi";
import { IoFileTrayFullSharp, IoNewspaperOutline } from "react-icons/io5";
import { FaBook, FaBed } from "react-icons/fa";
import { MdAttachMoney, MdBackpack, MdLocalHospital } from "react-icons/md";

function SideMenu({ selectedFunc, setSelectedFunc, setPageTitle, setMainIcon }) {

    const funcs = [
        { id: 'hosobenhan', name: 'Hồ sơ bệnh án', icon: IoFileTrayFullSharp },
        // { id: 1, name: 'Hiện diện BN', icon: GiEarbuds },
        { id: 'goikham', name: 'Gói khám', icon: MdBackpack },
        { id: 'khambenh', name: 'Khám bệnh', icon: GiEarbuds },
        { id: 'phongluu', name: 'Phòng lưu', icon: MdLocalHospital },
        { id: 'noitru', name: 'Nội trú', icon: FaBed },
        { id: 'vienphi', name: 'Viện phí', icon: MdAttachMoney },
        { id: 'datkham', name: "Đặt khám", icon: GiAlarmClock },
        { id: 'duoc', name: "Dược", icon: CiPill },
        { id: 'todieutri', name: "Tờ điều trị", icon: IoNewspaperOutline },
        { id: 'danhmuc', name: "Danh mục", icon: TbCategoryFilled },
        { id: 'sql', name: 'SQL', icon: PiFileSqlDuotone },
        { id: 'document', name: "Documents", icon: FaBook }
    ];

    const handleClick = (id, name, icon) => {
        setSelectedFunc(id);
        setPageTitle(name);
        setMainIcon(icon);
    }

    return (

        <>
            {funcs.map((func, index) => (
                <div key={index} className={`px-2 flex gap-1 text-white text-lg items-center hover:opacity-100  ${func.id === selectedFunc ? 'opacity-100' : 'opacity-50'} `}>
                    <func.icon className="ml-2" />
                    <button
                        key={index}
                        className={`block py-2 w-full text-left px-1 `}
                        onClick={() => handleClick(func.id, func.name, func.icon)}

                    >{func.name}</button>
                </div>
            )
            )}
        </>
    )

}

export default SideMenu;