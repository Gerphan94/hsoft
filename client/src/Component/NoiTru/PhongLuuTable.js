import React, { useEffect, useState } from "react";

import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import Pagination from "../Common/Pagination";
import { TbSortAZ } from "react-icons/tb";

function PhongLuuTable({ data, selected, setSelected }) {

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

    useEffect(() => {
        setDataInPage(constDataInPage(1, data));
        setTotalPage(Math.ceil(data.length / itemsPerPage));
    }, [data, itemsPerPage]);

    useEffect(() => {
        // setTotalPage(Math.ceil(data.length / itemsPerPage));
        setDataInPage(constDataInPage(currentPage, data));
    }, [currentPage]);

    const onClickPid = (pid, name, maql, mavv) => {
        setSelected({ 'pid': pid, 'pname': name, 'maql': maql, 'mavv': mavv });
    };

    return (
        <>
            <div className=" flex flex-col">
                <div className="mt-2 px-4 flex-grow w-full h-full overflow-y-auto text-md" >
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-center"><div className=" py-1 text-center">STT</div></th>
                                <th className=""><div className="">PID</div></th>
                                <th className=""><div>Họ tên</div></th>
                                <th className="w-12"><div>Ngày sinh</div></th>
                                <th><div>Đối tượng</div></th>
                                <th><div className="text-center">Ngày vào</div></th>
                                <th><div className="text-center">Ngày ra</div></th>
                                <th><div className="text-center ">Kết quả</div></th>
                                <th><div className="text-center">Xử trí</div></th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {dataInPage.map((ele, index) => (
                                <tr
                                    key={ele.id}
                                    className={`${selected &&selected.pid === ele.mabn ? '!bg-[#96C9F4] font-medium' : ''}`}
                                    onClick={() => onClickPid(ele.mabn, ele.hoten, ele.mavv.toString(), ele.maql.toString())}
                                    data-idkhoa={ele.id}
                                    data-maql={ele.maql}
                                >
                                    <td className="text-center"><div className=" py-1 text-center">{currentPage * itemsPerPage - itemsPerPage + index + 1}</div></td>
                                    <td><div className="text-right pr-2 hover:underline hover:text-blue-500 cursor-pointer">{ele.mabn}</div></td>
                                    <td>
                                        <div className="flex gap-2 items-center">
                                            {ele.phai === 0 ? <AiOutlineMan className="text-blue-500" /> : <AiOutlineWoman className="text-pink-500" />}
                                            {ele.hoten}
                                        </div>
                                    </td>
                                    <td><div className="text-center">{ele.ngaysinh}</div></td>
                                    <td><div className="text-center px-2">{ele.doituong}</div></td>
                                    <td><div className="text-right">{ele.ngayvao}</div></td>
                                    <td><div className="text-right">{ele.ngayra}</div></td>
                                    <td><div className="text-left">{ele.ketqua}</div></td>
                                    <td><div className="text-left">{ele.xutri}</div></td>
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


        </>
    );
}

export default PhongLuuTable;