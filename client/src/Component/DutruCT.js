import React, { useState, useEffect } from "react";


function DutruCT({ data }) {
    const mabn = data.mabn;
    const hoten = data.hoten;
    const thuoc = data.thuoc;

    return (
        <>
            <div className="mb-4">
                <div className="text-left flex gap-4 bg-blue-100 px-4">
                    <div>{mabn}</div>
                    
                     <div className="font-bold">{hoten}</div>
                </div>

                {thuoc.map((ele, index) =>
                    <div className="p-1">
                        <div className="border p-2">
                            <div className="flex gap-2 justify-between">
                                <div className="flex gap-2">
                                    <div>{ele.stt}</div>
                                    <div> {ele.mathuoc}</div>
                                    <div className="font-bold"> {ele.tenthuoc}</div>
                                    {ele.dalieu === 1 &&
                                    <div className="italic text-red-500 font-bold">Đa liều</div>
                                    }
                                    
                                </div>
                                <div className="text-sm rounded-xl bg-green-600 px-2 py-0.5 text-white"> {ele.doituong}</div>
                            </div>
                            <div className="flex gap-2 justify-between">
                                <div className="flex gap-2">
                                    <div>Đơn giá: {ele.dongia} |</div>
                                    <div>SLYC: {ele.slyc}</div>

                                </div>
                                <div> {ele.tenkho}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div >


        </>
    )
}

export default DutruCT;