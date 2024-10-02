import React, { useEffect, useState } from "react";

import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";




function Hiendien ({ data, selected, setSelected }) {

    const onClickPid = (pid, name, idkhoa, maql) => {
   
        setSelected({'pid': pid, 'pname': name, 'idkhoa': idkhoa, 'maql': maql});
    };

    return (
        <>
            <div className="h-[750px]">
                <div className="mt-2 px-4 flex-grow w-full h-full overflow-y-auto" >
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-center"><div className=" py-1 text-center">STT</div></th>
                                <th className=""><div className="">PID</div></th>
                                <th className=""><div>Họ tên</div></th>
                                <th className="w-12"><div>NS</div></th>
                                <th><div className="text-center">Ngày VV</div></th>
                                <th><div className="text-center">Ngày VK</div></th>
                                <th><div>Đối tượng</div></th>
                                <th><div className="text-center">BHYT</div></th>
                                <th><div className="text-center">Nhóm máu</div></th>
                                <th><div className="text-center">Số ngày ĐT</div></th>
                                <th><div className="text-center w-32">...</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((ele, index) => (
                                <tr
                                    key={ele.id}
                                    className={`${selected.pid === ele.mabn ? '!bg-[#96C9F4]' : ''}`}                       
                                    onClick={() => onClickPid(ele.mabn, ele.hoten, ele.id.toString(), ele.maql.toString())}
                                    data-idkhoa={ele.id}
                                    data-maql={ele.maql}
                                >
                                    <td className="text-center"><div className=" py-1 text-center">{index + 1}</div></td>                                
                                    <td><div className="text-right pr-2 hover:underline hover:text-blue-500 cursor-pointer">{ele.mabn}</div></td>
                                    <td><div className="flex gap-2 items-center">
                                        {ele.phai === 0 ? <AiOutlineMan className="text-blue-500" /> : <AiOutlineWoman className="text-pink-500" />}
                                        {ele.hoten}</div></td>
                                    <td><div className="text-center">{ele.namsinh}</div></td>
                                    <td><div className="text-right">{ele.ngayvv}</div></td>
                                    <td><div className="text-right">{ele.ngayvk}</div></td>
                                    <td><div className="text-center px-2">{ele.doituong}</div></td>
                                    <td><div className="">{ele.sothe}</div></td>
                                    <td><div className="">{ele.mauabo}{ele.maurh}</div></td>
                                    <td><div className="">{ele.songaydt}</div></td>
                                    <td><div className="">{ele.ghichu}</div></td>
                                </tr>))}

                        </tbody>
                    </table>
                </div>

            </div>


        </>
    );
}

export default Hiendien;