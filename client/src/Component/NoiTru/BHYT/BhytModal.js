import React, { useState, useEffect, forwardRef } from "react";

import Dropdown from "../../Common/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles.module.css"
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";

function BHYTModal({ site, setModalShow, selected }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const tinhthanh = [
        { id: 101, name: 'Hà Nội' },
        { id: 701, name: 'Hồ Chí Minh' }
    ]
    const [selectedDT, setSelectedDT] = useState({ id: 0, name: '' });
    const [selectedTinhthanh, setSelectedTinhthanh] = useState({ id: 701, name: 'Hồ Chí Minh' });

    const [cosoKCB, setCosoKCB] = useState([]);


    const [enable, setEnable] = useState(true);

    const [formData, setFormData] = useState({
        doituong: { id: 1, name: 'Thu phí' },
        sothe: '',
        fromDate: new Date(),
        toDate: new Date()
    });

    // fetchCOSO_KCB
    const fetchCOSO_KCB = async () => {

        try {
            const fetchUrl = apiURL + "/danh-muc/coso-kcb-of-tinhthanh/" + site + "/" + selectedTinhthanh.id;
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setCosoKCB(data);

        }
        catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    const generateRandomString = (n) => {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < n; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    const Gerenrate = () => {
        const today = new Date();
        const nextYear = new Date(today);
        nextYear.setFullYear(today.getFullYear() + 1);
        nextYear.setDate(nextYear.getDate() - 1);
        const tmp_sothe = 'GD479' + generateRandomString(10) + '79669'
        setFormData({
            sothe: tmp_sothe,
            fromDate: today,
            toDate: nextYear
        });
        console.log("Generate...." + tmp_sothe)
    }

    useEffect(() => {
        const fetchDoituong = async () => {

            try {
                const fetchUrl = apiURL + "/noi-tru/get-benhandt-doituong/" + site + "/" + selected.maql;
                const response = await fetch(fetchUrl);
                const data = await response.json();
                console.log(data.madoituong)
                setSelectedDT({ id: data.madoituong, name: data.doituong });
                Gerenrate();
                // setFormData({
                //     doituong: selectedDT,
                //     sothe: 'GD4' + generateRandomString() + '79669',
                //     fromDate: new Date(),
                //     toDate: new Date()

                // });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDoituong();
        fetchCOSO_KCB();

    }, [])


    const [selectedKcb, setSelectedKcb] = useState({ id: '79669', name: '79669 - Bệnh viện tâm anh HCM' });
    const [code, setCode] = useState('');

    const KCBs = [
        { id: '79669', name: '79669 - Bệnh viện tâm anh HCM' }
    ]


    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        formJson['mabv'] = '79669';
        formJson['pid'] = selected.pid;
        formJson['maql'] = selected.maql;
        formJson['madoituong'] = 1;
        console.log(formJson);
        try {
            const insertBHYT = await fetch(apiURL + 'noi-tru/insert-bhyt/' + site, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
            // const updateDoituong = await fetch(apiURL + 'noi-tru/update-doituong/' + site, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formJson),
            // });
            if (insertBHYT.ok) {
                const data = await insertBHYT.json();
                console.log(data);
            }

        } catch (error) {
            console.error('Error:', error.message);
        }

    }

    return (
        <>
            <div className=" fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-1/4 h-2/3  mx-auto bg-white">
                    <form
                        className="w-full h-full flex flex-col justify-between"
                        onSubmit={(e) => onSubmit(e)}
                        spellCheck="false"
                        autoComplete="off"
                    >
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            THÔNG TIN ĐỐI TƯỢNG
                        </div>

                        <div className=" h-full flex flex-col flex-grow p-4 overflow-hidden ">
                            <div className="text-left p-2">
                                <label htmlFor="KCB" className="w-24">Tỉnh/thành</label>
                                <div className="py-1">
                                    <Dropdown
                                        name="KCB"
                                        id="KCB"
                                        data={tinhthanh}
                                        selectedOption={selectedTinhthanh}
                                        searchable={false}
                                        setSelectedOption={setSelectedTinhthanh}
                                    />
                                </div>
                            </div>

                            <div className="text-left p-2">
                                <label htmlFor="KCB" className="w-24">ĐK KCB</label>
                                <div className="py-1">
                                    <Dropdown
                                        name="KCB"
                                        id="KCB" data={cosoKCB}
                                        selectedOption={selectedKcb}
                                        setSelectedOption={setSelectedKcb}
                                    />
                                </div>
                            </div>
                            <div className="text-left p-2">
                                <label className="w-24">Mã thẻ</label>
                                <input
                                    required={true}
                                    name='sothe'
                                    id='sothe'
                                    type="text"
                                    className="border w-full px-2 py-1 outline-none"
                                    value={formData.sothe}
                                />
                                <input
                                    className="border w-full px-2 py-1 outline-none"

                                    name='sothe-l'
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="text-left p-2">
                                    <label className="w-24 block">Từ ngày:</label>
                                    <DatePicker
                                        className="border px-2 py-1 text-center outline-none w-full"
                                        name='fromDate'
                                        id='fromDate'
                                        dateFormat="dd/MM/yyyy"
                                        selected={formData.fromDate}
                                    />
                                </div>
                                <div className="text-left p-2">
                                    <label className="w-24 block">Đến ngày:</label>
                                    <DatePicker
                                        className="border px-2 py-1 text-center outline-none w-full"
                                        name='toDate'
                                        id="toDate"
                                        dateFormat="dd/MM/yyyy"
                                        selected={formData.toDate}
                                    />
                                </div>
                            </div>
                            <div>
                                <div
                                    className="border rounded-md px-2 py-1 select-none bg-[#36BA98] cursor-pointer text-white text-center"
                                    onClick={Gerenrate}
                                >Gerenrate</div>
                            </div>

                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            {selectedDT.id === 2 &&

                                <button
                                    className={`${styles.btn} ${styles.btnOk}`}
                                    type="submit"
                                >

                                    Cấp BHYT
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
        </>
    )
}

export default BHYTModal;