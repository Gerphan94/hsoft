import React from "react";

function ThuocTable(loaiphieu, data) {

    const type = loaiphieu.loaiphieu
    return (
        <>
            {type === 3 ? (
                <div>
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-200 ">
                                <th className="text-center w-10"><div className=" py-1 text-center">STT</div></th>
                                <th className=""><div className="">Mã BD</div></th>
                                <th className=""><div>Tên BD</div></th>
                                <th><div>ĐVT</div></th>
                                <th><div className="text-center">ĐVD</div></th>
                                <th><div className="text-center">Sáng</div></th>
                                <th><div>Trưa</div></th>
                                <th><div className="text-center">Chiều</div></th>
                                <th><div className="text-center">Tối</div></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            )
                :
                (
                    <div>
                        <table className="w-full">
                            <thead className="sticky top-0">
                                <tr className="bg-gray-200 ">
                                    <th className="text-center"><div className=" py-1 text-center">STT</div></th>
                                    <th className=""><div className="">Mã BD</div></th>
                                    <th className=""><div>Tên BD</div></th>
                                    <th><div>ĐVT</div></th>
                                    <th><div className="text-center">ĐVD</div></th>
                                    <th><div className="text-center">Số lần/Ngày</div></th>
                                    <th><div>SL/Lần</div></th>
                                    <th><div className="text-center">Số lượng</div></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                )}
        </>
    )

}
export default ThuocTable;

