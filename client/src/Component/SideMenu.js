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
import { SiSitepoint } from "react-icons/si";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function SideMenu({ site, setSite, selectedMenu = '' }) {

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
      
            {showTooltip && shortMenu &&(
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-1 px-3 py-2 bg-gray-800 text-white rounded text-sm z-50">
                {text}
              </div>
            )}
          </div>
        );
      };

    console.log(selectedMenu)

    const [showChooseSite, setShowChooseSite] = useState(false);

    const [shortMenu, setShortMenu] = useState(false);

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
        { id: 'sql', name: 'SQL', icon: PiFileSqlDuotone, path: 'https://aged-trader-e9b.notion.site/SQL-1150ea29bab180eeb4d6c8ad8290221b?pvs=4' },
        { id: 'document', name: 'Documents', icon: FaBook, path: '/document' }
    ];

    return (
        <>
            {site &&
                <div className={`relative ${shortMenu ? 'w-18' : 'w-56'} border-r-2 bg-[#031C30]`}>
                    <div
                        className="absolute flex items-center justify-center bg-[#031C30] rounded-full text-white size-6 right-0 top-6 transform -translate-y-1/2 translate-x-1/2 cursor-pointer"
                        onClick={() => setShortMenu(!shortMenu)}
                    >
                        {shortMenu ? <FaAngleRight /> : <FaAngleLeft />}
                    </div>
                    <div className="text-left p-2">
                        {shortMenu ?
                            <button className="text-white text-left font-bold text-2xl px-2 py-1 w-full  rounded-lg opacity-70 hover:opacity-100"><SiSitepoint /></button>:
                            <button
                                className="text-white text-left font-bold text-2xl px-2 py-1 w-full  rounded-lg opacity-70 hover:opacity-100"
                                onClick={() => setShowChooseSite(true)}
                            >
                                {site}
                            </button>
                        }

                    </div>
                    {funcs.map((func, index) => (
                        <Tooltip text={func.name} key={index} shortMenu={shortMenu}>
                        <Link
                            key={index}
                            to={`${func.path}`}
                            className={`px-2 py-2 flex gap-3 text-white text-lg items-center hover:opacity-100 ${selectedMenu === func.id ? 'opacity-100' : 'opacity-60'} `}
                        >
                            <func.icon className={`${shortMenu ? 'size-8' : 'size-5'} `} />

                            {!shortMenu && func.name}
                        </Link>
                        </Tooltip>
                    ))}
                </div>
            }

            {showChooseSite && <ChooseSiteModal setSite={setSite} setShowModal={setShowChooseSite} />}

        </>
    )

}

export default SideMenu;