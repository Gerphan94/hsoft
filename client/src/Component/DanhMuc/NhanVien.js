import React, { useState, useEffect, memo } from "react";
import { FaEye, FaBars } from "react-icons/fa";

import Dropdown from "../Common/Dropdown";
import Toggle from "../Common/ToggleSwitch";

const NhanVien = memo(({ site }) => {

    console.log('rending nhanvien')

    const apiURL = process.env.REACT_APP_API_URL;

    const [nhomnvs, setNhomnvs] = useState([]);
    const [selectedNhomnv, setSelectedNhomnv] = useState({ id: 0, name: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [nhanviens, setNhanviens] = useState([]);
    const [viewDatas, setViewDatas] = useState([]);
    const [nghiviec, setNghiviec] = useState(false);
    const [duyetBhyt, setDuyetBhyt] = useState(false);

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
            const fecthURL = apiURL + "/danhmuc/nhanvien/" + site + "/" + nghiviec;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setNhanviens(data);
            setViewDatas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setViewDatas(nhanviens);
        }
        else {
            const filedata = nhanviens.filter((item) =>
                item.ma.toLowerCase().includes(event.target.value.toLowerCase()) || item.hoten.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setViewDatas(filedata);
        }
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-2/3">
                    <div className="w-full flex flex-row-reverse bg-white border">
                        <Toggle idname='duyet-bhyt' enabled={duyetBhyt} setEnabled={setDuyetBhyt} displayName={'Duyệt khám BHYT'} />
                        <Toggle idname='nghiviec' enabled={nghiviec} setEnabled={setNghiviec} displayName={'Nghỉ việc'} />
                    </div>

                    <div className="px-4 flex gap-4 justify-between mt-4">
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
                            < Dropdown data={nhomnvs} selectedOption={selectedNhomnv} setSelectedOption={setSelectedNhomnv} />
                        </div>




                    </div>
                    <div>
                        <div className="mt-2 px-4 w-full lg:max-h-[720px] overflow-y-auto flex justify-center" >
                            <table className="w-full">
                                <thead className="sticky top-0">
                                    <tr className="bg-gray-200 ">
                                        <th><div className=" py-1 text-center">STT</div></th>
                                        <th className="w-24"><div className="">Mã</div></th>
                                        <th className=""><div>Họ tên</div></th>
                                        <th><div className="text-left w-20">Viết tắt</div></th>
                                        <th><div className="text-left w-20">Nhóm</div></th>
                                        <th><div>Duyệt BHYT</div></th>
                                        <th><div className="text-right">Chứng chỉ</div></th>
                                        <th><div className="w-10 text-center">...</div></th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {viewDatas.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-100"
                                        >
                                            <td><div className="py-1 text-center">{index + 1}</div></td>
                                            <td className="w-24">{item.ma}</td>
                                            <td><div className="text-left h-4">{item.hoten}</div></td>
                                            <td><div className="text-left">{item.viettat}</div></td>
                                            <td><div className="text-left">{item.tennhom}</div></td>
                                            <td><div className="text-left">{item.duyetkhambhyt}</div></td>
                                            <td><div className="text-left">{item.sochungchi}</div></td>
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


});

export default NhanVien;