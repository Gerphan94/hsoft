import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAppContext } from "../Store/AppContext";

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
            console.log('data', data)
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
                        dateFormat="P"
                        className="border px-2 py-1 outline-none w-32"
                    />
                </div>
                <div>
                    <label>Từ ngày: </label>
                    <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        dateFormat="P"
                        className="border px-2 py-1 outline-none w-32"
                    />
                </div>
                <button
                    className="btn btn-view"
                    onClick={handleClickView}

                >Xem</button>
            </div>

            <div className="px-4">
                <table>
                    <thead>
                        <tr>
                            <th className="w-10">STT</th>
                            <th><div className="text-left px-2 py-0.5">Khoa điều trị</div></th>
                            <th>Mã BN</th>
                            <th>Họ tên</th>
                            <th>Tên Phác đồ</th>
                            <th>Giai đoạn</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Số ngày điều trị</th>
                            <th><div className="text-left px-2">Tên thuốc</div></th>
                            <th><div className="text-center w-10">Số lượng</div></th>
                            <th><div className="text-center w-10">Ngày KS</div></th>
                            <th><div className="text-center ">Ngày Y lệnh</div></th>
                            <th><div className="text-center ">Duyệt KS</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><div className="text-left px-2 py-1">{item.khoadieutri}</div></td>
                                <td>{item.mabn}</td>
                                <td>{item.hoten}</td>
                                <td>{item.phacdo}</td>
                                <td>{item.giaidoan}</td>
                                <td><div> {moment(item.ngaybatdau).format('DD/MM/YYYY')}</div><div></div></td>
                                <td>{item.ngayketthuc}</td>
                                <td><div className="text-center px-2">{item.songaydieutri}</div></td>
                                <td><div className="text-left px-2">{item.tenthuoc}</div></td>
                                <td><div className="text-center px-2">{item.soluong}</div></td>
                                <td><div className="text-center px-2">{item.ngayks}</div></td>
                                <td><div className="text-center px-2">{moment(item.ngayylenh).format('DD/MM/YYYY')}</div></td>
                                <td><div className="text-center px-2">{item.duyetks === 1 ? 'Có': 'Không'}</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default PhieuTheoDoiKhangSinh