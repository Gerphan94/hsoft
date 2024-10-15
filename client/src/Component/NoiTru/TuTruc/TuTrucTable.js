import React, { useEffect, useState } from "react";
import { FaBottleDroplet, FaJar } from "react-icons/fa6";
import { CiPill } from "react-icons/ci";
import { TbCircleLetterK } from "react-icons/tb";
import { WiMoonAltFull, WiMoonAltFirstQuarter, WiMoonAltNew } from "react-icons/wi";
import { GiPoisonBottle } from "react-icons/gi";
import { GoReport } from "react-icons/go";
import Pagination from "../../Common/Pagination";

function TuTrucTable({ data }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [dataInPage, setDataInPage] = useState([]);

    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }

    useEffect(() => {
        setDataInPage(constDataInPage(currentPage, data));
        setTotalPage(Math.ceil(data.length / itemsPerPage));
    }, [currentPage, data]);

    return (
        <>

            <div className="w-full h-full flex flex-col space-y-2 overflow-y-auto text-md" >
                <table className="w-full">
                    <thead className="sticky top-0 z-100">
                        <tr>
                            <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>
                            <th className="w-24"><div className="">Mã BD</div></th>
                            <th className="w-[400px] text-left px-2"><div>Tên BD</div></th>
                            <th><div className="w-36">Hoạt chất</div></th>
                            <th><div className="text-left w-20">DVD</div></th>
                            <th><div className="w-28">Đường dùng</div></th>
                            <th><div className="w-28">ATC</div></th>
                            <th className="text-right w-20"><div >Tồn đầu</div></th>
                            <th className="text-right w-20"><div >Nhập</div></th>
                            <th className="text-right w-20"><div >Xuất</div></th>
                            <th className="text-right w-20"><div >Tồn cuối</div></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataInPage.map((item, index) => (
                            <tr key={item.mabd} className="even:bg-gray-100 hover:bg-blue-200" >
                                <td className="text-center">{(currentPage - 1) * 20 + (index + 1)}</td>
                                <td className="text-left">{item.mabd}</td>
                                <td className="text-left hover:underline hover:text-blue-600">
                                    <div className="flex gap-1 items-center">
                                        <div className="mr-2">
                                            {/* <ItemComponent dvt={item.dvt} /> */}
                                        </div>
                                        <div className="w-full truncate ..."> {item.tenbd}
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
                                        {item.duongdung}
                                    </div>
                                </td>
                                <td className="text-center">
                                    {item.maatc !== null && item.maatc !== undefined && item.maatc.trim() !== '' ?
                                        <div className={`${item.maatc.trim() !== item.maatc ? 'text-red-500' : ''}`}>
                                            {item.maatc}
                                        </div>
                                        : ''
                                    }

                                </td>
                                <td className="text-right px-2">{Number(item.tondau).toLocaleString('en-US')}</td>
                                <td className="text-right px-2">{Number(item.slnhap).toLocaleString('en-US')}</td>
                                <td className="text-right px-2">{Number(item.slxuat).toLocaleString('en-US')}</td>
                                <td className={`text-right px-2 ${item.toncuoi === 0 ? 'text-red-500 font-bold' : ''}`}>{Number(item.toncuoi).toLocaleString('en-US')}</td>
                                <td>
                                    <div className="flex items-center gap-0.5 px-1 py-1 border rounded">
                                        <span tooltip="Đa liều">
                                            {item.dalieu === 1 ?
                                                <FaBottleDroplet className="text-green-700" /> :
                                                <CiPill className="text-red-700" />
                                            }
                                        </span>
                                        <span >
                                            {item.bhyt === 100 ?
                                                <WiMoonAltNew className="text-[#667BC6]" /> :
                                                item.bhyt === 0 ?
                                                    <WiMoonAltFull className="text-[#667BC6]" /> :
                                                    <WiMoonAltFirstQuarter className="text-[#667BC6]" />
                                            }
                                        </span>
                                        <span>
                                            {item.duocbvid === 3 && item.maatc === '' ?
                                                <TbCircleLetterK className="text-purple-700" /> :
                                                item.duocbvid === 3 && item.maatc !== '' ?
                                                    <TbCircleLetterK className="text-red-700" /> :
                                                    ''}
                                        </span>
                                        <span>
                                            {item.adr === 1 && <GiPoisonBottle className="text-purple-700" />}
                                        </span>
                                        <span>
                                            {item.adrcao === 1 && <GiPoisonBottle className="text-red-700" />}
                                        </span>
                                        <span>
                                            {item.bienban === 1 && <GoReport className="text-blue-700" />}
                                        </span>
                                    </div>
                                </td>
                                <td>...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    data={data}
                    setDataInPage={setDataInPage}
                />
            </div>
        </>
    )


}
export default TuTrucTable;