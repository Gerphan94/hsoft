import React, { useEffect, useState } from "react";

import moment from "moment";


function PhieuCongKhaiModal({ site, selected, setModalShow }) {


    const apiURL = process.env.REACT_APP_API_URL;

    const [danhsachPhieu, setDanhsachPhieu] = useState([]);




    const fetchDanhSach = async () => {
        const fetchUrl = apiURL + "emr/pck-thuocll/" + site + "/" + selected.pid
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setDanhsachPhieu(data);
    }

    useEffect(() => {
        const fetchDanhSach = async () => {
            const fetchUrl = apiURL + "emr/pck-thuocll/" + site + "/" + selected.pid
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setDanhsachPhieu(data);
        };
        fetchDanhSach();
    }, [selected.pid]);



    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            PHIẾU CÔNG KHAI {selected.mavv}
                        </div>
                        {/* BODY */}
                        <div className="flex h-full p-4 overflow-hidden ">
                            <div className="w-1/3 flex-grow h-full text-left overflow-y-auto ">
                                <div className="p-2">
                                    COl1
                                </div>
                            </div>
                            <div className="w-2/3 h-full">
                                <div className="mt-2 flex-grow px-4 w-full h-full overflow-y-auto my-4" >
                                    COL2
                                </div>
                            </div>





                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">


                            <button
                                type="button"
                                onClick={() => setModalShow(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default PhieuCongKhaiModal;

