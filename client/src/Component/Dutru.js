import React, { useState, useEffect } from "react";
import DutruCT from "./DutruCT";
import DutruDuyetModal from "./DutruDuyetModal";

function Dutru({ site, data }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [dutruCTData, setDutruCTData] = useState([]);

    const [selectedDutruID, setSelectedDutruID] = useState('');
    const [isShowDuyetModal, setIsShowDuyetModal] = useState(false);


    const handleClickDutru = async (id) => {
        setSelectedDutruID(id);
        try {

            const fecthURL = apiURL + "hien_dien/dutruCT/" + site + "/" + id;

            const response = await fetch(fecthURL);
            const data = await response.json();
            console.log("checking ----------", data)
            setDutruCTData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const handleShowDuyetModal = (trangthai) => {
        if (trangthai === 'Đã duyệt') {
            setIsShowDuyetModal(true);
        }
    };
    const [selectedOption, setSelectedOption] = useState('phieu');

    // Function to handle changes in the radio buttons
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    return (

        <>
            <div className="flex gap-4 py-4">
                <div class="flex items-center border px-2 py-1 rounded-xl cursor-pointer">
                    <input checked id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 bg-gray-100 border-gray-300 cursor-pointer" />
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">Phiếu</label>
                </div>
                <div class="flex items-center border px-2 py-1 rounded-xl cursor-pointer">
                    <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 bg-gray-100 border-gray-300 cursor-pointer" />
                    <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">Thuốc</label>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    {data.map((ele, index) =>
                        <div className="p-2">
                            <div
                                className={`border rounded-3xl p-4 cursor-pointer ${selectedDutruID === ele.id ? "bg-slate-200" : ""} hover:bg-slate-200`}
                                onClick={() => handleClickDutru(ele.id)}
                            >
                                <div className="flex justify-between">
                                    <div className="flex gap-3">
                                        <div className="cursor-text">{ele.id}</div>
                                        <div className="font-bold">{ele.ten}</div>
                                    </div>

                                    <div
                                        className={`w-24 border rounded-2xl text-sm select-none py-0.5 ${ele.trangthai === 'Mới' ? 'bg-white' : ele.trangthai === 'Chuyển đi' ? "bg-blue-300" : ele.trangthai === 'Duyệt' ? "bg-green-400" : "bg-red-400"}`}
                                        onClick={() => handleShowDuyetModal(ele.trangthai)}
                                    >
                                        {ele.trangthai}
                                    </div>

                                </div>
                                <div className="flex justify-between">
                                    <div className="italic">Tạo ngày: {ele.ngaytao}
                                    </div>
                                    <div>{ele.duockp}</div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
                <div>
                    {dutruCTData.length > 0 && dutruCTData.map((ele) => {
                        return <DutruCT data={ele} />;
                    })}

                </div>
            </div>

            {isShowDuyetModal &&
                <DutruDuyetModal setModalShow={setIsShowDuyetModal} />

            }



        </>
    )
}

export default Dutru;