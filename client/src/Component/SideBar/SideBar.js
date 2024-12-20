import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import { useAppContext } from '../Store/AppContext';
import ChooseSiteModal from "../Site/ChooseSiteModal";

import LongSideBar from "./LongSideBar";
import ShortSideBar from "./ShortSideBar";
// IMPORT ICON
import { GiEarbuds } from "react-icons/gi";
import { GoPersonFill } from "react-icons/go";
import { TbCategoryFilled } from "react-icons/tb";
import { CiPill } from "react-icons/ci";
import { PiFileSqlDuotone } from "react-icons/pi";
import { IoFileTrayFullSharp, IoNewspaperOutline } from "react-icons/io5";
import { FaBook, FaBed } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";


function SideBar() {

    const { site, setSite , area, setArea, longSideBar } = useAppContext();
    const [showChooseSite, setShowChooseSite] = useState(false);
    const [isShortSideBar, setIsShortSideBar] = useState(false);

    const funcs = [
        { id: 'benhnhan', name: 'Bệnh nhân', icon: GoPersonFill, path: '/benh-nhan' },
        { id: 'hosobenhan', name: 'Hồ sơ bệnh án', icon: IoFileTrayFullSharp, path: '/hosobenhan' },
        { id: 'khambenh', name: 'Khám bệnh', icon: GiEarbuds, path: '/kham-benh' },
        { id: 'phongluu', name: 'Phòng lưu', icon: GiEarbuds, path: '/phong-luu' },
        { id: 'noitru', name: 'Nội trú', icon: FaBed, path: '/noi-tru' },
        { id: 'vienphi', name: 'Viện phí', icon: MdAttachMoney, path: '/vien-phi' },
        { id: 'duoc', name: 'Dược', icon: CiPill, path: '/duoc' },
        { id: 'todieutri', name: 'Tờ điều trị', icon: IoNewspaperOutline, path: '/to-dieu-tri' },
        { id: 'danhmuc', name: 'Danh mục', icon: TbCategoryFilled, path: '/danh-muc' },
        { id: 'danhsachphieu', name: 'Danh sách phiếu', icon: TbCategoryFilled, path: '/danh-sach-phieu' },
        { id: 'sql', name: 'SQL', icon: PiFileSqlDuotone, path: 'https://aged-trader-e9b.notion.site/SQL-1150ea29bab180eeb4d6c8ad8290221b?pvs=4' },
        { id: 'document', name: 'Documents', icon: FaBook, path: '/document' },
        { id: 'mynote', name: 'My Note', icon: FaBook, path: '/my-note' }
    ];


    return (
        <>
            {longSideBar ?
                <LongSideBar
                    data={funcs}
                    isShortSideBar={isShortSideBar}
                    setIsShortSideBar={setIsShortSideBar}
                    site={site}
                    area={area}
                    setShowChooseSite={setShowChooseSite}
                />
                :
                <ShortSideBar
                    data={funcs}
                    isShortSideBar={isShortSideBar}
                    setIsShortSideBar={setIsShortSideBar}
                    site={site}
                    setShowChooseSite={setShowChooseSite}
                />

            }
            {showChooseSite &&
                <ChooseSiteModal
                    setSite={setSite}
                    setShowModal={setShowChooseSite}
                    setArea={setArea}
                />}
        </>
    )

}

export default SideBar;