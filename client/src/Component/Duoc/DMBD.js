import React, { useState } from "react";
import Dropdown from "../Dropdown";

function DMBD() {



    const primaryData = [
        { id: 'thuoc', name: 'Thuốc' },
        { id: 'vattu', name: 'Vật tư y tế' }
    ]



    const [primaryType, setPrimaryType] = useState({id:'thuoc', name:'Thuốc'})


    return(
        <>
        <div className="px-4 flex items-center gap-4">
            <div className="w-96">
            <Dropdown data = {primaryData} setSelectedOption={setPrimaryType} />

            </div>

            <div className="flex items-center gap-2">
                <div>Nhóm:</div>
                <Dropdown data = {primaryData} setSelectedOption={setPrimaryType} />

                
            </div>
            <div className="flex items-center gap-2">
                <div>Loại:</div>
                <Dropdown data = {primaryData} setSelectedOption={setPrimaryType} />

                
            </div>

        </div>

        
        </>
    )
}

export default DMBD;