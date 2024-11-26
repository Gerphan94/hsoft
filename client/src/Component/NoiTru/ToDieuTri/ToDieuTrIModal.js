import React, { useEffect, useState } from "react";
import styles from "../../styles.module.css"

import moment from "moment";
import DienBienTable from "./DienBienTable";
function ToDieuTriModal({ site, selected, setModalShow }) {

    const title = 'DIỄN BIẾN';

    const apiURL = process.env.REACT_APP_API_URL
    const [dienbiens, setDienbiens] = useState([]);

    const fetchDienBien = async () => {
        // const fetchUrl = apiURL + "emr/dienbien/" + site + "/" + selected.maql;
        const fetchUrl = `${apiURL}tdt/dienbien-benhnhan-by-idkhoa?site=${site}&idkhoa=${selected.idkhoa}`
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setDienbiens(data);
    }


    useEffect(() => {
        fetchDienBien();
    }, [selected.idkhoa]);

    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between flex-grow">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {title} | {selected.pid} | {selected.pname}
                        </div>
                        {/* BODY */}
                        <div className="h-full p-4 overflow-y-auto">
                            <DienBienTable dienbiens={dienbiens} />

                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button className="btn btn-view">Xem</button>

                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={() => setModalShow(false)}
                            >Đóng</button>
                        </div>
                    </div>



                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default ToDieuTriModal;

