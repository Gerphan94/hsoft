import React, { useState, useEffect } from "react";
import Dropdown from "../Common/Dropdown";

import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";
import TonKhoKeToa from "./TonKhoKeToa";
import Dmbd from "./Dmbd";
import TonTuTruc from "./TonTuTruc";
import { useAppContext } from "../Store/AppContext";
import PageHeader from "../PageHeader";
import ButtonChucNang from "./ButtonChucNang";
import ButtonMenu from "./ButtonMenu";
import DanhMucDuocKPModal from "./Modal/DanhMucDuocKPModal";

function Duoc() {

    const { site, area } = useAppContext();

    const [headerTitle, setHeaderTitle] = useState('Dược | Tồn kho - tổng hợp');

    const [selectedMenu, setSelectedMenu] = useState({ id: 'tonkho_tonghop', name: 'Tồn kho - tổng hợp' })

    const [showDMDuocKP, setShowDMDuocKP] = useState(false);
    const [inventoryType, setInventoryType] = useState('tonkho_tonghop');


    const menuData = [
        { id: 'tonkho_tonghop', name: 'Tồn kho - Tổng hợp' },
        { id: 'tonkho_chitiet', name: 'Tồn kho - Chi tiết' },
        { id: 'tontutruc_tonghop', name: 'Tồn tủ trực - Tổng hợp' },
        { id: 'tontutruc_chitiet', name: 'Tồn tủ trực - Chi tiết' },
        // { id: 'tonkho_ketoa_bhyt', name: 'Tồn kho - kê toa BHYT' },
        // { id: 'tonkho_ketoa_nhathuoc', name: 'Tồn kho - kê toa NT' },
        // { id: 'tonkho_tonbhyt', name: 'Tồn BHYT' }
    ]

    useEffect(() => {
        document.title = selectedMenu.name;
        setHeaderTitle('Dược | ' + selectedMenu.name);
    }, [selectedMenu.id])

    return (
        <>
            <div className="w-full flex flex-col">
                <PageHeader title={headerTitle} />
                {selectedMenu && (
                    <div className="overflow-hidden">
                        {selectedMenu.id === 'tonkho_tonghop' &&
                            <TonKho
                                menuData={menuData}
                                selectedMenu={selectedMenu}
                                setSelectedMenu={setSelectedMenu}
                            />}
                        {selectedMenu.id === 'tonkho_chitiet' &&
                            <TonKho
                                menuData={menuData}
                                selectedMenu={selectedMenu}
                                setSelectedMenu={setSelectedMenu}
                                isDetail
                            />}

                        {selectedMenu.id === 'tontutruc_tonghop' &&
                            <TonTuTruc
                                menuData={menuData}
                                selectedMenu={selectedMenu}
                                setSelectedMenu={setSelectedMenu}
                            />}
                        {selectedMenu.id === 'tontutruc_chitiet' &&
                            <TonTuTruc
                                menuData={menuData}
                                selectedMenu={selectedMenu}
                                setSelectedMenu={setSelectedMenu}
                                isDetail
                            />}
                    </div>
                )}
            </div>
            {showDMDuocKP &&
                <DanhMucDuocKPModal
                    site={site}
                    setShowModal={setShowDMDuocKP}
                />
            }
        </>
    )
}

export default Duoc;