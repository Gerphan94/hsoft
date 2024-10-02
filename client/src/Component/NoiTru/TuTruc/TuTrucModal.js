import React, { useState, useEffect, forwardRef } from "react";

import Dropdown from "../../Common/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles.module.css"
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";
import { FaBottleDroplet, FaJar } from "react-icons/fa6";
import { CiPill } from "react-icons/ci";
import { TbCircleLetterK } from "react-icons/tb";
import { WiMoonAltFull, WiMoonAltFirstQuarter, WiMoonAltNew } from "react-icons/wi";
import { GiPoisonBottle } from "react-icons/gi";
import { GoReport } from "react-icons/go";
function TuTrucModal({ site, setShowModal, khoa }) {

    const apiURL = process.env.REACT_APP_API_URL

    const [tutrucs, setTutrucs] = useState([]);
    const [tonkho, setTonkho] = useState([]);
    const [selectedTuTruc, setSelectedTuTruc] = useState({ id: 0, name: '' });

    useEffect(() => {
        const fetchDanhsachTutruc = async () => {
            try {
                const response = await fetch(`${apiURL}duoc/danhsach-tutruc/${site}/${khoa.id}`);
                const data = await response.json();
                setTutrucs(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchDanhsachTutruc();

    }, [khoa.id])


    return (
        <>
            <div className=" fixed inset-0 z-50 outline-none focus:outline-none p-10 w-screen h-screen ">
                <div className="relative w-full h-[90%] mx-auto bg-white">
                    <div className="size-full flex flex-col justify-between">
                        <div className="w-full text-left text-lg font-bold border-b-black px-4 py-1 bg-[#9BB0C1]">
                            Tồn tủ trực | {khoa && khoa.name}
                        </div>
                        <div className="size-full p-4 space-y-2">
                            <div className="w-[500px] text-left flex gap-2 items-center">
                                <label className="w-20">Tủ trực</label>

                                <Dropdown
                                    data={tutrucs}
                                    setSelectedOption={setSelectedTuTruc}
                                    placeholder="Chọn tủ trực"
                                    chooseIndex={1}
                                    searchable={false}
                                    selectedOption={selectedTuTruc}
                                />
                                <button
                                    className={`${styles.btn} ${styles.btnNew}`}
                                    type="button"
                                >Xem</button>
                            </div>

                            <div>
                                <table className="w-full">
                                    <thead className="sticky top-0 z-100">
                                        <tr>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tonkho.map((item, index) => (
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
                                <td className="text-center">{index + 1}</td>
                                <td className="text-left">{item.mabd}</td>
                                <td
                                    className="text-left hover:underline hover:text-blue-600"
                                >
                                    <div className="flex gap-1 items-center">
                                        <div className="mr-2">
                                            {item.dvt}
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
                                <td className="text-center">
                                    {item.maatc !== null && item.maatc !== undefined && item.maatc.trim() !== '' ?
                                        <div className={`${item.maatc.trim() !== item.maatc ? 'text-red-500' : ''}`}>
                                            {item.maatc}
                                        </div>
                                        : ''
                                    }

                                </td>
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

                        </div>

                    </div>
                    <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">

                        <button
                            className={`${styles.btn} ${styles.btnClose}`}
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>




            </div>

            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default TuTrucModal;