import React, { useState, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles.module.css"
import moment from 'moment';

function LichHenSai( { site } ) {



    const apiURL = process.env.REACT_APP_API_URL;

    const [curDate, setCurDate] = useState(new Date());
    const [upper, setUpper] = useState(false);
    const [dsLichHen, setDSLichHen] = useState([]);

    const handleClick = async () => {
        let formatDate = moment(curDate).format('YYYYMMDD');
        try {
            const fecthURL = apiURL + "/datkham/error_datkham/" + site + "/" + formatDate + "/" + upper;

            const response = await fetch(fecthURL);
            const data = await response.json();
            setDSLichHen(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="bg-blue-300 px-2 py-1 rounded-md" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    return (
        <>
            <div className="">
                <div className="mt-2">
                    <div className='flex p-4 gap-3 items-center'>
                        <label>Ngày: </label>
                        <DatePicker
                            selected={curDate}
                            customInput={<ExampleCustomInput />}
                            onChange={(date) => setCurDate(date)}
                            dateFormat="P"
                        />
                    </div>
                    <div className='flex items-center gap-5 py-2'>
                        <div className="font-bold text-left text-lg">DANH SÁCH LỊCH HẸN SAI</div>

                        <div>
                            <button
                                className={`${styles.buttonSubmit}`}
                                onClick={() => handleClick()}
                            >Xem</button>
                        </div>
                    </div>
                    <div>
                        <table className="w-full mb-10">
                            <thead>
                                <tr className="border bg-gray-200">
                                    <th className="w-10">#</th>
                                    <th>PID</th>
                                    <th>HỌ TÊN</th>
                                    <th>LH - PK</th>
                                    <th>MÃ PK</th>
                                    <th>TÊN PK</th>
                                    <th>NGÀY</th>
                                    <th>Done</th>
                                </tr>
                            </thead>
                            <tbody className='max-h-96'>
                                {dsLichHen.map((lich, index) =>
                                    <tr className={`hover:bg-blue-100`}>
                                        <td>{index + 1}</td>
                                        <td><div className='text-left'>{lich.mabn}</div></td>
                                        <td><div className='text-left'>{lich.hoten}</div></td>
                                        <td><div className='text-left'>{lich.khamhen}</div></td>
                                        <td>{lich.makp}</td>
                                        <td><div className='text-left'>{lich.tenkp}</div></td>
                                        <td>{lich.ngay}</td>
                                        <td>{lich.done}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </>
    )
}

export default LichHenSai;