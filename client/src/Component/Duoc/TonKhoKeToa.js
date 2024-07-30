import React, { useState, useEffect } from "react";
import { FaEye, FaBars } from "react-icons/fa";

function TonKhoKeToa({ site, type }) {

    const apiURL = process.env.REACT_APP_API_URL;


    // duoc/tonkho_ketoa_pk/<site>
    const [pharmars, setPharmars] = useState([]);
    const [viewDatas, setViewDatas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handeleView = async () => {
        console.log("Start view....")
        try {
            const fecthURL = apiURL + "/duoc/tonkho_ketoa_pk/" + site + "/" + type;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setPharmars(data);
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
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setViewDatas(pharmars);
        }
        else {
            const filedata = pharmars.filter((item) =>
                item.mabd.toLowerCase().includes(event.target.value.toLowerCase()) || item.tenbd.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setViewDatas(filedata);
        }
    };

    return (
        <>
            <div className="px-4 flex gap-4">
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
            </div>
            <div>
                <div className="mt-2 px-4 w-full lg:h-[720px] overflow-y-auto" >
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-200 ">
                                <th className="text-center"><div className="w-6 py-1 text-center">STT</div></th>
                                <th className="w-24"><div className="">Mã BD</div></th>
                                <th className="w-[600px]"><div>Tên BD</div></th>
                                <th><div className="text-left w-20">DVT-DVD</div></th>
                                <th><div>Đường dùng</div></th>
                                <th><div className="text-right">BHYT</div></th>
                                <th><div className="text-right">Tồn thực</div></th>
                                <th><div>SL YC</div></th>
                                <th><div className="w-10 text-center">SLKD</div></th>
                                <th><div className="w-10 text-center">TồnBH</div></th>
                                <th><div className="w-10 text-center">...</div></th>
                            </tr>

                        </thead>
                        <tbody>
                            {viewDatas.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100 even:bg-blue-50">
                                    <td className="py-1 text-center">{index + 1}</td>
                                    <td className="">{item.mabd}</td>
                                    <td className="text-left">{item.tenbd}</td>
                                    <td className="text-left">{item.dvt} - {item.dvd}</td>
                                    <td className="">{item.duongdung}</td>
                                    <td className="">{item.bhyt}</td>
                                    <td className="text-right">{item.tonthuc}</td>
                                    <td className="text-right">{item.booking}</td>
                                    <td className="text-right">{item.tonkhadung}</td>
                                    <td className="text-right">{item.tonbhyt}</td>

                                    <td>
                                        <div className="flex justify-center">
                                            <button
                                                className=" px-2 py-1 rounded-md"
                                            >
                                                <FaBars />
                                            </button>
                                            <button
                                                className=" px-2 py-1 rounded-md"
                                            >
                                                <FaBars />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>



            </div>
        </>
    )



}

export default TonKhoKeToa;