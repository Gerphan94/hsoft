import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { GiEarbuds, GiAlarmClock } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { CiPill } from "react-icons/ci";
import { PiFileSqlDuotone } from "react-icons/pi";
import { IoFileTrayFullSharp, IoNewspaperOutline } from "react-icons/io5";
import { FaBook, FaBed } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { useAppContext } from '../Store/AppContext';
import ChooseSiteModal from "../Site/ChooseSiteModal";

import LongSideBar from "./LongSideBar";
import ShortSideBar from "./ShortSideBar";

function SideBar() {

    const { site, setSite, setArea } = useAppContext();

    const navigate = useNavigate();

    const location = useLocation();
    const pathName = location.pathname;

    const [showChooseSite, setShowChooseSite] = useState(false);

    const [isShortSideBar, setIsShortSideBar] = useState(false);

    const funcs = [
        { id: 'hosobenhan', name: 'Hồ sơ bệnh án', icon: IoFileTrayFullSharp, path: '/hosobenhan' },
        { id: 'khambenh', name: 'Khám bệnh', icon: GiEarbuds, path: '/kham-benh' },
        { id: 'phongluu', name: 'Phòng lưu', icon: GiEarbuds, path: '/phong-luu' },
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
            {isShortSideBar ?
                <ShortSideBar
                    data={funcs}
                    isShortSideBar={isShortSideBar}
                    setIsShortSideBar={setIsShortSideBar}
                    site={site}
                    setShowChooseSite={setShowChooseSite}
                />
                :
                <LongSideBar
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