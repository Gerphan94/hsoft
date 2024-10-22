import React, { useState, useEffect, forwardRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles.module.css"


function DanhSachPhieuModal({ site, setShowModal }) {

    const apiURL = process.env.REACT_APP_API_URL

  


    return (
        <>
            <div className=" fixed inset-0 z-50 outline-none focus:outline-none p-10 pb-20 w-screen h-screen">
                <div className="relative w-full h-full mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        <div className="w-full text-left text-lg font-bold border-b-black px-4 py-1 bg-[#9BB0C1]">
                            Danh sách phiếu
                        </div>
                        <div className="h-full flex flex-col justify-between p-4">
                           
                          

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