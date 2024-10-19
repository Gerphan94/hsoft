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
import ButtonMenu from "./ButtonMenu";

function Duoc() {

    console.count('fetching Dược')

    const { site } = useAppContext();

    const [selectedMenuId, seSelectedMenuId] = useState('')

    const menuData = [
        { id: 'tonkho_theokho', name: 'Tồn Theo kho' },
        { id: 'tontutruc', name: 'Tồn tủ trực' },
        { id: 'tonkho_ketoa_bhyt', name: 'Tồn kho - kê toa BHYT' },
        { id: 'tonkho_ketoa_nhathuoc', name: 'Tồn kho - kê toa NT' },
        { id: 'tonkho_tonbhyt', name: 'Tồn BHYT' }
    ]

    return (
        <>

            {/* <SideMenu site={site} setSite={setSite} selectedMenu='duoc' /> */}
            <div className="w-full flex flex-col">
                <PageHeader title="Dược" >
                    <>
                        {menuData.map((item) => (
                            <button
                                key={item.id}
                                className={`border px-2 py-0.5 ${selectedMenuId === item.id ? 'bg-[#55679C]' : 'bg-[#7C93C3]'}  text-white hover:bg-[#55679C]`}
                                onClick={() => seSelectedMenuId(item.id)}

                            >{item.name}</button>
                        ))}
                    </>

                </PageHeader>
                {/* <div className="px-4 py-2 text-left flex gap-4 border-b shadow-md">
                        <div className="text-xl font-medium">Dược</div>
                        <div>
                            {menuData.map((item) => (
                                <button
                                    key={item.id}
                                    className={`border px-2 py-1 ${selectedMenuId === item.id ? 'bg-[#55679C]' : 'bg-[#7C93C3]'}  text-white hover:bg-[#55679C]`}
                                    onClick={() => seSelectedMenuId(item.id)}

                                >{item.name}</button>
                            ))}
                        </div>

                    </div> */}
                <div className="overflow-hidden">
                    {selectedMenuId === 'tonkho_ketoa_bhyt' && <TonKhoKeToa site={site} type={'BHYT'} />}
                    {selectedMenuId === 'tonkho_tonbhyt' && <TonBHYT site={site} />}
                    {selectedMenuId === 'tonkho_theokho' && <TonTheoKho site={site} />}
                    {selectedMenuId === 'tontutruc' && <TonTuTruc site={site} />}
                    {selectedMenuId === 'dmbd' && <Dmbd site={site} />}
                </div>

            </div>
        </>
    )
}

export default Duoc;