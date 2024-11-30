import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAppContext } from "../Store/AppContext";

import TheoDoiKhangSinhComponent from "./TheoDoiKhangSinhComponent";

import moment from "moment";
function PhieuTheoDoiKhangSinh() {

    const { site } = useAppContext();

    const apiURL = process.env.REACT_APP_API_URL;

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [data, setData] = useState([]);

    const handleClickView = async () => {
        const formatFDate = moment(fromDate).format('YYYYMMDD');
        const formatTDate = moment(toDate).format('YYYYMMDD');
        const fecthURL = `${apiURL}dsphieu/theodoi-khangsinh?site=${site}&fromdate=${formatFDate}&todate=${formatTDate}`
        try {
            const response = await fetch(fecthURL);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className="flex gap-2 items-center px-4 py-2">
                <div >
                    <label>Từ ngày: </label>
                    <DatePicker
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="border px-2 py-1 outline-none w-32"
                    />
                </div>
                <div>
                    <label>Từ ngày: </label>
                    <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="border px-2 py-1 outline-none w-32"
                    />
                </div>
                <button
                    className="btn btn-view"
                    onClick={handleClickView}

                >Xem</button>
            </div>

            <div className="px-4 mb-20">
                {data.map((item) => (
                    <TheoDoiKhangSinhComponent key={item.makp} data={item} />
                ))}

                
            </div>
        </>
    )

}

export default PhieuTheoDoiKhangSinh