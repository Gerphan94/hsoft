import React, { useCallback, useEffect, useState } from "react";
import PharmarDetailModal from "./PharmarDetailModal";
// import Filter from "./Filter";
import Filter3 from "./Filter3";
import Table from "./Table";
import TableDetail from "./TableDetail";
import styles from "../styles.module.css";
import SearchBar from "../Common/SearchBar";
import Toggle from "../Common/ToggleSwitch";

import { useAppContext } from "../Store/AppContext";

function TonTheoKho({ site }) {

    console.count('rending tồn kho theo kho', site)
    // const cousite = localStorage.getItem('site');
    const apiURL = process.env.REACT_APP_API_URL;
    const [timeoutId, setTimeoutId] = useState(null);

    const [khoList, setKhoList] = useState([]);
    const [selectedKhoId, setSelectedKhoId] = useState(0);

    const [pharmars, setPharmars] = useState([]);
    const [selectedPharmarId, setSelectedPharmarId] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewDatas, setViewDatas] = useState([]);

    const [isDetail, setIsDetail] = useState(false);

    // FILTER
    const [filterList, setFilterList] = useState([
        { id: 'dalieu', name: 'Đa liều', value: false },
        { id: 'bhyt', name: 'BHYT', value: false },
        { id: 'khangsinh', name: 'Kháng sinh', value: false },
        { id: 'adr', name: 'ADR', value: false },
        { id: 'sldvsd', name: 'Sl DVSD', value: false },
        { id: 'hoichan', name: 'Hội chẩn', value: false },
        { id: 'luuy', name: 'Lưu ý', value: false }
    ])

    const [tyleBH, setTyleBH] = useState({ id: '100', name: '100' });



    useEffect(() => {
        if (!site) return; // Skip fetch if `site` is not valid or undefined

        console.count("Số lần Callback trong useEffect chạy");

        const controller = new AbortController(); // Create a new AbortController
        const signal = controller.signal; // Get the signal to pass to fetch

        const fetchData = async () => {
            try {
                const fetchURL = apiURL + "/duoc/danhsach-kho/" + site;
                const response = await fetch(fetchURL, { signal });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setKhoList(data);
                if (data.length > 0) {
                    setSelectedKhoId(data[0].id);
                }

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchData();
        return () => controller.abort();
    }, [site]);



    const filter = (iData) => {
        const filterData = iData.filter((item) => {
            // Initialize match to true
            let matchesAllFilters = true;
            // Iterate through each filter in the list
            filterList.forEach(filter => {
                if (filter.id === 'dalieu' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.dalieu === 1;
                }
                if (filter.id === 'bhyt' && filter.value === true) {
                    if (tyleBH.id === 100) {
                        matchesAllFilters = matchesAllFilters && item.bhyt === 100;
                    }
                    else if (tyleBH.id === 0) {
                        matchesAllFilters = matchesAllFilters && item.bhyt === 0;
                    }
                    else {
                        matchesAllFilters = matchesAllFilters && item.bhyt > 0;
                    }
                }
                if (filter.id === 'notbhyt' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.bhyt === 0;
                }
                if (filter.id === 'khangsinh' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.duocbvid === 3;
                }
                if (filter.id === 'adr' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.adr === 1;
                }
                if (filter.id === 'sldvsd' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.soluongdvsd > 0;
                }
                if (filter.id === 'luuy' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.luuy !== null;
                }
                if (filter.id === 'hoichan' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.bienban === 1;
                }
            });

            return matchesAllFilters;
        });
        return filterData;
    };

    const handleFilter = () => {
        setSearchTerm('');
        const filterData = filter(pharmars);
        setViewDatas(filterData);
    };

    const onClick = () => {
        console.log('selectedKhoId', selectedKhoId)
        if (!selectedKhoId) {
            return;
        }
        const fetchTonKho = async () => {
            try {
                const fecthURL = apiURL + "duoc/tonkho/theokho/" + site + "/" + selectedKhoId;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setPharmars(data);
                setViewDatas(data);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchTonKhoChiTiet = async () => {
            try {
                const fecthURL = apiURL + "duoc/tonkho/theokho-chitiet/" + site + "/" + selectedKhoId;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setPharmars(data);
                setViewDatas(data);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (isDetail) {
            fetchTonKhoChiTiet();
        } else {
            fetchTonKho();
        }
    }

    // useEffect(() => {
    //     getPharmars(selectedKho.id);
    // }, [selectedKho.id]);


    const onClickPharmar = (pharmarid) => {
        setSelectedPharmarId(pharmarid);
        setIsShowModal(true);
    }

    const search = (data, seachValue) => {
        if (seachValue === '') {
            return data;
        }
        return data.filter((item) => item.mabd.toLowerCase().includes(seachValue.toLowerCase()) || item.tenbd.toLowerCase().includes(seachValue.toLowerCase()));
    }

    // Search
    const handleSearch = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewDatas(search(pharmars, searchTerm));
        }, 1000);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewDatas(search(pharmars, searchTerm));
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

    useEffect(() => {
        setViewDatas([]);
        setPharmars([]);
    }, [isDetail])

    return (
        <div className="">
            <div className="flex items-center gap-4 px-4">
                <div className="flex items-center gap-2">
                    <label className="font-bold">Kho: </label>
                    <div className="w-96 px-4 py-2">

                        <select
                            className="border px-2 py-1 w-full outline-none"
                            value={selectedKhoId}
                            onChange={(event) => setSelectedKhoId(event.target.value)} // Corrected the onChange handler
                        >
                            {khoList.map((kho) => (
                                <option key={kho.id} value={kho.id}>{kho.name}</option>
                            ))}
                        </select>

                    </div>
                    <div>
                    <Toggle
                        idname={'is-detail'}
                        displayName="Tồn chi tiết"
                        setEnabled={setIsDetail}
                        enabled={isDetail}
                    />
                </div>
                    <button 
                        type="button" 
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={onClick}
                        >
                        Xem
                    </button>
                </div>
                <div>
                    <SearchBar
                        placeholder='Nhập Mã, Tên, HC'
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                    />
                </div>
                <div className="w-96">
                    <Filter3
                        idkho={selectedKhoId}
                        site={site}
                        filters={filterList}
                        setFilters={setFilterList}
                        onClick={handleFilter}
                    />
                </div>      
            </div>
            <div className="p-4">
                {isDetail ?
                    <TableDetail
                        data={viewDatas}
                        setIsShowModal={setIsShowModal}
                        setSelectedPharmarId={setSelectedPharmarId} />
                    :
                    <Table
                        data={viewDatas}
                        setIsShowModal={setIsShowModal}
                        setSelectedPharmarId={setSelectedPharmarId} />
                }

            </div>

            {isShowModal && <PharmarDetailModal site={site} pharmarId={selectedPharmarId} setModalShow={setIsShowModal} />}
        </div >
    );
}
export default TonTheoKho;