import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TaiKhoan from "./TaiKhoan";
import GiaVP from "./GiaVP";
import { FcManager, FcCurrencyExchange, FcConferenceCall } from "react-icons/fc";
import SideMenu from "../SideMenu";
import { useAppContext } from "../Store/AppContext";
import PageHeader from "../PageHeader";

function DanhMuc() {
    console.log('-----DanhMuc');

    const site = localStorage.getItem('site');
    const [selectedMenu, setSelectedMenu] = useState('');

    const menuList = useMemo(() => [
        { id: 'taikhoan', name: 'Tài khoản', icon: <FcManager /> },
        { id: 'nhanvien', name: 'Nhân viên', icon: <FcConferenceCall /> },
        { id: 'giavp', name: 'Giá viện phí', icon: <FcCurrencyExchange /> }
    ], []);

    return (

        <div className="w-full">
            <PageHeader title="Danh mục" />
            <div className="p-4">
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
                {selectedMenu === 'taikhoan' && <TaiKhoan site={site} />}
                {selectedMenu === 'giavp' && <GiaVP site={site} />}
                </div>
              
            </div>

        </div>
    );
}

export default React.memo(DanhMuc);
