import React, { useEffect, useState } from "react";

import { useAppContext } from "../../Store/AppContext";

import SearchBar from "../../Common/SearchBar";
import Pagination from "../../Common/Pagination";
function TaiKhoanKhoaPhongModal({ kpstring, setShowKPModal }) {
    console.log('kpstring', kpstring)

    const apiURL = process.env.REACT_APP_API_URL;
    const { site, area } = useAppContext();

    const [timeoutId, setTimeoutId] = useState(null);

    const [khoaphongs, setKhoaphongs] = useState([]);
    const [viewDatas, setViewDatas] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [totalPage, setTotalPage] = useState(0);
    const [dataInPage, setDataInPage] = useState([]);

    const [isAll, setIsAll] = useState(false);


    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }


    useEffect(() => {
        setDataInPage(constDataInPage(1, viewDatas));
        setTotalPage(Math.ceil(viewDatas.length / itemsPerPage));
    }, [viewDatas, itemsPerPage]);

    useEffect(() => {
        setDataInPage(constDataInPage(currentPage, viewDatas));
    }, [currentPage]);

    useEffect(() => {
        console.count("Số lần Callback trong useEffect chạy");
        const fetchKPs = async () => {
            const response = await fetch(`${apiURL}/danhmuc/khoaphong-all?site=${site}&area=${area}`);
            const data = await response.json();
            console.log('data', data)

            setKhoaphongs(data);
            setViewDatas(data);
        };
        fetchKPs();
    }, [site, area]);

    const closeModal = () => {
        setShowKPModal(false);
    }

    const search = (originalData, seachValue) => {
        if (seachValue === '') {
            console.log('check', originalData)
            return originalData;
        }
        return originalData.filter((item) => item.tenkp.toLowerCase().includes(seachValue.toLowerCase()));
    }

    const handleSearch = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewDatas(search(khoaphongs, searchTerm));
        }, 1000);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        if (searchTerm === '') {
            return;
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewDatas(search(khoaphongs, searchTerm));
        }, 1000);
        setTimeoutId(newTimeoutId);
    }, [searchTerm]);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);



    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-1/3 h-full  mx-auto bg-white">
                    <div className="h-full flex flex-grow flex-col justify-between">
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-2 bg-[#9BB0C1]">
                            Danh sách Khoa Phòng
                        </div>
                        {/* BODY */}
                        <div className="h-full p-4 flex flex-col justify-between overflow-hidden gap-6">
                            <div className="flex gap-2">
                            <div className="w-80 p-2">
                                <SearchBar
                                    placeholder="Tìm kiếm"
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    handleSearch={handleSearch}
                                />
                            </div>

                            <div className="flex gap-2 items-center">
                                <input
                                    name="all"
                                    id='all'
                                    type="checkbox"
                                    onChange={() => setIsAll(!isAll)}

                                    />
                                <label
                                    htmlFor="all"
                                    className="text-left cursor-pointer select-none"
                                >
                                    Tất cả
                                    </label>
                            </div>
                            </div>
                           


                            <div className=" overflow-y-auto p-3 h-full">
                                {dataInPage.map((kp) => (
                                    <div key={kp.makp} className="flex gap-2 items-center">
                                        <input
                                            type="checkbox"
                                            name={kp.makp}
                                            id={kp.makp}
                                            value={kp.makp}
                                            defaultChecked={kpstring && kpstring.includes(kp.makp)}
                                        />
                                        <label
                                            htmlFor={kp.makp}
                                            className={`text-left cursor-pointer select-none ${kp.loai === 0 ? 'font-bold' : ''}`}
                                        >
                                            {kp.tenkp}
                                        </label>
                                    </div>
                                ))}
                                
                            </div>
                            <Pagination
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalPage={totalPage}
                                    itemsPerPage={itemsPerPage}
                                    setItemsPerPage={setItemsPerPage}
                                />



                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-2 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={closeModal}
                            >
                                Đóng
                            </button>
                        </div>

                    </div>
                    {/* HEADER */}

                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default TaiKhoanKhoaPhongModal;

