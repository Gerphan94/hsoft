import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TaiKhoan from "./TaiKhoan/TaiKhoan";
import GiaVP from "./GiaVP";
import PhongGiuong from "./PhongGiuong";
import DinhDuong from "./DinhDuong";
import BieuMauEMR from "./BieuMauEMR/BieuMauEMR";

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
        { id: 'dinhduong', name: 'Dinh dưỡng', icon: <FcCurrencyExchange /> },
        { id: 'phonggiuong', name: 'Phòng/Giường', icon: <IoBed className="text-blue-600" /> },  
        { id: 'bieumauemr', name: 'Biểu mẫu EMR', icon: <FcCurrencyExchange /> },

    ], []);

    return (

        <div className="w-full">
            <PageHeader title="Danh mục" />
            <div className="p-4 ">
                <div className="flex justify-between items-center">
                <div className="font-bold text-2xl">{selectedMenu.name}</div>
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
                {selectedMenu && selectedMenu.id === 'dinhduong' && <DinhDuong />}
                {selectedMenu && selectedMenu.id === 'bieumauemr' && <BieuMauEMR />}

                </div>
              
            </div>

        </div>
    );
}

export default React.memo(DanhMuc);
