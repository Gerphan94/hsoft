import React, { useEffect, useState } from "react";
// ---
import Pagination from "../Common/Pagination";
import ItemComponent from "./TableIconComponent";
// --
import { FaBottleDroplet } from "react-icons/fa6";
import { TbCircleLetterK } from "react-icons/tb";
import { GiPoisonBottle } from "react-icons/gi";
import { GoReport } from "react-icons/go";
import { IoMdWarning } from "react-icons/io";
// --
function InventoryTableDetail({ data, setIsShowModal, setSelectedPharmarId }) {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;
    const [totalPage, setTotalPage] = useState(1);
    const [dataInPage, setDataInPage] = useState([]);

    const formatDateString = (dateString) => {
        if (!dateString || dateString.length !== 6) {
          return dateString;
        }
        const day = dateString.slice(0, 2);   
        const month = dateString.slice(2, 4);  
        const year = '20' + dateString.slice(4, 6); 
      
        return `${day}/${month}/${year}`;
      };

    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }

    useEffect(() => {
        console.log('rending when change data')
        setDataInPage(constDataInPage(1, data));
        setTotalPage(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    useEffect(() => {
        console.log('rending when change page', currentPage)
        setDataInPage(constDataInPage(currentPage, data));

    }, [currentPage]);

    const onClickPharmar = (pharmarid) => {
        setSelectedPharmarId(pharmarid);
        setIsShowModal(true);
    }
    return (
        <>
            <div className="mt-2 w-full  flex flex-col py-2 min-h-[300px]" >
                <div className="overflow-x-auto overflow-y-hidden">
                    <table >
                        <thead className="sticky top-0 z-100">
                            <tr>
                                <th className=""></th>
                                <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>
                                <th className="w-24"><div className="">Mã BD</div></th>
                                <th className="w-[400px]"><div>Tên BD</div></th>
                                <th><div className="w-36">Hoạt chất</div></th>
                                <th><div className="text-left w-20">DVD</div></th>
                                <th><div className="w-28">Đường dùng</div></th>
                                <th><div className="w-18">BHYT</div></th>
                                <th><div className="w-28">Lô</div></th>
                                <th><div className="text-right w-20">Hạn dùng</div></th>
                                <th><div className="text-right w-20">Tồn đầu</div></th>
                                <th><div className="text-right w-20">Nhập</div></th>
                                <th><div className="text-right w-20">Xuất</div></th>
                                <th><div className="text-right w-20">Tồn cuối</div></th>

                                {/* <th><div className="text-center w-20">TồnBH</div></th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {data.length === 0 && <tr><td colSpan={15} className="text-center bg-gray-200 py-1">Không có kết quả</td></tr>}

                            {dataInPage.map((item, index) => (
                                <tr key={item.stt} className="even:bg-gray-100 hover:bg-blue-200 text-sm" >
                                    <td>
                                        <div className="flex items-center gap-0.5 px-1 py-1">
                                            {item.dalieu === 1 && <FaBottleDroplet className="text-green-700" />}
                                            {item.duocbvid === 3 && <TbCircleLetterK className="text-red-700" />}
                                            {item.adr === 1 && <GiPoisonBottle className="text-purple-700" />}
                                            {item.adrcao === 1 && <GiPoisonBottle className="text-red-700" />}
                                            {item.bienban === 1 && <GoReport className="text-blue-700" />}
                                            {item.luuy && <IoMdWarning className="text-[#FD8B51]" />}
                                        </div>
                                    </td>
                                    <td className="text-center">{currentPage * itemsPerPage - itemsPerPage + index + 1}</td>
                                    <td className="text-left">{item.mabd}</td>
                                    <td
                                        className="text-left hover:underline hover:text-blue-600"
                                    >
                                        <div className="flex gap-1 items-center">
                                            <div className="mr-2">
                                                <ItemComponent dvt={item.dvt} />
                                            </div>
                                            <div
                                                className="px-2 py-0.5 truncate ..."
                                                onClick={() => onClickPharmar(item.id)}

                                            > {item.tenbd}
                                                {item.sluongdvbsd > 0 ? <span className="italic text-zinc-500"> ({item.sluongdvbsd} {item.dvd})</span> : ''}
                                            </div>
                                            {/* <span className="italic text-zinc-500">{item.tenhc}</span> */}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="w-28 text-left truncate ...">
                                            {item.tenhc}
                                        </div>
                                    </td>
                                    <td className="text-left">{item.dvd}</td>
                                    <td>
                                        <div className="w-28 text-left truncate ...">
                                            {item.dd_count} - {item.duongdung}
                                        </div>
                                    </td>
                                   
                                    <td>{item.bhyt}</td>
                                    <td className="text-right">{item.losx}</td>
                                    <td className="text-center">{formatDateString(item.handung)}</td>
                                    <td className="text-right px-1">{Number(item.tondau).toLocaleString('en-US')}</td>
                                    <td className="text-right px-1">{Number(item.slnhap).toLocaleString('en-US')}</td>
                                    <td className="text-right px-1">{Number(item.slxuat).toLocaleString('en-US')}</td>
                                    <td className={`text-right px-1 pr-2 ${item.toncuoi === 0 ? 'text-red-500 font-bold' : ''}`}>{Number(item.toncuoi).toLocaleString('en-US')}</td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                />
            </div >

        </>
    )


}
export default InventoryTableDetail;