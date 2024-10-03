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

import TuTrucTable from "./TuTrucTable";


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
    const handleView = () => {
        const fetchTonTuTruc = async () => {
            try {
                const response = await fetch(`${apiURL}/duoc/tutruc/tontutruc/${site}/${selectedTuTruc.id}`);
                const data = await response.json();
                setTonkho(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchTonTuTruc();

    }


    return (
        <>
            <div className=" fixed inset-0 z-50 outline-none focus:outline-none p-10 w-screen h-screen ">
                <div className="relative w-full h-[90%] mx-auto bg-white">
                    <div className="size-full flex flex-col justify-between">
                        <div className="w-full text-left text-lg font-bold border-b-black px-4 py-1 bg-[#9BB0C1]">
                            Tồn tủ trực | {khoa && khoa.name}
                        </div>
                        <div className="size-full p-4 flex flex-col justify-between flex-grow">
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
                                    onClick={handleView}
                                >Xem</button>
                            </div>
                            <div className="h-full">
                                <TuTrucTable data={tonkho} />
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