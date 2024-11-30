import React, { useState, useEffect, useCallback } from "react";
import { FaEye } from "react-icons/fa";

import Dropdown from "../Common/Dropdown";
import SearchBar from "../Common/SearchBar";
import Filter from "./Filter";
import TaiKhoanTable from "./TaiKhoanTable";

import { useAppContext } from "../Store/AppContext";

function TaiKhoan() {

    const apiURL = process.env.REACT_APP_API_URL;
    const { site, area } = useAppContext();
    const accountTypes = [
        { id: 'hsoft', name: 'Hsoft' },
        { id: 'vienphi', name: 'Viện phí' },
        { id: 'duoc', name: 'Dược' }
    ];
    const [accountType, setAccountType] = useState({ id: 'hsoft', name: 'Hsoft' });


    const [nhomnvs, setNhomnvs] = useState([]);
    const [khoaphongs, setKhoaphongs] = useState([]);

    const [selectedNhomnv, setSelectedNhomnv] = useState({ id: 0, name: '' });
    const [selectedKP, setSelectedKP] = useState({ id: 0, name: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);

    const [viewDatas, setViewDatas] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const [disableFilterBtn, setdisableFilterBtn] = useState(true);

    const [kpModal, setKpModal] = useState({ 'show': false, 'data': '' });

    const [filterList, setFilterList] = useState([
        { id: 'khoakygrv', name: 'Khoa Ký giấy Rv', value: false },
    ])


    const fetchDSKhoa = async () => {
        if (site === '') return;
       
        const kpsURL = `${apiURL}noitru/dskhoa/${site}/${area}`;
        try {
            const response = await fetch(kpsURL);
            const data = await response.json();
            setKhoaphongs(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDSKhoa();
    }, [area]);

    useEffect(() => {
        const fetchData = async () => {
            if (site === '') return;

            const cosoURL = `${apiURL}/danhmuc/danhmuc-coso-tamanh/${site}`;
            const nhomnvsURL = `${apiURL}/danhmuc/nhom-nhanvien/${site}`;

            try {
                const [cosoResponse, nhomnvsResponse] = await Promise.all([
                    fetch(cosoURL),
                    fetch(nhomnvsURL),
                ]);
                const cosoData = await cosoResponse.json();
                const nhomnvsData = await nhomnvsResponse.json();
                setNhomnvs(nhomnvsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDSKhoa();
        fetchData();
        setData([]);
        setViewDatas([]);
       

    }, [site]);

    const selectNhomnv = useCallback((selected) => {
        setSelectedNhomnv({ id: selected.id, name: selected.name });
    }, [])


    const handeleView = async () => {
        try {
            const fecthURL = `${apiURL}danhmuc/taikhoan-hsoft?site=${site}&area=${area}`;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setData(data);
            setViewDatas(data);
            setdisableFilterBtn(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm === '') {
            setViewDatas(data);
           
        } else {
            const lowerCasedSearchTerm = debouncedSearchTerm.toLowerCase();
            const filteredData = data.filter(item => {
                const userid = item.userid?.toLowerCase() ?? '';
                const ma = item.mabs?.toLowerCase() ?? '';
                const hoten = item.hoten?.toLowerCase() ?? '';
                const chungthu = item.chungthuso?.toLowerCase() ?? '';
                return String(item.id) === debouncedSearchTerm ||
                    ma.includes(lowerCasedSearchTerm) ||
                    hoten.includes(lowerCasedSearchTerm) ||
                    userid.includes(lowerCasedSearchTerm) ||
                    chungthu.includes(lowerCasedSearchTerm);
            });
         
            setViewDatas(filteredData);
        }
    }, [debouncedSearchTerm]);

    
    const handleFilter = () => {
        setSearchTerm('');
        const filterData = data.filter((item) => {
            let matchesAllFilters = true;
            if (selectedNhomnv.id > 0) {
                matchesAllFilters = matchesAllFilters && (item.manhomnv === selectedNhomnv.id);
            }
            if (selectedKP.id > 0 && item.makp !== '' && item.makp !== null) {
                const isPresent = item.makp
                    .split(',')
                    .map(item => item.trim())
                    .includes(selectedKP.id.toString());
                matchesAllFilters = matchesAllFilters && isPresent;
            }
            return matchesAllFilters;
        });
        setViewDatas(filterData);
    };

    // FILTER
    const filter = (iData) => {
        const filterData = iData.filter((item) => {
            // Initialize match to true
            let matchesAllFilters = true;
            // Iterate through each filter in the list
            filterList.forEach(filter => {
                if (filter.id === 'khoakygrv' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.khoakyrv === 1;
                }
            });
            return matchesAllFilters;
        });
        return filterData;
    };

    const handleFilter2 = () => {
        setSearchTerm('');
        const filterData = filter(data);
        setViewDatas(filterData);
    }


    return (
        <>
            <div className="h-full flex flex-col flex-grow">
                <div className=' w-full text-md bg-white py-3 z-10'>
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2">
                            <div className="w-32">
                                <Dropdown
                                    data={accountTypes}
                                    setSelectedOption={setAccountType}
                                    selectedOption={accountType}
                                />
                            </div>
                            <button
                                className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1 select-none"
                                onClick={() => handeleView()}
                            >
                                Xem <FaEye />
                            </button>
                        </div>

                        <SearchBar
                            placeholder='Tìm kiếm'
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                        <Filter
                            filters={filterList}
                            setFilters={setFilterList}
                            onClick={handleFilter2}
                        />
                        <div className="flex gap-4">
                            <div className="w-96">
                                <Dropdown
                                    data={khoaphongs}
                                    selectedOption={selectedKP}
                                    setSelectedOption={setSelectedKP}
                                    searchable
                                    optionALL
                                    chooseIndex={1}
                                    memoized
                                />
                            </div>
                            <div className="w-56">
                                <Dropdown
                                    data={nhomnvs}
                                    selectedOption={selectedNhomnv}
                                    setSelectedOption={selectNhomnv}
                                    optionALL
                                    searchable
                                    chooseIndex={1}

                                />
                            </div>
                            <button
                                disabled={disableFilterBtn}
                                className="text-white bg-blue-400 px-2 py-1 w-20 select-none rounded-md opacity-80 hover:opacity-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                onClick={() => handleFilter()}
                            >Lọc</button>
                        </div>
                    </div>

                </div>
                <div >
                <TaiKhoanTable
                    data={viewDatas}
                />
                </div>

                
            </div>
        </>
    )

}

export default TaiKhoan;