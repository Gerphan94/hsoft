import React, { useState, useEffect } from "react";
import { FaEye, FaBars } from "react-icons/fa";

import Dropdown from "../Common/Dropdown";
import Toggle from "../Common/ToggleSwitch";

function TaiKhoan({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [nhomnvs, setNhomnvs] = useState([]);
    const [selectedNhomnv, setSelectedNhomnv] = useState({ id: 0, name: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [TaiKhoans, setTaiKhoans] = useState([]);
    const [viewDatas, setViewDatas] = useState([]);

    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/danh-muc/nhom-nhan-vien/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setNhomnvs(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }, []);


    const handeleView = async () => {
        try {
            const fecthURL = apiURL + "/danh-muc/tai-khoan-hsoft/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setTaiKhoans(data);
            setViewDatas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setViewDatas(TaiKhoans);
        }
        else {
            const filedata = TaiKhoans.filter((item) =>
                item.ma.toLowerCase().includes(event.target.value.toLowerCase()) || item.hoten.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setViewDatas(filedata);
        }
    };
    const handleFilter = () => {

    

    }

    return (
        <>
            <div className="w-full p-2">
                <div className="">
                    <div className="px-4 flex gap-4 justify-between">
                        <button
                            className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1"
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
                            onChange={handleSearch}
                        />
                        <div>
                        
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <input id="cboff" name="cboff" type="checkbox" />
                            <label className="select-none cursor-pointer" htmlFor="cboff">Nghỉ việc</label>
                        </div> */}
                        <div className="flex gap-4">
                        < Dropdown 
                        data={nhomnvs} 
                        selectedOption={selectedNhomnv} 
                        setSelectedOption={setSelectedNhomnv} 
                        optionALL={true}
                        chooseIndex={1}
                        />
                        <button 
                        className="text-white bg-blue-400 px-2 py-1 w-20 select-none rounded-md opacity-80 hover:opacity-100"
                        onClick={() => handleFilter()}
                        >Lọc</button>

                        </div>
                    </div>
                    <div>
                    <div className="mt-2 px-4 w-full lg:max-h-[720px] overflow-auto flex justify-center" >
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
                                    </tr>
                                ))

                                }


                            </tbody>

                        </table>
                    </div>

                    </div>

                </div>
            </div>
        </>
    )


}

export default TaiKhoan;