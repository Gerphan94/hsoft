import React, { useState, forwardRef } from "react";

import Dropdown from "../../Common/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles.module.css"
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";

function BHYTModal({ setModalShow }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [selectedKcb, setSelectedKcb] = useState({ id: '79669', name: 'Bệnh viện tâm anh HCM' });
    const [code, setCode] = useState('');

    const KCBs = [
        { id: '79669', name: '79669 - Bệnh viện tâm anh HCM' }
    ]

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="bg-blue-300 px-2 py-1 rounded-md" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));


    const Gerenrate = () => {


        let code = 'BT279802234155579669'
        setCode(code);


        console.log('Generate....')


    }



    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-1/3 h-1/2  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            THÔNG TIN THẺ BHYT
                        </div>
                        {/* BODY */}
                        <div className="flex h-full p-4 overflow-hidden ">
                            <form className="w-full" onSubmit={(e) => onSubmit(e)}>
                                <div className="text-left p-2">
                                    <label htmlFor="KCB" className="w-24">ĐK KCB</label>
                                    <Dropdown name="KCB" id="KCB" data={KCBs} selectedOption={selectedKcb} setSelectedOption={setSelectedKcb} />

                                </div>
                                <div className="text-left p-2">
                                    <label className="w-24">Mã thẻ</label>
                                    <input 
                                    name='code' 
                                    id='code' 
                                    type="text" 
                                    className="border w-full px-2 py-1 outline-none"
                                    value={code}
                                    
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="text-left p-2">
                                        <label className="w-24 block">Từ ngày:</label>
                                        <DatePicker
                                            className="border px-2 py-1 text-center outline-none w-full"
                                            name='fromDate'
                                            id='fromDate'
                                            selected={fromDate}
                                            onChange={(date) => setFromDate(date)}
                                        />
                                    </div>
                                    <div className="text-left p-2">
                                        <label className="w-24 block">Đến ngày:</label>
                                        <DatePicker
                                            className="border px-2 py-1 text-center outline-none w-full"
                                            name='toDate'
                                            id="toDate"
                                            selected={toDate}
                                            onChange={(date) => setFromDate(date)}
                                        />
                                    </div>
                                </div>


                                <div>
                                    <div 
                                    className="border rounded-md px-2 py-1 select-none bg-[#36BA98] cursor-pointer text-white text-center"
                                    onClick={Gerenrate}
                                    
                                    >Gerenrate</div>
                                </div>



                            </form>


                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className={`${styles.btn} ${styles.btnNew}`}
                            // onClick={onClickReload}
                            >
                                Xem
                            </button>

                            <button
                                className={`${styles.btn} ${styles.btnClose}`}
                                type="button"
                                onClick={() => setModalShow(false)}
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

export default BHYTModal;