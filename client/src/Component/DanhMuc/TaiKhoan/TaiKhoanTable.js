import React, { useState, useEffect } from "react";
import Pagination from "../../Common/Pagination";
import { FaGrip } from "react-icons/fa6";
import { FcSignature } from "react-icons/fc";
import { VscCopy } from "react-icons/vsc";
import { SuccessAlert } from "../../Common/Alert";

import TaiKhoanKhoaPhongModal from "../Modal/TaiKhoanKhoaPhongModal";
import ChangeNhanVienModal from "./ChangeNhanVienModal";
import PhanQuyenModal from "./PhanQuyenModal";

function TaiKhoanTable({ site, data }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [dataInPage, setDataInPage] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [selectedUserId, setSelectedUserID] = useState(null);

    const [selectedNhanvien, setSelectedNhanvien] = useState({ id: 0, name: '' });
    const [selectedNhomNV, setSelectedNhomNV] = useState({ id: 0, name: '' });

    const [showKPModal, setShowKPModal] = useState(false);
    const [khoaPhongData, setKhoaPhongData] = useState('');

    const [showChangeNhanVienModal, setShowChangeNhanVienModal] = useState(false);
    const [showPhanQuyenModal, setShowPhanQuyenModal] = useState(false);

    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }



    useEffect(() => {
        setTotalPage(Math.ceil(data.length / itemsPerPage));
        setDataInPage(constDataInPage(currentPage, data));
    }, [data, itemsPerPage]);

    useEffect(() => {
        setDataInPage(constDataInPage(currentPage, data));
    }, [currentPage]);

    const handleCopyPwd = (pwd) => {
        if (!pwd) {
            console.error('Pwd is null');
            return;
        }
        try {
            navigator.clipboard.writeText(pwd);
            setAlertMessage(`Đã sao chép mật khẩu ${pwd}`);
        } catch (error) {
            setAlertMessage('Cannot write to clipboard', error);
        }
        setShowAlert(true);
    }

    const handleClickKp = (kp) => {
        setKhoaPhongData(kp);
        setShowKPModal(true);
    }

    const handleClickMaNV = (accId, nvId, nvName, nhomId, nhomName) => {
        console.log(accId, nvId, nvName, nhomId, nhomName);
        setSelectedUserID(accId);
        setSelectedNhanvien({ id: nvId, name: nvName });
        setSelectedNhomNV({ id: nhomId, name: nhomName });
        setShowChangeNhanVienModal(true);
    }

    const handleClickPQ = (accId) => {
        setShowPhanQuyenModal(true);
    }


    return (
        <>
            <div className="h-full text-md flex flex-col justify-between overflow-y-auto">
                <table>
                    <thead className="sticky top-0 bg-white ">
                        <tr className="">
                            <th className="py-1 text-center w-10">STT</th>
                            <th className="w-24">ID</th>
                            <th>UserID</th>
                            <th className="text-left w-20">Pwd</th>
                            <th className="text-left">Tên TK</th>
                            <th>Mã NV</th>
                            <th className="text-left">Họ tên NV</th>
                            <th className="text-left">Tên Nhóm</th>
                            <th className="text-left">Chứng thư số</th>
                            <th className="text-center">Pin</th>
                            <th className="text-left hidden">Khoa/Phong</th>
                            <th className="text-center">...</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {dataInPage.length === 0 && <tr><td colSpan={15} className="text-center bg-gray-200 py-1">Không có kết quả</td></tr>}
                        {dataInPage.map((item, index) => (
                            <tr key={index}>
                                <td className="py-1 text-center">{(currentPage - 1) * 20 + (index + 1)}</td>
                                <td className="w-24">{item.id}</td>
                                <td className="text-left">{item.userid}</td>
                                <td >
                                    <div className="text-left flex gap-1 items-center group">
                                        <button
                                            className="opacity-0 group-hover:opacity-100"
                                            onClick={() => handleCopyPwd(item.password_)}

                                        >
                                            <VscCopy />
                                        </button>

                                        {item.password_}
                                    </div>
                                </td>
                                <td className="text-left">
                                    <div className="px-2">
                                        {item.tentaikhoan}
                                    </div>
                                </td>
                                <td><button
                                    className="hover:underline hover:text-blue-600"
                                    onClick={() => handleClickMaNV(item.id, item.mabs, item.hoten, item.manhomnv, item.tennhom)}
                                >
                                    {item.mabs}
                                </button></td>
                                <td className="text-left">{item.hoten}</td>
                                <td className="text-left">{item.tennhom}</td>
                                <td>{item.chungthuso}</td>
                                <td className="text-center">{item.pin}</td>
                                <td className="hidden">{item.makp}</td>
                                <td>
                                    <div className="px-2 flex gap-2 flex-row-reverse">
                                        <button onClick={() => handleClickKp(item.makp)}>
                                            <FaGrip />
                                        </button>
                                        {item.khoakyrv === 1 && <span><FcSignature /></span>}
                                        <button
                                            onClick={() => handleClickPQ(item.id)}
                                        >
                                            PQ</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full">
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                        setItemsPerPage={setItemsPerPage}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>

            {showAlert &&
                <SuccessAlert
                    visible={showAlert}
                    setVisible={setShowAlert}
                    message={alertMessage}
                />

            }

            {showKPModal &&
                <TaiKhoanKhoaPhongModal
                    data={khoaPhongData}
                    setShowKPModal={setShowKPModal}
                    kpstring={khoaPhongData}

                />}

            {showChangeNhanVienModal &&
                <ChangeNhanVienModal
                    selectedUserId={selectedUserId}
                    nhanVien={selectedNhanvien}
                    nhomNV={selectedNhomNV}
                    setShowAlert={setShowAlert}
                    setAlertMessage={setAlertMessage}
                    setModalShow={setShowChangeNhanVienModal}
                />}

            {showPhanQuyenModal &&
                <PhanQuyenModal
                    site={site}

                    setModalShow={setShowPhanQuyenModal} />}
        </>
    )
}

export default TaiKhoanTable;