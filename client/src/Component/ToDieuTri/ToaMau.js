import React, { useState, useEffect } from "react";

import { FcFilingCabinet, FcHome, FcViewDetails } from "react-icons/fc";
import Dropdown from "../Dropdown";
import TableCheckTon from "./TableCheckTon";
import TableDetail from "./TableDetail";
import { RiUserSharedFill } from "react-icons/ri";

import styles from "../styles.module.css";

function ToaMau({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [toaMaus, setToaMaus] = useState([]);
    const [detail, setDetail] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedMauId, setSelectedMauId] = useState(null);
    const [mauType, setMauType] = useState(1);
    const [khos, setKhos] = useState([]);
    const [selectedKho, setSelectedKho] = useState({ id: '', name: '' });
    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: '', name: '' });
    const [tutrucs, setTutrucs] = useState([]);
    const [selectedTutruc, setSelectedTutruc] = useState({ id: '', name: '' });
    const [dsBacsi, setDsBacsi] = useState([]);
    const [selectedBacsi, setSelectedBacsi] = useState({ id: '0', name: 'Tất cả' });
    const [viewData, setViewData] = useState([]);

    const [shared, setShared] = useState(0);
    // /duoc/tonkho/theokho/dskho/

    const fetchMauTonKho = async () => {
        try {
            const fecthURL = apiURL + "/todieutri/toamau/tonkho/" + site + "/" + selectedKho.id;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setToaMaus(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => async () => {
        const fetchDSBS = async () => {
            try {
                const fecthURL = apiURL + "/todieutri/toamau/dsbacsi/" + site;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setDsBacsi(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetchDSBS();
    }, [site]);

    const fetchKhoList = async () => {
        try {
            const fecthURL = apiURL + "/duoc/tonkho/theokho/dskho/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setKhos(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const handleClick = async (id) => {
        setSelectedMauId(id);
        setIsShowModal(true);
        try {
            const fecthURL = apiURL + "/todieutri/toamauCT/" + site + "/" + id;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setDetail(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // const handleOptionChange = (event) => {
    //     setRadioCheck(event.target.value);
    // };
    const handClickBTN = (type) => {
        setMauType(type);
        setViewData([]);

        // if (type === 1) {
        //     fetchMauDetail();
        // }
        // if (type === 2) {
        //     fetchKhoList();
        // }
    }


    const handleClickView = async () => {
        console.log("Start view....")
        console.log(selectedBacsi, shared)
        const fetchMauDetail = async () => {
            try {
                const fecthURL = apiURL + "/todieutri/toamau/detail/" + site;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setToaMaus(data);
                if (selectedBacsi === 0) {
                    
                }

                setViewData(data);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchMauDetail();

        // hhhh
    }

    return (
        <>
            <div className=" px-3 mb-4 ">
                <div className="bg-slate-100 w-full flex gap-4">
                    <div className="flex gap-3 items-center px-4 py-1 select-none bg-slate-300">
                        <button onClick={() => handClickBTN(1)}>
                            <FcViewDetails size={mauType === 1 ? 32 : 20} />
                        </button>
                        <button className="" onClick={() => handClickBTN(2)}>
                            <FcHome size={mauType === 2 ? 32 : 20} /></button>
                        <button onClick={() => handClickBTN(3)}>
                            <FcFilingCabinet size={mauType === 3 ? 32 : 20} /></button>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label>Bác sĩ:</label>
                        <div className="w-96">
                            <Dropdown data={dsBacsi} selectedOption={selectedBacsi} setSelectedOption={setSelectedBacsi} placeholder="Chọn bác sĩ" optionALL={true} />
                        </div>
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={shared}
                                value={shared}
                                onChange={() => setShared(prevValue => (prevValue === 0 ? 1 : 0))}
                            />
                            Shared - {shared}


                        </label>


                        <button
                            className={`${styles.btn} ${styles.btnNew}`}
                            onClick={() => handleClickView(selectedBacsi.id)}
                        >Xem</button>

                    </div>
                    {mauType === 2 && (
                        <div className="flex gap-3 items-center px-4 py-1 select-none">
                            <label>Kho:</label>
                            <div className="w-96">
                                <Dropdown
                                    data={khos}
                                    selectedOption={selectedKho}
                                    setSelectedOption={setSelectedKho}
                                    placeholder="Chọn kho" />
                            </div>
                            <button
                                className={`${styles.btn} ${styles.btnNew}`}
                                onClick={fetchMauTonKho}

                            >Xem</button>
                        </div>
                    )}
                    {mauType === 3 && (
                        <div className="flex gap-3 items-center px-4 py-1 select-none">
                            <div className="flex gap-3 items-center px-4 py-1 select-none">
                                <label>Khoa:</label>
                                <div className="w-96">
                                    <Dropdown data={[]} placeholder="Chọn khoa" selectedOption={selectedKhoa} setSelectedOption={setSelectedKhoa} />
                                </div>
                            </div>
                            <div className="flex gap-3 items-center px-4 py-1 select-none">
                                <label>Tủ trực:</label>
                                <div className="w-96">
                                    <Dropdown data={[]} placeholder="Chọn khoa" selectedOption={selectedTutruc} setSelectedOption={setSelectedTutruc} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="px-4 overflow-y-auto h-[680px]">
                {viewData.map((item, index) => (
                    <div className="mb-4">
                        <div className="flex gap-2 items-center font-bold text-[#5A639C]">
                            <div>{index + 1}</div>-
                            <div className="text-left py-1 ">{item.ten}</div>
                            <span className="border rounded-full px-3 bg-slate-200 text-sm">{item.details.length}</span>
                            <div className="italic text-sm">{item.bs}</div>
                            <div>
                                {item.dungchung === 1 && (
                                    <RiUserSharedFill />
                                )}
                            </div>
                        </div>
                        {mauType === 1 ? (
                            <TableDetail data={item.details} />
                        ) : (
                            <TableCheckTon data={item.details} />
                        )

                        }

                    </div>
                ))}
            </div>
        </>
    )
}

export default ToaMau;