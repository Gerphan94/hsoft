import React, { useState, useEffect, forwardRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles.module.css"


function DanhSachPhieuModal({ site, setShowModal }) {

    const apiURL = process.env.REACT_APP_API_URL
    const [selecDate, setSelecDate] = useState(new Date());

    return (
        <>
            <div className=" fixed inset-0 z-50 outline-none focus:outline-none p-10 pb-20 w-screen h-screen">
                <div className="relative top-20 w-1/2 h-2/3 mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        <div className="w-full text-left text-lg font-bold border-b-black px-4 py-1 bg-[#9BB0C1]">
                            Danh sách phiếu
                        </div>
                        <div className="h-full flex flex-col justify-between p-4">
                            <div className="flex gap-1">
                                <div className="">
                                    <label className="">Ngày:</label>
                                    <DatePicker
                                        className="w-32 border px-2 py-1 ml-2 text-center outline-none "
                                        name='fromDate'
                                        id='fromDate'
                                        dateFormat="dd/MM/yyyy"
                                        selected={selecDate}
                                        onChange={(date) => setSelecDate(date)}
                                    />
                                   
                                </div>
                                <button className="btn-view ml-10">Xem</button>
                            </div>
                        </div>

                    </div>
                    <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">

                        <button
                            className={`${styles.btn} ${styles.btnClose}`}
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>




            </div>

            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default DanhSachPhieuModal;