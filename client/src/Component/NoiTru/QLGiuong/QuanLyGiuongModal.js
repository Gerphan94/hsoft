import React, { useState, useEffect, forwardRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FcFolder, FcInTransit, FcCalculator, FcApproval } from "react-icons/fc";
import { SuccessAlert } from "../../Common/Alert";

function QuanLyGiuongModal({ site, setShowModal, khoa }) {

    const apiURL = process.env.REACT_APP_API_URL
    const [data, setData] = useState([]);

    const fetchGiuong = async () => {
        try {
            const response = await fetch(`${apiURL}noitru/quanlygiuong?site=${site}&makp=${khoa.id}`);
            const data = await response.json();
            console.log('data', data)

            setData(data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    useEffect(() => {
        fetchGiuong();
    }, []);

    return (
        <>
            <div className=" fixed inset-0 z-[100] outline-none focus:outline-none p-10 pb-20 w-screen h-screen">
                <div className="relative top-20 w-3/4 h-2/3 mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        <div className="w-full text-left text-lg font-bold border-b-black px-4 py-1 bg-[#9BB0C1] select-none">
                            Quản lý giường
                        </div>
                        <div className="h-full grid grid-cols-5 gap-4 px-4 py-10 overflow-y-auto">
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    data-id={item.id}
                                    status-id={item.tinhtrang}
                                    className={`flex flex-col flex-grow justify-between border rounded-md  text-left p-3 select-none border-[#608BC1] hover:bg-[#608BC1] `}>

                                    <div className="text-center">{item.tenphong}/{item.mabh} - {item.tengiuong}</div>
                                    <div>

                                        <div className="text-center font-medium">{item.mabn}</div>
                                        <div className="text-center font-bold">{item.hoten}</div>
                                    </div>
                                    <div className="text-center">
                                    <span className="text-center bg-[#608BC1]">{item.codegiuongnt}</span>

                                        </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="w-full flex gap-4 items-center justify-end px-4 py-2 bg-[#f5f5f5] relative">
                        <button
                            className="btn btn-view"

                        >
                            Xem
                        </button>

                        <button
                            className="btn btn-close"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>


            <div className="w-screen h-screen opacity-75 fixed inset-0 z-[90] bg-black"></div>

        </>
    )
}

export default QuanLyGiuongModal;