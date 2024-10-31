import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaBars } from "react-icons/fa";

import Dropdown from "../Common/Dropdown";
import Toggle from "../Common/ToggleSwitch";
import Pagination from "../Common/Pagination";
import { useSearchParams } from 'react-router-dom';
import { FaGrip } from "react-icons/fa6";
import TaiKhoaKpModal from "./Modal/TaiKhoaKpModal";
import SearchBar from "../Common/SearchBar";

function TaiKhoan({ site }) {

    console.log('rending tai khoan')
    const apiURL = process.env.REACT_APP_API_URL;

    const accountTypes = [
        { id: 'hsoft', name: 'Hsoft' },
        { id: 'vienphi', name: 'Viện phí' },
        { id: 'duoc', name: 'Dược' }
    ];
    const [accountType, setAccountType] = useState({ id: 'hsoft', name: 'Hsoft' });

    const [cosos, setCosos] = useState([]);
    const [selectedCoso, setSelectedCoso] = useState({ id: 0, name: '' });


    const [nhomnvs, setNhomnvs] = useState([]);
    const [khoaphongs, setKhoaphongs] = useState([]);

    const [selectedNhomnv, setSelectedNhomnv] = useState({ id: 0, name: '' });
    const [selectedKP, setSelectedKP] = useState({ id: 0, name: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);

    const [viewDatas, setViewDatas] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [dataInPage, setDataInPage] = useState([]);

    const [disableFilterBtn, setdisableFilterBtn] = useState(true);

    const [kpModal, setKpModal] = useState({ 'show': false, 'data': '' });

    const fetchDSKhoa =  async() => {
        if (site === '') return;
        if (selectedCoso.id === 0) return;
        const kpsURL = `${apiURL}noitru/dskhoa/${site}/${selectedCoso.id}`;
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
    }, [selectedCoso.id]);

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
                setCosos(cosoData);
                setNhomnvs(nhomnvsData);
                setSelectedCoso({ id: cosoData[0].id, name: cosoData[0].name });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDSKhoa();
        fetchData();
    }, [site]);


    const selectNhomnv = useCallback((selected) => {
        setSelectedNhomnv({ id: selected.id, name: selected.name });
    }, [])

    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }

    useEffect(() => {
        setDataInPage(constDataInPage(currentPage, viewDatas));
    }, [currentPage]);


    const handeleView = async () => {
        try {
            const fecthURL = apiURL + "danhmuc/taikhoan-hsoft/" + site + "/" + selectedCoso.id;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setData(data);
            setViewDatas(data);
            setTotalPage(Math.ceil(data.length / itemsPerPage));
            setDataInPage(constDataInPage(1, data));

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

                return String(item.id) === debouncedSearchTerm ||
                    ma.includes(lowerCasedSearchTerm) ||
                    hoten.includes(lowerCasedSearchTerm) ||
                    userid.includes(lowerCasedSearchTerm);
            });
            setTotalPage(Math.ceil(filteredData.length / itemsPerPage));
            setDataInPage(constDataInPage(1, filteredData));
            setViewDatas(filteredData);
        }
    }, [debouncedSearchTerm]);

    const handleSearch = (event) => {
        setCurrentPage(1);
        setSearchTerm(event.target.value);
    };
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

        setTotalPage(Math.ceil(filterData.length / itemsPerPage));
        setCurrentPage(1);
        setDataInPage(constDataInPage(1, filterData));
        setViewDatas(filterData);
    };



    return (
        <>
            <div className="">
                <div className=' w-full text-md bg-white p-3 z-10'>
                    <div className="flex gap-4 items-center">
                        <div className="w-40">
                            <Dropdown
                                data={accountTypes}
                                setSelectedOption={setAccountType}
                                selectedOption={accountType}
                            />
                        </div>
                        <div className="w-96">
                            <Dropdown
                                data={cosos}
                                setSelectedOption={setSelectedCoso}
                                selectedOption={selectedCoso}
                                optionALL

                            />
                        </div>
                        <button
                            className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1 select-none"
                            onClick={() => handeleView()}
                        >
                            Xem <FaEye />
                        </button>
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
                    <div className="p-2">
                        <div className="w-1/3">
                        <SearchBar
                            placeholder='Tìm kiếm'
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                        </div>
                       
                    </div>
                </div>

                <div className="min-h-96 px-4">
                    <table>
                        <thead className="sticky top-0 bg-white ">
                            <tr className="">
                                <th className="py-1 text-center w-10">STT</th>
                                <th className="w-24">ID</th>
                                <th>UserID</th>
                                <th className="text-left w-20">Pwd</th>
                                <th className="text-left">Tên TK</th>
                                <th>Mã NV</th>
                                <th className="text-left">Họ tên NV</th>
                                <th className="text-left">Tên Nhóm</th>
                                <th className="text-left">Chứng thư số</th>
                                <th className="text-left">Pin</th>
                                <th className="text-left hidden">Khoa/Phong</th>
                                <th>Khoa/Phòng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataInPage.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-1 text-center">{(currentPage - 1) * 20 + (index + 1)}</td>
                                    <td className="w-24">{item.id}</td>
                                    <td className="text-left">{item.userid}</td>
                                    <td className="text-left">{item.password_}</td>
                                    <td className="text-left">
                                        <div className="px-2">
                                            {item.tentaikhoan}
                                        </div>
                                    </td>
                                    <td>{item.mabs}</td>
                                    <td className="text-left">{item.hoten}</td>
                                    <td className="text-left">{item.tennhom}</td>
                                    <td>{item.chungthuso}</td>
                                    <td>{item.pin}</td>
                                    <td className="hidden">{item.makp}</td>
                                    <td>

                                        <button onClick={() => setKpModal({ show: true, data: item.makp })}>
                                            <FaGrip />

                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full">
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPage={totalPage}
                        />
                    </div>
                </div>

                {/* Pagination */}


            </div>

            {kpModal.show && <TaiKhoaKpModal
                kpModal={kpModal}
                setKpModal={setKpModal}
                site={site}
            />}

        </>
    )

}

export default TaiKhoan;