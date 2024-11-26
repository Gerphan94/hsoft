import React from "react";

import moment from "moment";
import TheoDoiKhangSinhThuoc from "./TheoDoiKhangSinhThuoc";
function TheoDoiKhangSinhComponent({ data }) {


    return (
        <>
            <div className="px-2 py-1 flex text-left font-bold ">
                <span className="border px-2 py-1 rounded-lg select-none bg-[#384B70] text-white">{data.tenkhoa}</span>
                
                </div>
            <div className="w-full table pl-10 py-2">
                {data && data.partients && data.partients.map((item) => (
                    <>
                        <div className="flex items-center border-b bg-[#EEF7FF]">
                            <div className="px-2 py-1 text-left font-bold">{item.mabn}</div>
                            <div className="px-2 text-left font-bold">{item.hoten}</div>
                            <div className="px-2">{item.phacdo}</div>
                            <div className="px-2">{item.giaidoan}</div>
                            <div className="px-2">{moment(item.ngaybatdau).format('DD/MM/YYYY')}</div>
                            <div className="px-2">{item.ngayketthuc && moment(item.ngayketthuc).format('DD/MM/YYYY')}</div>
                            <div className="px-2">{item.songaydieutri}</div>
                        </div>
                        <div className="pl-10 py-2">
                            <TheoDoiKhangSinhThuoc medicines={item.detail} />
                        </div>
                    </>
                ))}
            </div>





        </>
    )





}

export default TheoDoiKhangSinhComponent;