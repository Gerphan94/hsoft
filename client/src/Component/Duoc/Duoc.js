import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import TonBHYT from "./TonBHYT";
import TonKho from "./TonKho";
import TonKhoKeToa from "./TonKhoKeToa";
import TonTheoKho from "./TonTheoKho";
import DMBD from "./DMBD";
import TonTuTruc from "./TonTuTruc";
import ButtonMenu from "../ButtonMenu";

function Duoc({ site }) {

    const [selectedOption, setSelectedOption] = useState({ id: 0, name: '' })

    const menuData = [
        { id: 'tonkho_ketoa_bhyt', name: 'Tồn kho - kê toa BHYT', borderTop: false },
        { id: 'tonkho_ketoa_nhathuoc', name: 'Tồn kho - kê toa NT', borderTop: false },
        { id: 'tonkho_tonbhyt', name: 'Tồn BHYT', borderTop: false },
        { id: 'tonkho_theokho', name: 'Tồn Theo kho', borderTop: false },
        { id: 'tontutruc', name: 'Tồn tủ trực', borderTop: true },
        { id: 'dmbd', name: 'Danh mục Dược', borderTop: true },
        { id: 4, name: 'Khác', borderTop: false }
    ]

    return (
        <>
            <div className="flex items-center">
                <div className="w-8">
                    <ButtonMenu data={menuData} setSelectedOption={setSelectedOption} />
                </div>
                <div className="font-bold text-lg uppercase">{selectedOption.name}</div>
            </div>
            <div>
                {selectedOption.id === 'tonkho_ketoa_bhyt' && <TonKhoKeToa site={site} type={'BHYT'} />}
                {selectedOption.id === 'tonkho_tonbhyt' && <TonBHYT site={site} />}
                {selectedOption.id === 'tonkho_theokho' && <TonTheoKho site={site} />}
                {selectedOption.id === 'tontutruc' && <TonTuTruc site={site} />}
                {selectedOption.id === 'dmbd' && <DMBD site={site} />}
            </div>
        </>
    )
}

export default Duoc;