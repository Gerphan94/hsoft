import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles.module.css"
import moment from 'moment';
import DichVuModal from "./DichvuModal";
import ThuocModal from "./ThuocModal";

import Notice from "../Message/Notice";
import ButtonMenu from "../ButtonMenu";
import ViewButton from "../Button/ViewButton";

function KhamBenh({ site }) {
    const apiURL = process.env.REACT_APP_API_URL;

   

    const [searchTerm, setSearchTerm] = useState('');

    const [viewDate, setViewDate] = useState(new Date());
    const [initData, setInitData] = useState([]);
    const [viewData, setViewData] = useState([]);

    const [curMAQL, setCurMAQL] = useState('');

    const [dichvuShow, setDichvuShow] = useState(false);
    const [thuocShow, setThuocShow] = useState(false);

    const [noticeshow, setNoticeShow] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState('');
    const [noticeType, setNoticeType] = useState('');


    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="bg-blue-300 w-32 px-2 py-1 rounded-md" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const handleView = async () => {
        let formatDate = moment(viewDate).format('YYYYMMDD');
        try {
            const fecthURL = apiURL + "/khambenh/" + site + "/" + formatDate;

            const response = await fetch(fecthURL);
            const data = await response.json();
            console.log(data);
            setViewData(data);
            setInitData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setViewData(initData);
        }
        else {
            const filedata = initData.filter((item) =>
                item.mabn.toLowerCase().includes(searchTerm.toLowerCase()) || item.hoten.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setViewData(filedata);
        }
    };

    const handleClick = (maql) => {
        if (maql !== null) {
            setCurMAQL(maql);
        }
    }

    const handleClickShow = (id) => {
        if (id === 'dichvu') {
            setDichvuShow(true);
        }
        else if (id === 'thuoc') {
            setThuocShow(true);
        }
    }

    const handleClickPID = (pid) => {
        navigator.clipboard.writeText(pid).then(() => {
            setNoticeMessage('Đã copy ' + pid);
            setNoticeType('success');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
        setNoticeShow(true);
    }

    return (
        <>
            {noticeshow &&
                <Notice message={noticeMessage} setModalshow={setNoticeShow} type={noticeType} />
            }
            <div className="flex items-center gap-10 w-full h-12 border-b p-2">
                <ButtonMenu />
                <div className="font-bold text-xl">DANH SÁCH KHÁM BỆNH</div>
                <div>
                    <label>Ngày: </label>
                    <DatePicker
                        selected={viewDate}
                        customInput={<ExampleCustomInput />}
                        onChange={(date) => setViewDate(date)}
                        dateFormat="P"
                    />
                </div>
                <div>
                    <ViewButton onClick={handleView} />
                    
                </div>
                <div className="flex gap-4">
                    <input
                        className="border px-2 py-1 outline-none"
                        value={searchTerm}
                        onChange={handleSearch}

                    />

                </div>

            </div>
            <div className=" h-12 px-4 py-2 flex">


                

            </div>

            {/* TABLE */}
            <div className="mt-0 px-4 w-full h-[740px] overflow-y-auto" >
                <table className="w-full">
                    <thead className="sticky top-0">
                        <tr className="bg-gray-200">
                            <th className="w-10 py-1"></th>
                            <th className="w-10 py-1">STT</th>
                            <th className="w-20">PID</th>
                            <th className="w-56">Họ tên</th>
                            <th className="w-20">Giới tính</th>
                            <th className="w-24">Ngày sinh</th>
                            <th className="w-64">Phòng khám</th>
                            <th className="w-20">Đối tượng</th>
                            <th className="w-40">Ngày tiếp đón</th>
                            <th className="w-40">Ngày khám</th>
                            <th className="">Done</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {viewData.map((data, index) =>
                            <tr
                                className={` ${data.maqlkb === null ? "text-gray-300 cursor-not-allowed " : curMAQL === data.maqlkb ? "bg-blue-300" : "hover:bg-blue-300 cursor-pointer"}`}
                                onClick={() => handleClick(data.maqlkb)}
                            >
                                <td><div className="flex justify-center p-2">
                                    <span className={`${data.maqlkb === null ? "" : "bg-blue-400"} w-4 h-4 rounded-md`}  ></span>
                                </div></td>
                                <td>{index + 1}</td>
                                <td><div className="text-left px-2" onClick={() => handleClickPID(data.mabn)}>{data.mabn}</div></td>
                                <td className=""><div className="text-left px-4 py-1">{data.hoten}</div></td>
                                <td><div>{data.phai}</div></td>
                                <td>{data.ngaysinh}</td>
                                <td><div className="text-left px-2">{data.tenkp}</div></td>
                                <td><div className="text-left px-2">{data.doituong}</div></td>
                                <td><div className="text-left px-2">{data.ngaytn}</div></td>
                                <td><div className="text-left px-2">{data.ngaykb}</div></td>
                                <td><div className="text-left px-2">{data.done}</div></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {dichvuShow &&
                <DichVuModal setModalShow={setDichvuShow} />
            }
            {thuocShow &&
                <ThuocModal setModalShow={setThuocShow} />
            }

        </>
    )
}

export default KhamBenh;