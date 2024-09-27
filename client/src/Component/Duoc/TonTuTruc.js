import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";
import PharmarDetailModal from "./PharmarDetailModal";
import Table from "./Table";
import TableDetail from "./TableDetail";
import Toggle from "../Common/ToggleSwitch";

import { useAppContext } from "../Store/AppContext";

function TonTuTruc() {

    const { site } = useAppContext();

    const apiURL = process.env.REACT_APP_API_URL;

    const [khoaphongList, setKhoaphongList] = useState([]);
    const [selectedKhoaphong, setSelectedKhoaphong] = useState({ id: 0, name: '' });

    const [tuTrucList, setTuTrucList] = useState([]);
    const [selectedTuTruc, setSelectedTuTruc] = useState({ id: 0, name: '' });

    const [medicines, setMedicines] = useState([]);
    const [selectedPharmarId, setSelectedPharmarId] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewDatas, setViewDatas] = useState([]);

    const [isDetail, setIsDetail] = useState(false);


    useEffect(() => async () => {
        try {
            // const fecthURL = apiURL + "duoc/tutruc/ds_khoaphong/" + site;
            const response = await fetch(`${apiURL}noitru/danhsach-khoaphong/${site}`);
            const data = await response.json();
            setKhoaphongList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }, [site]);

    useEffect(() => {
        const fetchTuTrucList = async () => {
            try {
                const response = await fetch(`${apiURL}duoc/danhsach-tutruc/${site}/${selectedKhoaphong.id}`);
                const data = await response.json();

                // Add id into name
                const updatedData = data.map(item => ({
                    ...item,
                    name: `${item.name} (${item.id})` // Append id to name
                }));

                setTuTrucList(updatedData); // Set updated data to state

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchTuTrucList();

        return () => {
            // Cleanup logic if necessary
        };
    }, [selectedKhoaphong.id, site]);


    const getMedicines = async () => {
        try {
            const response = await fetch(`${apiURL}duoc/tutruc/tontutruc/${site}/${selectedTuTruc.id}`);
            const data = await response.json();
            setMedicines(data);
            if (searchTerm === '') {
                setViewDatas(data);
            }
            else {
                const filedata = data.filter((item) =>
                    item.mabd.toLowerCase().includes(searchTerm.toLowerCase()) || item.tenbd.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setViewDatas(filedata);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const onClick = () => {
        getMedicines();
    }

    // useEffect(() => {
    //     getPharmars();

    // }, [selectedKho]);

    // Search
    const handleSearch = (event) => {
        console.log(event.target.value)
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setViewDatas(medicines);
        }
        else {
            const filedata = medicines.filter((item) =>
                item.mabd.toLowerCase().includes(event.target.value.toLowerCase()) || item.tenbd.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setViewDatas(filedata);
        }
    };


    // /duoc/tonkho/theokho/dskho/<site>
    return (
        <div className="px-4">

            <div className="flex items-center gap-10">
                <div className="flex gap-10 items-center">
                    <div className="max-w-[500px] flex items-center gap-2">
                        <label className="w-[100px] text-left font-bold">KP</label>
                        <div className="w-[400px]">
                            <Dropdown
                                data={khoaphongList}
                                setSelectedOption={setSelectedKhoaphong}
                                selectedOption={selectedKhoaphong}

                                placeholder="Chọn khoa phòng "
                            />

                        </div>
                    </div>
                    <div className="max-w-[500px] flex items-center gap-1">
                        <label className="w-14 text-left font-bold">Tủ trực:</label>
                        <div className="w-[400px]">
                            <Dropdown
                                data={tuTrucList}
                                setSelectedOption={setSelectedTuTruc}
                                placeholder="Chọn tủ trực"
                                chooseIndex={1}
                                searchable={false}
                                selectedOption={selectedTuTruc}
                            />

                        </div>
                    </div>
                    <div className="">
                        <Toggle
                            idname="ton-chitiet"
                            enabled={isDetail}
                            setEnabled={setIsDetail}
                            displayName="Tồn chi tiết"
                        />

                    </div>
                    <div className=" flex items-center gap-2">
                        <input
                            type="text"
                            className="border w-56 px-2 py-1 outline-none"
                            placeholder="Nhập mã, tên, ..."
                            value={searchTerm}
                            spellCheck="false"
                            onChange={handleSearch}
                        />
                        <ViewButton onClick={onClick} />
                    </div>
                </div>
            </div>

            {/* Table */}

            <div>
                {isDetail ?
                    <TableDetail
                        data={viewDatas}
                        setIsShowModal={setIsShowModal}
                        setSelectedPharmarId={setSelectedPharmarId}
                    />

                    :
                    <Table
                        data={viewDatas}
                        setIsShowModal={setIsShowModal}
                        setSelectedPharmarId={setSelectedPharmarId}
                    />

                }


            </div>

            {isShowModal && <PharmarDetailModal site={site} pharmarId={selectedPharmarId} setModalShow={setIsShowModal} />}

        </div>
    );
}
export default TonTuTruc;