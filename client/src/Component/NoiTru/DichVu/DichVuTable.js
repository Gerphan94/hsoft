import React, { } from "react";
import { SiOxygen } from "react-icons/si";
import { GiTestTubes } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";

function DichvuTable({ data = [] }) {
    return (
        <>
            <div className="mt-2 flex-grow w-full h-full overflow-x-scroll text-sm" >
                <table >
                    <thead>
                        <tr>
                            <th>...</th>
                            <th className="text-center w-10"><div className=" py-1 text-center">STT</div></th>
                            <th className="w-32"><div className="">Đối tượng</div></th>
                            <th className="w-[450px]"><div className="">Dịch vụ</div></th>
                            <th><div className="text-right px-2">Đơn giá</div></th>
                            <th className="w-20">Số lượng</th>
                            <th className="w-40"><div>Ngày</div></th>
                            {/* <th className="w-40"> <div>Ngày dự kiến</div></th> */}
                            <th className="w-40"><div className="text-center">Số phiếu</div></th>
                            <th><div className="text-center w-[300px]">Bệnh phẩm</div></th>
                            <th><div className="text-center]">IDDIENBIEN</div></th>
                            <th><div className="text-center]">...</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className={`${item.madoituong === 3 ? 'text-orange-500' : ''}`}>
                                <td>

                                </td>
                                <td className="text-center w-10"><div className=" py-1 text-center">{index + 1}</div></td>
                                <td className=""><div className="">{item.doituong}</div></td>
                                <td className="text-left">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            {item.idnhom === 20 ?
                                                <MdBloodtype className="text-red-500" /> : 
                                                item.idnhom === 7 ? <SiOxygen className="text-blue-500" /> : 
                                                <GiTestTubes className="text-green-500" />
                                                }
                                        </div>
                                        {item.idnhom} - {item.tendichvu}
                                    </div>
                                </td>
                                <td><div className="text-right px-2">{Number(item.dongia).toLocaleString()}</div></td>
                                <td><div>{item.soluong}</div></td>
                                <td className=""><div>{item.ngayylenh}</div></td>
                                {/* <td><div>{item.ngaythuchien}</div></td> */}
                                <td><div className="text-center">{item.maphieu}</div></td>
                                <td><div className="text-left">{item.benhpham}</div></td>
                                <td><div className="text-center">{item.iddienbien}</div></td>
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