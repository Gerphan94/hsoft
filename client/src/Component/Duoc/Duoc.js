import React, { useState, useEffect } from "react";
import Dropdown from "../Common/Dropdown";

import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";
import TonKhoKeToa from "./TonKhoKeToa";
import TonTheoKho from "./TonTheoKho";
import Dmbd from "./Dmbd";
import TonTuTruc from "./TonTuTruc";
import ButtonMenu from "../ButtonMenu";
import SideMenu from "../SideMenu";
import { useAppContext } from "../Store/AppContext";

function Duoc() {

    const [site, setSite] = useState(localStorage.getItem('site'));
    console.log('fetching Dược')


    const [selectedOption, setSelectedOption] = useState({ id: 'tonkho_theokho', name: 'Tồn Theo kho' })

    // const menuData = [
    //     { id: 'tonkho_ketoa_bhyt', name: 'Tồn kho - kê toa BHYT'},
    //     { id: 'tonkho_ketoa_nhathuoc', name: 'Tồn kho - kê toa NT'},
    //     { id: 'tonkho_tonbhyt', name: 'Tồn BHYT'},
    //     { id: 'tonkho_theokho', name: 'Tồn Theo kho'},
    //     { id: 'tontutruc', name: 'Tồn tủ trực', borderTop: true },
    //     { id: 'dmbd', name: 'Danh mục Dược', borderTop: true },
    //     { id: 4, name: 'Khác'}
    // ]
    const menuData = [
        { id: 'tonkho_theokho', name: 'Tồn Theo kho' },
        { id: 'tontutruc', name: 'Tồn tủ trực' },
        { id: 'tonkho_ketoa_bhyt', name: 'Tồn kho - kê toa BHYT' },
        { id: 'tonkho_ketoa_nhathuoc', name: 'Tồn kho - kê toa NT' },
        { id: 'tonkho_tonbhyt', name: 'Tồn BHYT' }
    ]

    return (
        <>
            <div className="min-h-screen flex overflow-hidden">
                <SideMenu site={site} setSite={setSite} selectedMenu='duoc' />
                <div className="w-full flex flex-col overflow-hidden">
                    <div className="w-full h-12 bg-gray-50 border-b flex items-center p-2">
                        <div className="w-64">
                            <Dropdown
                                data={menuData}
                                setSelectedOption={setSelectedOption}
                                selectedOption={selectedOption}
                            />
                        </div>

                    </div>
                    <div className="overflow-hidden">
                        {selectedOption.id === 'tonkho_ketoa_bhyt' && <TonKhoKeToa site={site} type={'BHYT'} />}
                        {selectedOption.id === 'tonkho_tonbhyt' && <TonBHYT site={site} />}
                        {selectedOption.id === 'tonkho_theokho' && <TonTheoKho site={site} />}
                        {selectedOption.id === 'tontutruc' && <TonTuTruc site={site} />}
                        {selectedOption.id === 'dmbd' && <Dmbd site={site} />}
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default Duoc;