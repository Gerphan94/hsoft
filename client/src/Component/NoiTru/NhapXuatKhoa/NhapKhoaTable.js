import React from "react";
import moment from "moment";

function NhapKhoaTable({ data }) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã BN</th>
                        <th>Họ tên</th>
                        <th>Ngày vào khoa</th>
                        <th>Chẩn đoán</th>
                    </tr>

                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.mabn}</td>
                            <td>{item.hoten}</td>
                            <td>{moment(item.ngayvaokhoa).utc().format('DD/MM/YYYY HH:mm')}</td>
                            <td>{item.chandoan}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )


}

export default NhapKhoaTable;