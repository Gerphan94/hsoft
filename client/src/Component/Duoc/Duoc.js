import React, { useState, useEffect } from "react";
import Dropdown from "../Common/Dropdown";

import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";
import TonKhoKeToa from "./TonKhoKeToa";
import TonKhoTongHop from "./TonKhoTongHop";
import Dmbd from "./Dmbd";
import TonTuTrucTongHop from "./TonTuTrucTongHop";
import SideMenu from "../SideMenu";
import { useAppContext } from "../Store/AppContext";
import PageHeader from "../PageHeader";
import ButtonChucNang from "./ButtonChucNang";
import ButtonMenu from "./ButtonMenu";
import DanhMucDuocKPModal from "./Modal/DanhMucDuocKPModal";

function Duoc() {

    const { site, area } = useAppContext();

    const [selectedMenu, setSelectedMenu] = useState({ id: 'tonkho_tonghop', name: 'Tồn kho - tổng hợp' })

    const [showDMDuocKP, setShowDMDuocKP] = useState(false);

    const menuData = [
        { id: 'tonkho_tonghop', name: 'Tồn kho - tổng hợp' },
        { id: 'tonkho_chitiet', name: 'Tồn kho - chi tiết' },
        { id: 'tontutruc_tonghop', name: 'Tồn tủ trực - tổng hợp' },
        { id: 'tonkho_ketoa_bhyt', name: 'Tồn kho - kê toa BHYT' },
        { id: 'tonkho_ketoa_nhathuoc', name: 'Tồn kho - kê toa NT' },
        { id: 'tonkho_tonbhyt', name: 'Tồn BHYT' }
    ]

    useEffect(() => {
        document.title = selectedMenu.name;
    }, [selectedMenu.id])

    return (
        <>
            <div className="w-full flex flex-col">
                <PageHeader title="Dược" />
                <div className="overflow-hidden">
                    {selectedMenu && selectedMenu.id === 'tonkho_ketoa_bhyt' && <TonKhoKeToa site={site} />}
                    {selectedMenu && selectedMenu.id === 'tonkho_tonbhyt' && <TonBHYT site={site} />}
                    {selectedMenu && selectedMenu.id === 'tonkho_tonghop' && <TonKhoTongHop menuData={menuData} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />}
                    {selectedMenu && selectedMenu.id === 'tontutruc_tonghop' && <TonTuTrucTongHop menuData={menuData} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />}
                    {selectedMenu && selectedMenu.id === 'dmbd' && <Dmbd site={site} />}
                </div>

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