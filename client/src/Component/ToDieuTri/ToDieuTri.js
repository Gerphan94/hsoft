import React, { useState, useEffect } from "react";

import PageHeader from "../PageHeader";
import { useAppContext } from "../Store/AppContext";

function ToDieuTri() {

    const apiURL = process.env.REACT_APP_API_URL;

    const { site, setSelectedSideBar } = useAppContext();

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: null, name: '' });
    const [hiendiens, setHiendiens] = useState([]);
    const [viewData, setViewData] = useState([]);

    const [selected, setSelected] = useState({ pid: null, pname: '', idkhoa: '', maql: '' , mavv:'', ngayvk:'' });

    
   
    return (
        <>
            <div className="w-full flex flex-col">
                <PageHeader title="Tờ điều trị" >
                </PageHeader>


                
            </div>



        </>
    )
}

export default ToDieuTri;