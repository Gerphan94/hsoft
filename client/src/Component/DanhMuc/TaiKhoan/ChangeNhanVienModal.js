import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Store/AppContext";
import Dropdown from "../../Common/Dropdown";


function ChangeNhanVienModal({ selectedUserId, setShowAlert, setAlertMessage, setModalShow, nhanVien, nhomNV }) {

    const title = 'Nhân viên';

    const apiURL = process.env.REACT_APP_API_URL;
    const { site, area } = useAppContext();

    const [nhomNVS, setNhomNVS] = useState([])
    const [data, setData] = useState([]);
    const [selectedNv, setSelectedNv] = useState(nhanVien);
    const [selectedNhomNv, setSelectedNhomNv] = useState(nhomNV);


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
            const fetchURL = `${apiURL}danhmuc/nhanvien/summaries?site=${site}&area=${area}&nhom=${selectedNhomNv.id}`;
            console.log('fetchURL', fetchURL)
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
    }, [site]);

    // useEffect(() => {
    //     fetNhanvienList();
    // }, []);

    useEffect(() => {
        fetNhanvienList();
    }, [selectedNhomNv.id]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        formJson['userid'] = selectedUserId
        formJson['idnhom'] = selectedNhomNv.id;
        formJson['mabs'] = selectedNv.id;

        console.log('formJson', formJson)
        try {
            const fetchUrl = `${apiURL}danhmuc/taikhoan-hsoft-doinhanvien?site=${site}`
            const changeNhanvien = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
            if (changeNhanvien.ok) {
                // const data = await changeNhanvien.json();
                setModalShow(false);
                setShowAlert(true);
                setAlertMessage('Đổi nhân viên thành công!');
            } else {
                console.error('Error:', changeNhanvien.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <form className="relative lg:w-1/3 md:w-2/3 top-1/4 w-full my-6 mx-auto max-w-3xl bg-white"
                        onSubmit={(e) => handleSubmit(e)}
                    >
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
                                        setSelectedOption={setSelectedNhomNv}
                                        selectedOption={selectedNhomNv}
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
                                type="submit"
                                disabled={nhanVien.id === selectedNv.id}
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
                    </form>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>


          
        </>
    )
}

export default ChangeNhanVienModal;

