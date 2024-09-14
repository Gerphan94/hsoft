import React, { useState, useEffect, memo } from "react";
import { FaEye, FaBars } from "react-icons/fa";

import Dropdown from "../Common/Dropdown";
import Toggle from "../Common/ToggleSwitch";
import { FaUserNurse } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";

const NhanVien = memo(({ site }) => {

    console.log('rending nhanvien')

    const apiURL = process.env.REACT_APP_API_URL;

    const [nhomnvs, setNhomnvs] = useState([]);
    const [selectedNhomnv, setSelectedNhomnv] = useState({ id: 0, name: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [nhanviens, setNhanviens] = useState([]);
    const [viewDatas, setViewDatas] = useState([]);
    const [nghiviec, setNghiviec] = useState(false);
    const [duyetBhyt, setDuyetBhyt] = useState(-1);
    const [vaitros, setVaitros] = useState([]);
    const [selectedVaitroId, setSelectedVaitroId] = useState(0);

    const colors = [
        '#D2E0FB',
        '#384B70',
        '#117554',
        '#FF885B',
        '#A7FFEB',
        '#CBF0F8',
        '#AECBFA',
        '#FABC3F'
    ]



    useEffect(() => {

        const fetchNhomnv = async () => {
            try {
                const fecthURL = apiURL + "/danh-muc/nhom-nhan-vien/" + site;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setNhomnvs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        const fetchVaitro = async () => {
            try {
                const fetchUrl = apiURL + "danh-muc/vaitro-nhanvien/" + site;
                const response = await fetch(fetchUrl);
                const responseData = await response.json();
                setVaitros(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNhomnv();
        fetchVaitro();

    }, [site]);




    const handeleView = async () => {
        try {
            const fecthURL = apiURL + "/danhmuc/nhanvien/" + site + "/" + nghiviec + "/" + duyetBhyt + "/" + selectedVaitroId;
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

    const parseVaitro = (vaitro) => {
        // vaitro maybe = '2,4.6
        if (vaitro) {
            const vaitros = vaitro.split(',');
            return (
                <div className="grid grid-cols-4">
                    {vaitros.map((vaitro, index) =>
                        <span key={index} className="font-bold" ><IoPersonCircle style={{ color: colors[vaitro-1] }} /></span>
                    )}

                </div>
            )

        }
        return <></>;

    }


    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-2/3">
                    <div className="w-full p-2 flex flex-row-reverse gap-2 bg-white border">
                        <button
                            className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1"
                            onClick={() => handeleView()}
                        >Xem
                            <FaEye />
                        </button>
                        <Toggle idname='nghiviec' enabled={nghiviec} setEnabled={setNghiviec} displayName={'Nghỉ việc'} />
                        <div className="flex items-center">
                            <label className="px-4 font-medium" htmlFor="khambhyt">Khám BHYT</label>
                            <select
                                id='khambhyt' name="khambhyt"
                                className="border outline-none px-2 py-0.5"
                                onChange={(e) => setDuyetBhyt(e.target.value)}

                            >
                                <option value={-1}></option>
                                <option value={0}>Không duyệt BHYT</option>
                                <option value={1}>Duyệt BHYT</option>

                            </select>
                        </div>


                        <div className="flex items-center">
                            <label className="px-4 font-medium" htmlFor="vaitro">Vai trò</label>
                            <select
                                id='vaitro'
                                name="vaitro"
                                className="border outline-none px-2 py-0.5"
                                onChange={(e) => setSelectedVaitroId(e.target.value)}

                            >
                                <option value={0}></option>
                                {vaitros.map((ele, index) => <option key={index} value={ele.id}>{ele.name}</option>)}

                            </select>
                        </div>
                        <input
                            type="text"
                            className="border w-56 px-2 py-1 outline-none"
                            placeholder="Nhập mã, tên, ..."
                            value={searchTerm}
                            spellCheck="false"
                            onChange={handleSearch}
                        />
                       


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
                                        <th><div className="text-center">Chứng chỉ</div></th>
                                        <th>Vai trò</th>
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
                                            <td><div className={`text-left h-4 ${item.duyetkhambhyt === 1 ? 'text-blue-500' : ''} `}>{item.hoten}</div></td>
                                            <td><div className="text-left">{item.viettat}</div></td>
                                            <td><div className="text-left">{item.tennhom}</div></td>
                                            <td><div className="text-left">{item.sochungchi}</div></td>
                                            <td>

                                                <div className="flex">
                                                    {parseVaitro(item.vaitro)}

                                                </div>
                                            </td>
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