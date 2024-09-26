import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaBars } from "react-icons/fa";

import Dropdown from "../Common/Dropdown";
import Toggle from "../Common/ToggleSwitch";
import Pagination from "../Common/Pagination";

function TaiKhoan({ site }) {

    console.log('rending tai khoan')
    const apiURL = process.env.REACT_APP_API_URL;

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

    useEffect(() => {
        const fetchData = async () => {
          if (site === '') return;
      
          const nhomnvsURL = `${apiURL}/danh-muc/nhom-nhan-vien/${site}`;
          const khoaphongsURL = `${apiURL}noitru/dskhoa/${site}`;
      
          try {
            const [nhomnvsResponse, khoaphongsResponse] = await Promise.all([
              fetch(nhomnvsURL),
              fetch(khoaphongsURL)
            ]);
      
            const nhomnvsData = await nhomnvsResponse.json();
            const khoaphongsData = await khoaphongsResponse.json();
      
            setNhomnvs(nhomnvsData);
            setKhoaphongs(khoaphongsData);
      
            console.log("Fetched data:", { nhomnvsURL, khoaphongsURL });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
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
            const fecthURL = apiURL + "/danh-muc/tai-khoan-hsoft/" + site;
            console.log("call", fecthURL)
            const response = await fetch(fecthURL);
            const data = await response.json();
            setData(data);
            setViewDatas(data);
            setTotalPage(Math.ceil(data.length / itemsPerPage));
            setDataInPage(constDataInPage(1, data));

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
                const ma = item.ma?.toLowerCase() ?? '';
                const hoten = item.hoten?.toLowerCase() ?? '';

                return ma.includes(lowerCasedSearchTerm) || hoten.includes(lowerCasedSearchTerm) || userid.includes(lowerCasedSearchTerm);
            });
            setTotalPage(Math.ceil(filteredData.length / itemsPerPage));
            setDataInPage(constDataInPage(1, filteredData));
            setViewDatas(filteredData);
        }
    }, [debouncedSearchTerm]);

    // Input onChange handler
    const handleSearch = (event) => {
        console.log(event.target.value)
        setSearchTerm(event.target.value);
    };

    // const handleSearch = (event) => {
    //     setSearchTerm(event.target.value);

    //     if (event.target.value === '') {
    //         setViewDatas(data);  // Reset to the full list
    //     } else {
    //         const filedata = data.filter((item) => {
    //             const ma = item.ma ? item.ma.toLowerCase() : '';  // Default to an empty string if ma is undefined
    //             const hoten = item.hoten ? item.hoten.toLowerCase() : '';  // Default to an empty string if hoten is undefined

    //             return ma.includes(event.target.value.toLowerCase()) || hoten.includes(event.target.value.toLowerCase());
    //         });
    //         setViewDatas(filedata);
    //     }
    // };

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
            <div className="flex flex-col">
                <div className='fixed w-full text-md bg-white h-14 p-3 z-50'>
                    <div className="flex gap-10 items-center">
                        <button
                            className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1 select-none"
                            onClick={() => handeleView()}
                        >
                            Xem <FaEye />
                        </button>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                className="border w-56 px-2 py-0.5 outline-none"
                                placeholder="Nhập mã, tên, ..."
                                value={searchTerm}
                                spellCheck="false"
                                onChange={handleSearch}
                            />

                            <div className="w-96">
                                <Dropdown
                                    data={khoaphongs}
                                    selectedOption={selectedKP}
                                    setSelectedOption={setSelectedKP}
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
                                    chooseIndex={1}
                                    memoized
                                />
                            </div>


                            <button
                                className="text-white bg-blue-400 px-2 py-1 w-20 select-none rounded-md opacity-80 hover:opacity-100"
                                onClick={() => handleFilter()}
                            >Lọc</button>
                        </div>
                    </div>
                </div>

                <div className=" px-3 mt-14 overflow-y-auto h-[750px] w-full flex flex-col justify-between">
                    <table className="table-auto w-full">
                        <thead className="sticky top-0 bg-white z-30 ">
                            <tr className="">
                                <th className="py-1 text-center">STT</th>
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
                            </tr>
                        </thead>
                        <tbody>
                            {dataInPage.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-1 text-center">{index + 1}</td>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full flex flex-row-reverse p-2">
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPage={totalPage}
                        />
                    </div>
                </div>

                {/* Pagination */}


            </div>

        </>
    )

}

export default TaiKhoan;