import React from "react";
import { FaBottleDroplet, FaJar } from "react-icons/fa6";
import { CiPill } from "react-icons/ci";
import { TbCircleLetterK } from "react-icons/tb";

import { LiaBatteryEmptySolid, LiaBatteryFullSolid, LiaBatteryHalfSolid } from "react-icons/lia";
import { FcFilingCabinet, FcHome, FcViewDetails } from "react-icons/fc";
function TableCheckTon( {data} ) {
    return (
        <>
            <div className="w-full px-4">
                <table className=" text-sm w-[1600px]">
                    <thead className="sticky top-0 z-80">
                        <tr className="bg-gray-200 font-normal text-[#102C57] font-thick ">
                            <th className="w-16"></th>
                            <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>
                            {/* <th className="text-center w-20"><div>Mã</div></th> */}
                            <th className="w-96"><div className="text-left">Mã - Tên</div></th>
                            <th className="w-56"><div className="text-left">Hoạt chất</div></th>
                            <th className="w-10"><div className="text-center">ĐVT</div></th>
                            <th className="w-10"><div className="text-center">ĐVD</div></th>
                            {/* <th className="w-10"><div className="text-center w-10">BHYT</div></th> */}
                            <th className="w-20"><div className="text-center">S.Lần/ngày</div></th>
                            <th className="w-20"><div className="text-center">SL/Lần</div></th>
                            <th className="w-20"><div className="text-center">Số lượng</div></th>

                            <th className="w-20"><div className="text-center">Tồn đầu</div></th>
                            <th className="w-20"><div className="text-center">Tồn cuối</div></th>
                            <th className="w-20"><div className="text-center">SLYC</div></th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((detail, index) => (
                            <tr key={index} className="even:bg-gray-100">
                                <td>
                                    <div className="flex items-center gap-0.5 py-1">
                                        <span>
                                            {detail.dalieu === 1 ?
                                                <FaBottleDroplet className="text-green-700" /> :
                                                <CiPill className="text-red-700" />
                                            }
                                        </span>

                                        <span>
                                            {detail.bhyt === 0 ?
                                                <LiaBatteryEmptySolid className="text-red-700" /> :
                                                detail.bhyt === 100 ?
                                                    <LiaBatteryFullSolid className="text-green-700" /> :
                                                    <LiaBatteryHalfSolid className="text-orange-700" />
                                            }
                                        </span>
                                        <span>
                                            {detail.nhombo === 3 ?
                                                <TbCircleLetterK className="text-orange-700" /> :
                                                <TbCircleLetterK className="text-transparent" />

                                            }
                                        </span>
                                    </div>
                                </td>
                                <td className="text-center py-1">{detail.stt}</td>
                                {/* <td className="border-l px-2 text-left py-1">{detail.ma_mau}</td> */}
                                <td className="border-l px-2 text-left">
                                    <div className="inline-block">
                                        <p>{detail.tenbd_mau}</p>
                                    </div>
                                </td>
                                <td className="text-left border-l px-2">{detail.tenhc_mau}</td>
                                <td className=""><div className="border-l">{detail.dang}</div></td>
                                <td className="">{detail.donvidung}</td>
                                {/* <td className=""><div className="border-l">{detail.bhyt}</div></td> */}
                                <td><div className="border-l">{detail.solan}</div></td>
                                <td>{detail.lan}</td>
                                <td>{detail.soluong}</td>
                                <td><div className="border-l">{detail.tondau}</div></td>
                                <td>{detail.tondau}</td>
                                <td>{detail.slyeucau}</td>
                             
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )


}
export default TableCheckTon;