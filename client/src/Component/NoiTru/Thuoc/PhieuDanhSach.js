import React, { useEffect, useState } from "react";
import Phieu from "./Phieu";

function PhieuDanhSach({ date, entries, setMedicineDetail, setDutrullDetail, selectedCoupon, setSelectedCoupon }) {

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    const today = new Date();
    const homnayfo = formatDate(today);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (date === homnayfo) {
            setShow(true);
        }
    }, [date]);

    return (
        <div>
            <div key={date} className="">
                <div className="">
                    <div
                        onClick={() => setShow(!show)}
                        className="w-full px-2 py-1 bg-slate-200 mb-2 flex items-center justify-between"
                    >
                        <div className="select-none"> Ngày: {date}</div>
                        <span className="px-2 font-bold select-none">{entries.length}</span>
                    </div>
                </div>
                {show && entries.map(item => (
                    <Phieu
                        item={item}
                        setMedicineDetail={setMedicineDetail}
                        selectedCoupon={selectedCoupon}
                        setDutrullDetail={setDutrullDetail}
                        setSelectedCoupon={setSelectedCoupon}
                    />
                ))}
            </div>
        </div>
    );
}

export default PhieuDanhSach;