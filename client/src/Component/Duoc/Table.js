import React from "react";
import { FaBottleDroplet, FaJar } from "react-icons/fa6";
import { CiPill } from "react-icons/ci";
import { TbCircleLetterK } from "react-icons/tb";
import { WiMoonAltFull, WiMoonAltFirstQuarter, WiMoonAltNew } from "react-icons/wi";
import { GiPoisonBottle } from "react-icons/gi";

import ItemComponent from "./TableIconComponent";
function Table({ data, setIsShowModal, setSelectedPharmarId }) {

    const HighlightText = ({ text, highlight }) => {
        if (!highlight) {
            return <div>{text}</div>;
        }

        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <div>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>{part}</span>
                    ) : (
                        part
                    )
                )}
            </div>
        );
    };



    const onClickPharmar = (pharmarid) => {
        setSelectedPharmarId(pharmarid);
        setIsShowModal(true);
    }
    return (
        <>
            <div className="mt-2 w-full lg:h-[700px] overflow-y-auto" >
                <table className="w-full">
                    <thead className="sticky top-0 z-100">
                        <tr className="bg-gray-200">
                            <th></th>
                            <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>
                            <th className="w-24"><div className="">Mã BD</div></th>
                            <th className="w-[400px]"><div>Tên BD</div></th>
                            <th><div className="w-36">Hoạt chất</div></th>
                            <th><div className="text-left w-20">DVD</div></th>
                            <th><div className="w-28">Đường dùng</div></th>
                            <th><div className="w-28">ATC</div></th>
                            <th><div className="text-right w-20">Tồn đầu</div></th>
                            <th><div className="text-right w-20">Nhập</div></th>
                            <th><div className="text-right w-20">Xuất</div></th>
                            <th><div className="text-right w-20">Tồn cuối</div></th>
                            <th><div className="text-right w-20">SLYC</div></th>
                            <th><div className="text-right w-20">SLKD</div></th>
                            {/* <th><div className="text-center w-20">TồnBH</div></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.mabd} className="even:bg-gray-100 hover:bg-blue-200 text-sm" >
                                <td>
                                    <div className="flex items-center gap-0.5 px-1 py-1">
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
                                            {
                                            item.duocbvid === 3  && item.maatc === '' ?
                                                <TbCircleLetterK className="text-purple-700" /> :
                                                item.duocbvid === 3 && item.maatc !== '' ?
                                                    <TbCircleLetterK className="text-red-700" /> :
                                                ''}
                                        </span>

                                        <span>
                                            {item.adr === 1  && <GiPoisonBottle className="text-purple-700" />}
                                        </span>


                                    </div>
                                </td>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-left">{item.mabd}</td>
                                <td
                                    className="text-left hover:underline hover:text-blue-600"
                                    onClick={() => onClickPharmar(item.id)}
                                >
                                    <div className="flex gap-1 items-center">
                                        <div className="mr-2">
                                            <ItemComponent dvt={item.dvt} />
                                        </div>
                                        <div> {item.tenbd}
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
                                <td className="text-center">{item.maatc}</td>
                                <td className="text-right px-1">{Number(item.tondau).toLocaleString('en-US')}</td>
                                <td className="text-right px-1">{Number(item.slnhap).toLocaleString('en-US')}</td>
                                <td className="text-right px-1">{Number(item.slxuat).toLocaleString('en-US')}</td>
                                <td className={`text-right px-1 ${item.toncuoi === 0 ? 'text-red-500 font-bold' : ''}`}>{Number(item.toncuoi).toLocaleString('en-US')}</td>
                                <td className="text-right px-1">{Number(item.slyeucau).toLocaleString('en-US')}</td>
                                <td className="text-right px-1">{Number(item.tonkhadung).toLocaleString('en-US')}</td>
                                {/* <td></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )


}
export default Table;