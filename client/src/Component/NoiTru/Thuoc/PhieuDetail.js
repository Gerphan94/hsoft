import React, { useEffect, useState } from "react";
import Dausinhton from "./Dausinhton";
import moment from "moment";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import ChiTietThuocComponent from "./ChiTietThuocComponent";


function PhieuDetail({ selectedCoupon, detail, data, couponType }) {

    console.log(detail)
    const [tabNumber, setTabNumber] = useState(1);
    const [showChandoan, setShowChandoan] = useState(false);
    const mutileLineChandoan = (cd) => {
        if (!cd) {
            return ''
        }
        return cd.split(';').join(';\n')
    }

    return (
        <>
            <div className="">
                <div className="flex justify-between border bg-white ">
                    <div className="px-2 py-1">
                        <strong>{selectedCoupon.name} </strong>
                        ( <i>{selectedCoupon.id}</i> )
                        </div>

                    <div className="flex">
                        <button
                            className={`px-2 py-0.5 hover:bg-blue-300 hover:text-white ${tabNumber === 1 ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => setTabNumber(1)}
                        >Chi tiết</button>
                        <button
                            className={`px-2 py-0.5 hover:bg-blue-300 hover:text-white ${tabNumber === 2 ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => setTabNumber(2)}
                        >Thông tin xuất</button>
                    </div>
                </div>

                {/* CHẨN ĐOÁN */}
                <div className=" mt-2 border rounded-md text-sm ">
                <div className="flex justify-between text-left bg-slate-300 px-2 py-1">
                    <div className="w-full ">
                        <label className="w-24 text-left inline-block">ICD:</label>
                        <input type="text" className="w-1/3 border outline-none px-0.5 py-0.5" readOnly={true} value={detail && detail.maicd} />
                    </div>
                    <span className="flex items-center w-10">
                        {showChandoan ?
                            <FaAngleUp className="size-5" onClick={() => setShowChandoan(false)} />
                            :
                            <FaAngleDown className="size-5" onClick={() => setShowChandoan(true)} />}

                    </span>
                </div>
                {showChandoan &&
                    <div className={`w-full flex gap-2 border bg-[#F7FBFF] p-2 transform transition-all duration-300 ease-in-out 
                            ${showChandoan ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <label className="w-32 text-left inline-block select-none">Chẩn đoán:</label>
                        <textarea
                            type="text"
                            className="w-full h-24 border outline-none p-1"
                            readOnly={true}
                            value={detail && mutileLineChandoan(detail.chandoan)}
                        />
                        <div className='w-[450px]  p-2 text-left border rounded-md '>
                            <div className="table w-full">
                                <div className="table-row">
                                    <div className="table-cell w-20">Mạch: </div>
                                    <input type="text" className="w-full border outline-none px-0.5 py-0.5 text-xs" readOnly={true} value={detail && detail.dst && detail.dst.mach} />
                                    <div className="table-cell w-20 pl-2">Nhịp thở: </div>
                                    <input type="text" className="w-full border outline-none px-0.5 py-0.5 text-xs" readOnly={true} value={detail && detail.dst && detail.dst.nhiptho} />

                                </div>
                                <div className="table-row">
                                    <div className="table-cell">Nhiệt độ: </div>
                                    <input type="text" className="w-full border outline-none px-0.5 py-0.5 text-xs" readOnly={true} value={detail && detail.dst && detail.dst.nhietdo} />

                                    <div className="table-cell pl-2">Cân nặng: </div>
                                    <input type="text" className="w-full border outline-none px-0.5 py-0.5 text-xs" readOnly={true} value={detail && detail.dst && detail.dst.cannang} />

                                </div>
                                <div className="table-row">
                                    <div className="table-cell">Huyết áp: </div>
                                    <input type="text" className="w-full border outline-none px-0.5 py-0.5 text-xs" readOnly={true} value={detail && detail.dst && detail.dst.huyetap} />

                                    <div className="table-cell pl-2">Chiều cao: </div>
                                    <input type="text" className="w-full border outline-none px-0.5 py-0.5 text-xs" readOnly={true} value={detail && detail.dst && detail.dst.chieucao} />

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            </div>
            <div className="border rounded-md mt-4">
                {detail && detail.thuoc.map((item) => (
                    <ChiTietThuocComponent
                        key={item.stt_index}
                        item={item}
                        couponType={couponType} />

                ))}
            </div>
        </>
    )
}

export default PhieuDetail;