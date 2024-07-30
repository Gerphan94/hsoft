import React from "react";
import styles from "../styles.module.css"

function DSGoi({ setModalShow }) {


    const title = 'Danh sách bệnh nhân có gói khám';

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative flex flex-col justify-between lg:w-1/3 md:w-2/3 top-1/6 w-full my-6 mx-auto max-w-3xl bg-white h-3/4">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {title}
                        </div>

                        {/* BODY */}
                        <div className="">
                            <div>

                            </div>
                            <div>
                                
                            </div>
                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative  bottom-0">
                            <button
                                className={`${styles.btn} ${styles.btnClose}`}
                                type="button"
                                onClick={() => setModalShow(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default DSGoi;

