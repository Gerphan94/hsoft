import React, { useState, useEffect, forwardRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FcFolder, FcInTransit, FcCalculator, FcApproval } from "react-icons/fc";
import { SuccessAlert } from "../../Common/Alert";

function DanhSachPhieuModal({ site, setShowModal, khoa }) {

    const apiURL = process.env.REACT_APP_API_URL
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());


    const [data, setData] = useState([]);

    const [selectedPhieu, setSelectedPhieu] = useState({ id: '', done: 0 })
    const [disableChuyenPhieu, setDisableChuyenPhieu] = useState(true)
    const [disableThuHoi, setDisableThuHoi] = useState(true)

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleClickView = async () => {
        const formatDate = moment(fromDate).format('YYYYMMDD');
        console.log('formatDate', formatDate)
        const fecthURL = apiURL + "noitru/thuoc/danhsach-phieudalap/" + site + "/" + khoa.id + "/" + formatDate
        try {
            const response = await fetch(fecthURL);
            const data = await response.json();
            setData(data);
            console.log('data', data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleClickPhieu = (id, done) => {
        setSelectedPhieu({ id: id, done: done })
        if (done === 0) {
            setDisableChuyenPhieu(false);
            setDisableThuHoi(true);
        }
        else if (done === 1) {
            setDisableChuyenPhieu(true);
            setDisableThuHoi(false);

        }
        else {
            setDisableChuyenPhieu(true);
            setDisableThuHoi(true);
        }

    }
    const handleClickChuyenPhieu = () => {
        setShowAlert(true);
        setAlertMessage('Chuyển phiếu thành công')
    }



    return (
        <>
            <div className=" fixed inset-0 z-[100] outline-none focus:outline-none p-10 pb-20 w-screen h-screen">
                <div className="relative top-20 w-2/3 h-2/3 mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        <div className="w-full text-left text-lg font-bold border-b-black px-4 py-1 bg-[#9BB0C1]">
                            Danh sách phiếu
                        </div>
                        <div className="h-full flex flex-col   p-4 space-y-4">
                            <div className="flex gap-1 items-center">
                                <div className="">
                                    <label className="">Ngày:</label>
                                    <DatePicker
                                        className="w-28 border px-2 py-0.5 ml-2 text-center outline-none "
                                        name='fromDate'
                                        id='fromDate'
                                        dateFormat="dd/MM/yyyy"
                                        selected={fromDate}
                                        onChange={(date) => setFromDate(date)}
                                    />
                                </div>
                               
                                <button
                                    className="btn btn-view ml-10"
                                    onClick={handleClickView}

                                >Xem</button>
                            </div>
                            <div className="text-sm">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="w-10"></th>
                                            <th><div className="py-1">STT</div></th>
                                            <th className="text-left">Tên phiếu</th>
                                            <th className="text-left">Tên Khoa Dược</th>
                                            <th>Tủ trực</th>
                                            <th>Kho</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={item.idduyet}
                                                className={`${selectedPhieu.id === item.idduyet  ? '!bg-[#96C9F4] font-medium' : '' } cursor-pointer`}
                                                onClick={() => handleClickPhieu(item.idduyet, item.done)}


                                            >
                                                <td className="px-2">
                                                    {item.done === 0 && <span><FcFolder /></span>}
                                                    {item.done === 1 && <span><FcInTransit /></span>}
                                                    {item.done === 2 && <span><FcApproval /></span>}
                                                    {item.done === 3 && <span><FcCalculator /></span>}
                                                </td>
                                                <td><div className="py-1">{index + 1}</div></td>
                                                <td className="text-left">{item.tenphieu}</td>
                                                <td className="text-left">{item.tenkhoaduoc}</td>
                                                <td className="text-left">{item.tentt}</td>
                                                <td className="text-left">{item.tenkho}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                        <button
                            disabled={disableChuyenPhieu}
                            className="btn btn-view"
                            onClick={handleClickChuyenPhieu}
                        >
                            Chuyển phiếu
                        </button>
                        <button
                            disabled={disableThuHoi}
                            className="btn btn-view"
                        >
                           Thu hồi
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


            <div className="w-screen h-screen opacity-75 fixed inset-0 z-[90] bg-black"></div>
            {showAlert && <SuccessAlert visible={showAlert} setVisible={setShowAlert} message={alertMessage} />}

        </>
    )
}

export default DanhSachPhieuModal;