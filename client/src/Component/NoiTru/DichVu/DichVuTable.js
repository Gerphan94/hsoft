import React, { useEffect, useState } from "react";
import { SiOxygen } from "react-icons/si";
import { GiTestTubes, GiMedicines } from "react-icons/gi";

function DichvuTable( { data=[] } ) {
    return (
        <>
            <div className="mt-2 flex-grow w-full h-full overflow-x-scroll" >
                <table >
                    <thead>
                        <tr>
                            <th>...</th>
                            <th className="text-center w-10"><div className=" py-1 text-center">STT</div></th>
                            <th className="w-20"><div className="">Đối tượng</div></th>
                            <th className="w-[450px]"><div className="">Dịch vụ</div></th>
                            <th className="w-20">Số lượng</th>
                            <th className="w-40"><div>Ngày</div></th>
                            {/* <th className="w-40"> <div>Ngày dự kiến</div></th> */}
                            <th className="w-40"><div className="text-center">Số phiếu</div></th>
                            <th><div className="text-center w-[300px]">Bệnh phẩm</div></th>
                            <th><div className="text-center]">Loại BA</div></th>
                            <th><div className="text-center]">...</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>

                                </td>
                                <td className="text-center w-10"><div className=" py-1 text-center">{index + 1}</div></td>
                                <td className="w-20"><div className="">{item.doituong}</div></td>
                                <td className="text-left">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                        <GiTestTubes className="size-3 text-blue-500"  />
                                        </div>
                                        {item.tendichvu}
                                        </div>
                                        </td>
                                <td><div>{item.soluong}</div></td>
                                <td className=""><div>{item.ngayylenh}</div></td>
                                {/* <td><div>{item.ngaythuchien}</div></td> */}
                                <td><div className="text-center">{item.maphieu}</div></td>
                                <td><div className="text-left">{item.benhpham}</div></td>
                                <td><div className="text-center">{item.loaiba}</div></td>
                                <td><div className="text-center">...</div></td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </>
    )
}


export default DichvuTable;