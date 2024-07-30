import React, { useState, useEffect } from "react";

import ToaMau from "./ToaMau";
import ButtonMenu from "../ButtonMenu";

function ToDieuTri({ site }) {

    const [selectedOption, setSelectedOption] = useState({ id: 0, name: '' })

    const menuData = [
        { id: 'toamau', name: 'Toa mẫu', borderTop: false },

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
                {selectedOption.id === 'toamau' && <ToaMau site={site} />}

            </div>
        </>
    )
}

export default ToDieuTri;