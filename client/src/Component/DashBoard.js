import React from "react";
import SideMenu from "./SideMenu";
import { useAppContext } from "./Store/AppContext";
import { GiEarbuds, GiAlarmClock } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { CiPill } from "react-icons/ci";
import { PiFileSqlDuotone } from "react-icons/pi";
import { IoFileTrayFullSharp, IoNewspaperOutline } from "react-icons/io5";
import { FaBook, FaBed } from "react-icons/fa";
import { MdAttachMoney, MdBackpack, MdLocalHospital } from "react-icons/md";
import { Link } from "react-router-dom";
function DashBoard() {

    const site = localStorage.getItem('site');

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
        <div className="App">
            <div className="flex">
                <SideMenu site={site} />

                <div className="">
                    <h1>Welcome</h1>
                </div>



            </div>

        </div>
    );
}

export default DashBoard;