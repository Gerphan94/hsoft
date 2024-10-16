import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";
import PharmarDetailModal from "./PharmarDetailModal";
import Table from "./Table";
import TableDetail from "./TableDetail";
import Toggle from "../Common/ToggleSwitch";
import SearchBar from "../Common/SearchBar";
import { useAppContext } from "../Store/AppContext";

function TonTuTruc() {


    const apiURL = process.env.REACT_APP_API_URL;
    const site = localStorage.getItem('site');


    const [khoaphongList, setKhoaphongList] = useState([]);
    const [selectedKhoaphong, setSelectedKhoaphong] = useState({ id: 0, name: '' });

    const [tuTrucList, setTuTrucList] = useState([]);
    const [selectedTuTruc, setSelectedTuTruc] = useState({ id: 0, name: '' });

    // const [medicines, setMedicines] = useState([]);
    const [data, setData] = useState([]);
    const [selectedPharmarId, setSelectedPharmarId] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const [viewDatas, setViewDatas] = useState([]);

    const [isDetail, setIsDetail] = useState(false);

    const [filterList, setFilterList] = useState([
        { id: 'dalieu', name: 'Đa liều', value: false },
        { id: 'bhyt', name: 'BHYT', value: false },
        { id: 'khangsinh', name: 'Kháng sinh', value: false },
        { id: 'adr', name: 'ADR', value: false },
        { id: 'sldvsd', name: 'Sl DVSD', value: false },
        { id: 'hoichan', name: 'Hội chẩn', value: false },
        { id: 'luuy', name: 'Lưu ý', value: false }
    ])


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


    const getData = async () => {
        if (!selectedTuTruc.id) return;
        const fetchUrl = isDetail ?
            `${apiURL}duoc/tutruc/tontutruc-chitiet/${site}/${selectedTuTruc.id}` :
            `${apiURL}duoc/tutruc/tontutruc/${site}/${selectedTuTruc.id}`;

        try {
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setData(data);
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
        getData();
    }

    useEffect(() => {
        setData([])
        setViewDatas([])

    }, [isDetail])

    const search = (data, seachValue) => {
        if (seachValue === '') {
            return data;
        }
        return data.filter((item) => item.mabd.toLowerCase().includes(seachValue.toLowerCase()) || item.tenbd.toLowerCase().includes(seachValue.toLowerCase()));
    }

   
    const handleSearch = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewDatas(search(data, searchTerm));
        }, 1000);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewDatas(search(data, searchTerm));
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

    const filter = (iData) => {
        const filterData = iData.filter((item) => {
            // Initialize match to true
            let matchesAllFilters = true;
            // Iterate through each filter in the list
            filterList.forEach(filter => {
                if (filter.id === 'dalieu' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.dalieu === 1;
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


    // /duoc/tonkho/theokho/dskho/<site>
    return (
        <div className="px-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-2 gap-y-2">
                <div className="flex items-center gap-2 px-2">
                    <label className="w-10 text-left font-bold">KP</label>
                    <div className="w-full">
                        <Dropdown
                            data={khoaphongList}
                            setSelectedOption={setSelectedKhoaphong}
                            selectedOption={selectedKhoaphong}

                            placeholder="Chọn khoa phòng "
                        />

                    </div>
                </div>
                <div className=" flex items-center gap-2 px-2">
                    <label className="w-20 text-left font-bold">Tủ trực:</label>
                    <div className="w-full">
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
                <div className="flex gap-2 items-center">
                    <Toggle
                        idname="ton-chitiet"
                        enabled={isDetail}
                        setEnabled={setIsDetail}
                        displayName="Tồn chi tiết"
                    />

                    <ViewButton onClick={onClick} />
                </div>

                <div className=" flex items-center gap-2 px-2">
                    <label className="w-10 text-left font-bold"></label>

                    <SearchBar
                        placeholder='Nhập Mã, Tên, HC'
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                    />

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