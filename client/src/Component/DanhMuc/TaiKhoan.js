import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaBars } from "react-icons/fa";

import Dropdown from "../Common/Dropdown";
import Toggle from "../Common/ToggleSwitch";

function TaiKhoan({ site }) {

    console.log('rending tai khoan')
    const apiURL = process.env.REACT_APP_API_URL;

    const [nhomnvs, setNhomnvs] = useState([]);
    const [khoaphongs, setKhoaphongs] = useState([]);

    const [selectedNhomnv, setSelectedNhomnv] = useState({ id: 0, name: '' });
    const [selectedKP, setSelectedKP] = useState({ id: 0, name: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [TaiKhoans, setTaiKhoans] = useState([]);
    const [viewDatas, setViewDatas] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    useEffect(() => () => {
        const fetchNhomnvs = async () => {
            try {
                const fecthURL = apiURL + "/danh-muc/nhom-nhan-vien/" + site;
                console.log("call", fecthURL)
                const response = await fetch(fecthURL);
                const data = await response.json();
                setNhomnvs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        const fetchKhoaphongs = async () => {
            try {
                const fecthURL = apiURL + "noitru/dskhoa/" + site;
                console.log("call", fecthURL)
                const response = await fetch(fecthURL);
                const data = await response.json();
                setKhoaphongs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchNhomnvs();
        fetchKhoaphongs();


    }, [site]);


    const selectNhomnv = useCallback((selected) => {
        setSelectedNhomnv({ id: selected.id, name: selected.name });
    }, [])


    const handeleView = async () => {
        try {
            const fecthURL = apiURL + "/danh-muc/tai-khoan-hsoft/" + site;
            console.log("call", fecthURL)
            const response = await fetch(fecthURL);
            const data = await response.json();
            setTaiKhoans(data);
            setViewDatas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm === '') {
            setViewDatas(TaiKhoans);
        } else {
            const filedata = viewDatas.filter((item) => {
                const userid = item.userid ? item.userid.toLowerCase() : '';
                const ma = item.ma ? item.ma.toLowerCase() : '';
                const hoten = item.hoten ? item.hoten.toLowerCase() : '';

                return ma.includes(debouncedSearchTerm.toLowerCase()) || hoten.includes(debouncedSearchTerm.toLowerCase()) || userid.includes(debouncedSearchTerm.toLowerCase());
            });
            setViewDatas(filedata);
        }
    }, [debouncedSearchTerm]);

    // Input onChange handler
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // const handleSearch = (event) => {
    //     setSearchTerm(event.target.value);

    //     if (event.target.value === '') {
    //         setViewDatas(TaiKhoans);  // Reset to the full list
    //     } else {
    //         const filedata = TaiKhoans.filter((item) => {
    //             const ma = item.ma ? item.ma.toLowerCase() : '';  // Default to an empty string if ma is undefined
    //             const hoten = item.hoten ? item.hoten.toLowerCase() : '';  // Default to an empty string if hoten is undefined

    //             return ma.includes(event.target.value.toLowerCase()) || hoten.includes(event.target.value.toLowerCase());
    //         });
    //         setViewDatas(filedata);
    //     }
    // };

    const handleFilter = () => {
        console.log('handleFilter', selectedKP, selectedNhomnv)
        setSearchTerm('');
        const filterData = TaiKhoans.filter((item) => {
            let matchesAllFilters = true;
            if (selectedNhomnv.id > 0) {
                matchesAllFilters = item.manhomnv === selectedNhomnv.id;
            }
            if (selectedKP.id > 0 && item.makp !== '' && item.makp !== null) {
                const isPresent = item.makp
                    .split(',')
                    .map(item => item.trim()) // Remove any extra spaces around the numbers
                    .includes(selectedKP.id.toString());
                matchesAllFilters = isPresent
            }

            return matchesAllFilters;
        });
        setViewDatas(filterData);
    }

    return (
        <>
            <div className="w-full p-2 flex flex-col flex-grow">
                    <div className="px-4 flex gap-4 justify-between">
                        <button
                            className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1 select-none"
                            onClick={() => handeleView()}
                        >Xem
                            <FaEye />
                        </button>
                        <input
                            type="text"
                            className="border w-56 px-2 py-1 outline-none"
                            placeholder="Nhập mã, tên, ..."
                            value={searchTerm}
                            spellCheck="false"
                            onChange={(event) => handleSearch(event)}
                        />
                        <div>

                        </div>
                        {/* <div className="flex items-center gap-2">
                            <input id="cboff" name="cboff" type="checkbox" />
                            <label className="select-none cursor-pointer" htmlFor="cboff">Nghỉ việc</label>
                        </div> */}
                        <div className="flex gap-4">
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
                    <div>
                        <div className="mt-2 px-4 w-full h-[600px]  overflow-auto" >
                            <table className="w-full">
                                <thead className="sticky top-0">
                                    <tr className="bg-gray-200 ">
                                        <th><div className=" py-1 text-center">STT</div></th>
                                        <th className="w-24"><div className="">ID</div></th>
                                        <th className=""><div>UserID</div></th>
                                        <th><div className="text-left w-20">Pwd</div></th>
                                        <th><div className="text-left w-20">Tên TK</div></th>
                                        <th><div>Mã NV</div></th>
                                        <th><div className="text-left">Họ tên NV</div></th>
                                        <th><div className="text-left">Tên Nhóm</div></th>
                                        {/* <th><div className="text-center">Số chứng chỉ</div></th> */}
                                        <th><div className="text-left">Chứng thư số</div></th>
                                        <th><div className="text-left">Pin</div></th>
                                        <th><div className="text-left hidden">khoa/phong</div></th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {viewDatas.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={`border-b hover:bg-gray-100 ${item.duyetkhambhyt === 1 && 'text-blue-500'}`}
                                        >
                                            <td><div className="py-1 text-center">{index + 1}</div></td>
                                            <td className="w-24">{item.id}</td>
                                            <td><div className="text-left h-4">{item.userid}</div></td>
                                            <td><div className="text-left">{item.password_}</div></td>
                                            <td><div className="text-left">{item.tentaikhoan}</div></td>
                                            <td><div className="text-left">{item.mabs}</div></td>
                                            <td><div className="text-left">{item.hoten}</div></td>
                                            <td><div className="text-left">{item.tennhom}</div></td>
                                            {/* <td><div className="text-left">{item.sochungchi}</div></td> */}
                                            <td><div className="text-left">{item.chungthuso}</div></td>
                                            <td><div className="text-left">{item.pin}</div></td>
                                            <td><div className="text-left hidden">{item.makp}</div></td>
                                        </tr>
                                    ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
            </div>
        </>
    )


}

export default TaiKhoan;