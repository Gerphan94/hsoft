import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TaiKhoan from "./TaiKhoan";
import GiaVP from "./GiaVP";
import { FcManager, FcCurrencyExchange, FcConferenceCall } from "react-icons/fc";
import SideMenu from "../SideMenu";
import { useAppContext } from "../Store/AppContext";

function DanhMuc() {
    console.log('-----DanhMuc');

    const { site } = useAppContext();
   
    const [selectedMenu, setSelectedMenu] = useState('');

    const menuList = useMemo(() => [
        { id: 'taikhoan', name: 'Tài khoản', icon: <FcManager /> },
        { id: 'nhanvien', name: 'Nhân viên', icon: <FcConferenceCall /> },
        { id: 'giavp', name: 'Giá viện phí', icon: <FcCurrencyExchange /> }
    ], []);

    return (
        { site } && (
            <div className="flex">
                <SideMenu site={site} selectedMenu='danhmuc'/>
                <div className="h-screen w-full flex flex-col overflow-y-auto">
                    <header className="p-2 sticky top-0 flex justify-between items-center border-b bg-white">
                        <h1 className="text-xl font-bold text-left px-4">Danh mục</h1>
                        <div className="grid gap-2 grid-flow-col justify-start">
                            {menuList.map((menu) => (
                                <button
                                    key={menu.id}
                                    className={`items-center text-left border select-none outline-none h-full w-full py-1 px-3 text-[#0C1844] hover:border-[#667BC6] hover:shadow-md rounded-lg shadow-[#667BC6] ${selectedMenu === menu.id ? 'shadow-md  border-[#667BC6]' : ''}`}
                                    onClick={() => setSelectedMenu(menu.id)}
                                    
                                >
                                    <div className='flex gap-1 items-center'>
                                        <span>{menu.icon}</span>
                                        {menu.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </header>
                    {selectedMenu === 'taikhoan' && <TaiKhoan site={site} />}
                    {selectedMenu === 'giavp' && <GiaVP site={site} />}
                </div>
            </div>
        )
    );
}

export default React.memo(DanhMuc);
