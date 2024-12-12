import React from "react";
import moment from "moment";

function NhapKhoaTable({ data }) {

    function capitalizeWords(str) {
        const lowString = str.toLowerCase();
        const words = lowString.split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
        return words.join(' ');
        
      }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th className="w-28">Mã BN</th>
                        <th>Họ tên</th>
                        <th>Ngày vào viện</th>
                        <th>Ngày vào khoa</th>
                        <th>Khoa</th>
                        {/* <th>Chẩn đoán</th> */}
                        <th>Khoa chuyển</th>
                        <th>Tình trạng</th>
                        
                    </tr>

                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id} className={`${item.xutri === null ? '!text-blue-500': ''}`}>
                            <td>{index + 1}</td>
                            <td><div className="text-right px-2 w-28">{item.mabn}</div></td>
                            <td><div className="text-left px-2">{capitalizeWords(item.hoten)}</div></td>
                            <td><div className="text-center px-2">{moment(item.ngayvaovien).utc().format('DD/MM/YYYY HH:mm')}</div></td>

                            <td><div className="text-center px-2">{moment(item.ngayvaokhoa).utc().format('DD/MM/YYYY HH:mm')}</div></td>
                            <td><div className="text-left px-2">{capitalizeWords(item.tenkp)}</div></td>
                            {/* <td><div className="text-left px-2">{item.chandoan} ({item.maicd})</div></td> */}
                            <td><div className={`text-left px-2 ${item.khoachuyen === '001' ? 'text-gray-500' : ''}`}>{capitalizeWords(item.tenkhoachuyen)}</div></td>
                            <td><div>{item.xutri === null ? 'Hiện diện' : item.xutri }</div></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )


}

export default NhapKhoaTable;