import React, { useState } from "react";

import TaiKhoan from "./TaiKhoan";
import NhanVien from "./NhanVien";
import GiaVP from "./GiaVP";
import ButtonMenu from "../Common/ButtonMenu";
import MenuDropdown from "./MenuDropdown";
import { FcManager, FcCurrencyExchange, FcConferenceCall } from "react-icons/fc";


function DanhMuc({ site }) {

    const [selectedOption, setSelectedOption] = useState({ 'id': 0, 'name': '' })

    const [selectedMenu, setSelectedMenu] = useState('taikhoan')

    const menuList = [
        { id: 'taikhoan', name: 'Tài khoản', icon: <FcManager /> },
        { id: 'nhanvien', name: 'Nhân viên', icon: <FcConferenceCall /> },
        { id: 'giavp', name: 'Giá viện phí', icon: <FcCurrencyExchange /> }
    ]

    return (

        <>
            <div className="p-4 flex flex-col flex-grow">
                <div className="grid gap-2 grid-flow-col justify-start">
                    {menuList.map((menu) =>
                        <button
                            key={menu.id}
                            className={`flex gap-1 justify-between items-center text-left border select-none outline-none h-full w-full py-2 px-3 text-[#0C1844] hover:border-[#667BC6] hover:shadow-md rounded-lg shadow-[#667BC6] ${selectedMenu === menu.id && 'shadow-md  border-[#667BC6]'} }`}
                            onClick={() => setSelectedMenu(menu.id)}
                        >
                            <div className='flex gap-1 items-center'>
                                <span>{menu.icon}</span>
                                {menu.name}
                            </div>

                        </button>
                    )}
                </div>
                <div className="w-full border rounded-lg mt-4 p-4">
                    {selectedMenu === 'taikhoan' && <TaiKhoan site={site} />}
                    {selectedMenu === 'nhanvien' && <NhanVien site={site} />}
                    {selectedMenu === 'giavp' && <GiaVP site={site} />}
                </div>

            </div>
        </>
    )
}
export default DanhMuc;