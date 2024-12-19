import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Store/AppContext";
import Dropdown from "../../Common/Dropdown";

function ChangeNhanVienModal({ setModalShow, selectedNhomNV }) {


    const title = 'Nhân viên';

    // danhmuc/nhanvien/summarires

    const apiURL = process.env.REACT_APP_API_URL;
    const { site, area } = useAppContext();

    const [nhomNVS, setNhomNVS] = useState([])
    const [data, setData] = useState([]);
    const [selectedNv, setSelectedNv] = useState({ id: 0, name: '' });
    const [selectedNhomNv2, setSelectedNhomNv2] = useState(selectedNhomNV);

    const fetchNhomNV = async () => {
        try {

            const fetchURL = `${apiURL}danhmuc/nhom-nhanvien?site=${site}`;
            const response = await fetch(fetchURL);
            const data = await response.json();
            setNhomNVS(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetNhanvienList = async () => {
        try {

            const fetchURL = `${apiURL}danhmuc/nhanvien/summaries?site=${site}&area=${area}`;
            const response = await fetch(fetchURL);
            const data = await response.json();
            const newData = data.map((item) => ({ id: item.id, name: item.id + ' - ' + item.name }));
            setData(newData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchNhomNV();
    }, []);

    useEffect(() => {
        fetNhanvienList();
    }, []);



    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative lg:w-1/3 md:w-2/3 top-1/4 w-full my-6 mx-auto max-w-3xl bg-white">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {title}
                        </div>

                        {/* BODY */}
                        <div className="p-4 space-y-2">
                            <div className="flex gap-3 items-center">
                                <div className="w-28 text-left">Nhóm</div>
                                <div className="w-full">
                                    <Dropdown
                                        data={nhomNVS}
                                        setSelectedOption={setSelectedNhomNv2}
                                        selectedOption={selectedNhomNv2}
                                        searchable
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">

                            <div className="w-28 text-left">Nhân viên</div>
                                <div className="w-full">
                                    <Dropdown
                                        data={data}
                                        setSelectedOption={setSelectedNv}
                                        selectedOption={selectedNv}
                                        searchable
                                    />
                                </div>
                            </div>

                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-save"
                                type="button"
                                onClick={() => setModalShow(false)}
                            >
                                Lưu
                            </button>
                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={() => setModalShow(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default ChangeNhanVienModal;

