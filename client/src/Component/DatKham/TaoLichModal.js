import React, { useState } from "react";
import styles from "../styles.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentCreateModal({ site, setModalShow }) {

    const apiURL = process.env.REACT_APP_API_URL;


    const [appointDate, setAppointDate] = useState(new Date());
    const [pid, SetPid] = useState('');
    const [pidSelected, SetPidSelected] = useState('');


    const [department, setDepartment] = useState({ makp: '011', tenkp: 'Phòng Khám Sản - phụ khoa 1' });
    const [avalablePID, setAvalablePID] = useState(false);
    const [personInfo, setPersonInfo] = useState({});


    const phongkham = [
        { makp: '011', tenkp: 'Phòng Khám Sản - phụ khoa 1' },
        { makp: '012', tenkp: 'Phòng Khám Sản - phụ khoa 2' }
    ]

    const benhnhan_hcm = ['21023228']

    const [partients, setPartients] = useState(benhnhan_hcm);




    const handleChangePID = (event) => {
        event.preventDefault();
        const numericValue = event.target.value.replace(/[^0-9]/g, "");
        console.log(numericValue);
        SetPid(numericValue);
    }

    const handleBlur = async () => {
        console.log('Input lost focus:', pid);
        try {
            const fecthURL = apiURL + "thongtin_benhnhan/" + site + "/" + pid;
            const response = await fetch(fecthURL);
            const data = await response.json();
            console.log(data);
            const code = response.status;
            if (code === 404) {
                setAvalablePID(false);
                setPersonInfo({})
            }
            else {
                setAvalablePID(true);
                setPersonInfo(data);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // You can perform any additional actions here, such as validation or submitting data
    };

    const handleChangeDpm = (event) => {
        const selectedMakp = event.target.value;
        const selectedTenkp = phongkham.find((pk) => pk.makp === selectedMakp)?.tenkp || '';
        console.log(selectedMakp, selectedTenkp);
        setDepartment({ makp: selectedMakp, tenkp: selectedTenkp });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SUBMIT");
        const fecthURL = apiURL + "taolichkham/" + site

        fetch(fecthURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pid: pid,
                makp: department.makp,
                tenkp: department.tenkp
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };



    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative lg:w-80 md:w-2/3 top-1/4 w-full my-6 mx-auto max-w-3xl bg-white">
                        {/* HEADER */}
                        <form method="POST" autoComplete="off" spellCheck={false} onSubmit={(e) => handleSubmit(e)} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}>


                            <div className="text-left  border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                                <div className="text-lg font-bold">
                                    TẠO LỊCH
                                </div>
                            </div>

                            {/* BODY */}
                            <div className="min-h-40 p-4 text-left">
                                <div className="block mb-2 ">
                                    <label className="w-full block font-bold mb-1">Phòng khám:</label>
                                    <select
                                        className="border outline-none px-2 py-1 w-full"
                                        value={department.makp}
                                        onChange={handleChangeDpm}
                                    >
                                        {phongkham.map((pk) =>
                                            <option value={pk.makp}>{pk.tenkp}</option>
                                        )}
                                    </select>
                                </div>
                                <div className=" block mb-2">
                                    <label htmlFor="inputPID" className="w-full block mb-1 font-bold">Chọn BN: </label>
                                    <select 
                                    className="border px-2 py-1 w-full" 
                                    onChange={() => handleChangePID() }
                                    value={pidSelected}
                                    
                                    >
                                        <option value={''}>---Chọn bệnh nhân</option>
                                        {partients.map((partient) =>
                                            <option value={partient}>{partient}</option>
                                        ) }
                                    </select>
                                </div>
                                <div className=" block mb-2">
                                    <label htmlFor="inputPID" className="w-full block mb-1 font-bold">Mã BN: </label>
                                    <input
                                        name="inputPID"
                                        className="border outline-none px-2 py-1"
                                        type="text"
                                        value={pid}
                                        onChange={handleChangePID}
                                        onBlur={handleBlur}

                                    />
                                </div>
                                <div className="mb-2 py-2">
                                    {avalablePID ?
                                        <div>
                                            <div>{personInfo.pid}</div>

                                            <div className="font-bold text-lg">{personInfo.hoten}</div>

                                        </div>
                                        :
                                        <div className="font-bold text-lg text-red-500"> KHÔNG TÌM THẤY THÔNG TIN </div>

                                    }

                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                                {avalablePID ?
                                    <button
                                        className={`${styles.btn} ${styles.btnOk}`}
                                        type="submit" >
                                        Tạo
                                    </button>
                                    :
                                    <button
                                        className={`${styles.btn} ${styles.btnNotAllowed} !cursor-not-allowed`}
                                        type="submit"
                                        disabled={true}
                                    >
                                        Tạo
                                    </button>
                                }

                                <button
                                    className={`${styles.btn} ${styles.btnClose}`}
                                    type="button"
                                    onClick={() => setModalShow(false)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default AppointmentCreateModal;

