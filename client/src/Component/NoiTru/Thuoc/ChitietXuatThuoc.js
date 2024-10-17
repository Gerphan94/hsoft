import React, { useEffect, useState } from "react";
import Dausinhton from "./Dausinhton";
import moment from "moment";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";



function ChitietXuatThuoc({  thucxuat }) {




    return (
        <>
            <div className="text-left">
                <div>THÔNG TIN XUẤT</div>
                <div className="">
                    <div>Thực xuất:</div>
                    <table className="text-sm">
                        <thead>
                            <tr>
                                <th className="text-center w-10"><div className=" py-1 text-center">STT</div></th>
                                <th className=""><div className="">Tên Thuốc</div></th>
                                <th className=""><div>Đối tượng</div></th>
                                <th className=""><div className="text-center">Số lượng</div></th>
                                <th className=""><div className="text-center">Lô SX</div></th>
                                <th className=""><div className="text-center">Hạn dùng</div></th>
                                <th className=""><div className="text-center">Giá bán 1</div></th>
                                <th className=""><div className="text-center">Giá bán 1</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {thucxuat.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center w-10"><div className=" py-1 text-center">{index + 1}</div></td>
                                    <td className=""><div className="">{item.ten_hamluong}</div></td>
                                    <td className=""><div className="">{item.doituong}</div></td>
                                    <td className=""><div className="text-center">{item.soluong}</div></td>
                                    <td className=""><div className="text-center">{item.losx}</div></td>
                                    <td className=""><div className="text-center">{moment(item.ngayhethan).format("DD/MM/YYYY")}</div></td>
                                    <td className=""><div className="text-center">{item.giaban}</div></td>
                                    <td className=""><div className="text-center">{item.giaban}</div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>


        </>
    )
}

export default ChitietXuatThuoc;