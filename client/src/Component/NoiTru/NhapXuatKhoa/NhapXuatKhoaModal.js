import React, { useEffect, useState } from "react";
import Dropdown from "../../Common/Dropdown";
import { useAppContext } from "../../Store/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function NhapXuatKhoaModal({ setShowModal, selected }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const { site, area } = useAppContext();


    const [title, setTitle] = useState('Danh sách nhập khoa');

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: 0, name: '' });

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());


    useEffect(() => {
        const fetchDanhsachKhoa = async () => {
            try {
                const fecthURL = apiURL + "/noitru/dskhoa/" + site + "/" + area;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setKhoas(data);
                setSelectedKhoa({ id: data[0].id, name: data[0].name });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDanhsachKhoa();
    }, []);




    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {title}
                        </div>
                        {/* BODY */}
                        <div className=" h-full p-4 overflow-hidden ">
                            <div className="flex gap-10 items-center">
                                <div className="flex">
                                    <button className="px-2 py-1 border">Nhập Khoa</button>
                                    <button className="px-2 py-1 border">Xuất Khoa</button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label>Khoa: </label>
                                    <div className="w-[600px]">
                                        <Dropdown
                                            data={khoas}
                                            selectedOption={selectedKhoa}
                                            setSelectedOption={setSelectedKhoa}
                                            searchable
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-4">
                                    <div className="">
                                        <label className="">Từ ngày:</label>
                                        <DatePicker
                                            className="w-28 border px-2 py-0.5 ml-2 text-center outline-none "
                                            name='fromDate'
                                            id='fromDate'
                                            dateFormat="dd/MM/yyyy"
                                            selected={fromDate}
                                            onChange={(date) => setFromDate(date)}
                                        />
                                    </div>
                                    <div className="">
                                        <label className="">Đến ngày:</label>
                                        <DatePicker
                                            className="w-28 border px-2 py-0.5 ml-2 text-center outline-none "
                                            name='toDate'
                                            id='toDate'
                                            dateFormat="dd/MM/yyyy"
                                            selected={toDate}
                                            onChange={(date) => setToDate(date)}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-view">Xem</button>
                            </div>
                            <div className="h-full w-full flex-grow overflow-y-auto pb-10">


                            </div>

                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-view"
                            >
                                Xem
                            </button>

                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>



                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default NhapXuatKhoaModal;