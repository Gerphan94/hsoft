import React, { useEffect, useState } from "react";

import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import Pagination from "../Common/Pagination";
import { TbSortAZ } from "react-icons/tb";
import { VscCopy } from "react-icons/vsc";
import { SuccessAlert } from "../Common/Alert";
import moment from "moment";


function Hiendien({ data, selected, setSelected }) {

    console.log('rending hiendien table -------------------------------------')
    console.log('data', data)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [dataInPage, setDataInPage] = useState([]);

    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }

    const [showAlert, setShowAlert] = useState(false);



    useEffect(() => {
        setDataInPage(constDataInPage(1, data));
        setTotalPage(Math.ceil(data.length / itemsPerPage));
    }, [data, itemsPerPage]);

    useEffect(() => {
        // setTotalPage(Math.ceil(data.length / itemsPerPage));
        setDataInPage(constDataInPage(currentPage, data));
    }, [currentPage]);

    const onClickPid = (pid, name, idkhoa, maql, mavv, ngayvk) => {
        setSelected({ 'pid': pid, 'pname': name, 'idkhoa': idkhoa, 'maql': maql, 'mavv': mavv, 'ngayvk': ngayvk });
    };

    const handleClickCopy = (pid) => {
        console.log(pid)
        navigator.clipboard.writeText(pid)

        setShowAlert(true);
    };

    const songaydieutri = (ingay) => {
        if (!ingay) return 0;
        const today = moment(new Date()).format('YYYY-MM-DD');
        const ngayvk = moment(ingay).format('YYYY-MM-DD');
        const songay = moment(today).diff(ngayvk, 'days');
        return songay > 0 ? songay + 1: 1;
    }

    return (
        <>
            <div className="mt-2 w-full flex flex-col  min-h-[300px] px-4" >
                <div className="overflow-x-auto overflow-y-hidden text-[15px]">
                    <table className="">
                        <thead>
                            <tr>
                                <th><div className="px-2 py-1 text-center">STT</div></th>
                                <th className=""><div className="">PID</div></th>
                                <th className="white-space-nowrap min-w-40"><div>Họ tên</div></th>
                                <th><div className="w-28">Ngày sinh</div></th>
                                <th><div className="text-center w-40">Ngày VV</div></th>
                                <th><div className="text-center w-40">Ngày VK</div></th>
                                <th><div className="text-center w-40">Đối tượng</div></th>
                                <th><div className="text-center w-40">BHYT</div></th>
                                <th><div className="text-center  w-40">N.Máu</div></th>
                                <th><div className="text-center  w-20">Phòng</div></th>
                                <th><div className="text-center  w-20">Giường</div></th>
                                <th><div className="text-center  w-64">B.Sĩ nhập khoa</div></th>
                                <th><div className="text-center white-space-nowrap min-w-40">Chẩn đoán vào khoa</div></th>
                                <th><div className="text-center white-space-nowrap  w-40">S.Ngày ĐT</div></th>
                                <th><div className="text-center white-space-nowrap  w-40">Bệnh án</div></th>
                                <th><div className="text-center w-32">...</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 && <tr><td colSpan={20} className="text-center bg-gray-200 py-1 italic">Không có dữ liệu</td></tr>}

                            {dataInPage.map((ele, index) => (
                                <tr
                                    key={ele.id}
                                    className={`${selected.pid === ele.mabn ? '!bg-[#96C9F4] font-medium' : ''}`}
                                    onClick={() => onClickPid(
                                        ele.mabn,
                                        ele.hoten,
                                        ele.id.toString(),
                                        ele.maql.toString(),
                                        ele.mavaovien.toString(),
                                        ele.ngayvk
                                    )}
                                    data-idkhoa={ele.id}
                                    data-maql={ele.maql}
                                >
                                    <td className="text-center"><div className=" py-1 text-center">{currentPage * itemsPerPage - itemsPerPage + index + 1}</div></td>
                                    <td>
                                        <div className="flex gap-2 items-center flex-row-reverse group">
                                            <div name="mabn" className="text-right pr-2 hover:underline hover:text-blue-500 cursor-pointer">
                                                {ele.mabn}
                                            </div>
                                            <button
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                onClick={() => handleClickCopy(ele.mabn)}
                                            ><VscCopy /></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 items-center w-80">
                                            {ele.phai === 0 ? <AiOutlineMan className="text-blue-500" /> : <AiOutlineWoman className="text-pink-500" />}
                                            <div className="white-space-nowrap w-full text-left">{ele.hoten}
                                                </div>
                                        </div>
                                    </td>
                                    <td><div className="text-center">
                                        {ele.ngaysinh ? ele.ngaysinh : ele.namsinh}

                                    </div></td>
                                    <td><div className="text-right">{moment(ele.ngayvv).utc().format('DD/MM/YYYY HH:mm')}</div></td>
                                    <td><div className="text-right">{moment(ele.ngayvk).utc().format('DD/MM/YYYY HH:mm')}</div></td>
                                    <td><div className="text-center px-2">{ele.doituong}</div></td>
                                    <td><div className="">{ele.sothe}</div></td>
                                    <td><div className="">{ele.mau_abo}{ele.mau_rh}</div></td>
                                    <td><div>{ele.phong}</div></td>
                                    <td><div>{ele.giuong}</div></td>
                                    <td><div className="text-left">{ele.bsnhapkhoa}</div></td>
                                    <td><div className="truncate text-left">{`${ele.chandoan} (${ele.maicd})`} </div></td>
                                    <td><div className="">{songaydieutri(ele.ngayvk)}</div></td>
                                    <td><div className="text-left">{ele.benhan}</div></td>
                                    <td><div className=""></div></td>

                                </tr>))}

                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />


            </div>


            {showAlert &&
                <SuccessAlert
                    visible={showAlert}
                    setVisible={setShowAlert}
                    message={'Đã sao chép PID thành công!'}
                />}

        </>
    );
}

export default Hiendien;