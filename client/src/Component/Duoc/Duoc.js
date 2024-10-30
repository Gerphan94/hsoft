import React, { useState, useEffect } from "react";
import Dropdown from "../Common/Dropdown";

import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";
import TonKhoKeToa from "./TonKhoKeToa";
import TonTheoKho from "./TonTheoKho";
import Dmbd from "./Dmbd";
import TonTuTruc from "./TonTuTruc";
import SideMenu from "../SideMenu";
import { useAppContext } from "../Store/AppContext";
import PageHeader from "../PageHeader";
import ButtonChucNang from "./ButtonChucNang";
import ButtonMenu from "./ButtonMenu";
import DanhMucDuocKPModal from "./Modal/DanhMucDuocKPModal";

function Duoc() {

    const { site, area } = useAppContext();

    const [selectedMenu, setSelectedMenu] = useState({id:'tonkho_theokho', name: 'Tồn Theo kho'})

    const [showDMDuocKP, setShowDMDuocKP] = useState(false);

    const menuData = [
        { id: 'tonkho_theokho', name: 'Tồn Theo kho' },
        { id: 'tontutruc', name: 'Tồn tủ trực' },
        { id: 'tonkho_ketoa_bhyt', name: 'Tồn kho - kê toa BHYT' },
        { id: 'tonkho_ketoa_nhathuoc', name: 'Tồn kho - kê toa NT' },
        { id: 'tonkho_tonbhyt', name: 'Tồn BHYT' }
    ]

    return (
        <>
            <div className="w-full flex flex-col">
                <PageHeader title="Dược" >
                    <>
                    <div className="flex">
                        <ButtonMenu
                            menuData={menuData}
                            selectedMenu={selectedMenu}
                            setSelectedMenu={setSelectedMenu}
                        />
                   
                        <ButtonChucNang
                        setShowDMDuocKP={setShowDMDuocKP}

                        
                        />
                    </div>
                        

                    </>

                </PageHeader>
                
                <div className="overflow-hidden">
                    {selectedMenu && selectedMenu.id === 'tonkho_ketoa_bhyt' && <TonKhoKeToa site={site} type={'BHYT'} />}
                    {selectedMenu && selectedMenu.id === 'tonkho_tonbhyt' && <TonBHYT site={site} />}
                    {selectedMenu && selectedMenu.id === 'tonkho_theokho' && <TonTheoKho site={site} />}
                    {selectedMenu && selectedMenu.id === 'tontutruc' && <TonTuTruc site={site} area={area}  />}
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