import React from "react";

import moment from "moment";
function TheoDoiKhangSinhThuoc({ medicines }) {


    return (
        <>
            <div className="border rounded-md p-4 shadow-md hover:shadow-[#EEF7FF]">
                {medicines.map((item, index) => (
                    <div className="flex gap-10">
                        <div className="font-medium">{item.tenthuoc}</div>
                        <div>Số lượng: {item.soluong}</div>
                        <div>Ngày KS: {item.ngayks}</div>
                        <div>Ngày y lệnh: {moment(item.ngayylenh).utc().format('DD/MM/YYYY HH:mm')}</div>
                        <div>{item.duyetks === 1 ? 'Có' : 'Không'}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TheoDoiKhangSinhThuoc;