import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TaiKhoan from "./TaiKhoan";
import GiaVP from "./GiaVP";
import PhongGiuong from "./PhongGiuong";

import { FcManager, FcCurrencyExchange, FcConferenceCall } from "react-icons/fc";
import { IoBed } from "react-icons/io5";

import { useAppContext } from "../Store/AppContext";
import PageHeader from "../PageHeader";
import ButtonMenu from "./ButtonMenu";

function DanhMuc() {
    const { site } = useAppContext();
    
    const [selectedMenu, setSelectedMenu] = useState('');

    const menuList = useMemo(() => [
        { id: 'taikhoan', name: 'Tài khoản', icon: <FcManager /> },
        { id: 'nhanvien', name: 'Nhân viên', icon: <FcConferenceCall /> },
        { id: 'giavp', name: 'Giá viện phí', icon: <FcCurrencyExchange /> },
        { id: 'phonggiuong', name: 'Phòng/Giường', icon: <IoBed className="text-blue-600" /> }
    ], []);

    return (

        <div className="w-full">
            <PageHeader title="Danh mục" />
            <div className="p-4 ">
                <div className="flex justify-between">
                <div className="flex justify-start">
                    {menuList.map((menu) => (
                        <button
                            key={menu.id}
                            className={`items-center text-left border select-none outline-none whitespace-nowrap h-full  py-1 px-3 text-[#0C1844] hover:border-[#667BC6] hover:shadow-md shadow-[#667BC6] ${selectedMenu === menu.id ? 'shadow-md  border-[#667BC6]' : ''}`}
                            onClick={() => setSelectedMenu(menu.id)}
                        >
                            <div className='flex gap-1 items-center'>
                                <span>{menu.icon}</span>
                                {menu.name}
                            </div>
                        </button>
                    ))}
                    <div className="w-full bg-gray-300"></div>
                </div>
                <div>
                    <ButtonMenu 
                    selectedMenu={selectedMenu} 
                    menuData={menuList} 
                    setSelectedMenu={setSelectedMenu} />
                </div>
                </div>
                <div>
                {selectedMenu && selectedMenu.id === 'taikhoan' && <TaiKhoan site={site} />}
                {selectedMenu && selectedMenu.id === 'giavp' && <GiaVP site={site} />}
                {selectedMenu && selectedMenu.id === 'phonggiuong' && <PhongGiuong />}

                </div>
              
            </div>

        </div>
    );
}

export default React.memo(DanhMuc);
