import React, { useState, useEffect } from "react";
import Pagination from "../Common/Pagination";
import { FaGrip } from "react-icons/fa6";
import { FcSignature } from "react-icons/fc";
import { VscCopy } from "react-icons/vsc";
import { SuccessAlert } from "../Common/Alert";
function TaiKhoanTable({ data }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [dataInPage, setDataInPage] = useState([]);


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');



    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }

    useEffect(() => {

        setTotalPage(Math.ceil(data.length / itemsPerPage));
        setDataInPage(constDataInPage(currentPage, data));
    }, [data, itemsPerPage]);

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

    return (
        <>
            <div className="min-h-96 text-md">
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
                            {/* <th className="text-left">Chứng thư số</th> */}
                            <th className="text-center">Pin</th>
                            <th className="text-left hidden">Khoa/Phong</th>
                            <th className="text-center">...</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                <td>{item.mabs}</td>
                                <td className="text-left">{item.hoten}</td>
                                <td className="text-left">{item.tennhom}</td>
                                {/* <td>{item.chungthuso}</td> */}
                                <td className="text-center">{item.pin}</td>
                                <td className="hidden">{item.makp}</td>
                                <td>
                                    <div className="px-2 flex gap-2 flex-row-reverse">

                                        <button
                                        >
                                            <FaGrip />

                                        </button>
                                        {item.khoakyrv === 1 && <span><FcSignature /></span>}

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
        </>
    )
}

export default TaiKhoanTable;