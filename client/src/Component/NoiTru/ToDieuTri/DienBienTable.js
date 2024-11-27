import React from "react";
import CanLamSang from "./CanLamSang";
import DuTruMau from "./DuTruMau";

function DienBienTable({ dienbiens }) {

    return (

        <>
            <table className="mb-10">
                <tbody>
                    {dienbiens.map((item, index) => (
                        <tr key={item.idseq} className="border-b hover:bg-transparent">
                            <td className="w-1/3 text-left text-sm">
                                <div className="p-4 w-full">
                                    <div className="mb-4 space-y-2">
                                        <span className="text-xl font-bold text-center border rounded-2xl px-2 py-0.5">{item.idseq}</span>
                                        <div className="italic">{item.ngayylenh}</div>
                                    </div>
                                    <div className="w-full grid grid-cols-3 gap-1 pb-4">
                                        {item.mach !== null &&
                                            <div>Mạch: <strong>{item.mach}</strong> lần/phút</div>}
                                        {item.nhietdo !== null &&
                                            <div>Nhiệt độ: <strong>{item.nhietdo}</strong> °C</div>}
                                        {item.cannang !== null && item.cannang > 0 &&
                                            <div>Cân nặng:  <strong>{item.cannang}</strong> kg</div>}
                                        {item.huyetap !== null && item.huyetap.trim() !== '/' &&
                                            <div>Huyết áp: <strong>{item.huyetap}</strong> mmHg</div>}
                                        {item.duonghuyet !== null && item.duonghuyet > 0 &&
                                            <div>Đường huyết:  <strong>{item.duonghuyet}</strong> mg/dl</div>}
                                        {item.chieucao !== null && item.chieucao > 0 &&
                                            <div>Chiều cao:  <strong>{item.chieucao}</strong> cm</div>}
                                        {item.spo2 !== null && item.spo2 > 0 &&
                                            <div>Sp02:  <strong>{item.spo2}</strong> %</div>}
                                        {item.nhiptho !== null && item.nhiptho > 0 &&
                                            <div>Nhịp thở:  <strong>{item.nhiptho}</strong> lần/phút</div>}
                                        {item.bmi !== null && item.bmi > 0 &&
                                            <div>BMI:  <strong>{item.bmi}</strong> kg/m²</div>}
                                    </div>
                                    <div className="">
                                        <div className="font-bold">CHẨN ĐOÁN</div>
                                        <div>{item.cdall.split('\r\n').map((item, index) => (
                                            <div key={index}>{item}</div>
                                        ))}
                                        </div>
                                    </div>
                                </div>


                            </td>
                            <td className="w-2/3 border-l">
                                <div className="text-left p-4 space-y-3">
                                    <CanLamSang cls={item.cls} />
                                    {item.dutrumau && <DuTruMau dutrumau={item.dutrumau } />}

                                    <div className="mt-10">
                                        <div className="h-full font-bold underline">Bác sĩ</div>
                                        <div>{item.tenbs}</div>
                                    </div>
                                </div>


                            </td>


                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    )

}

export default DienBienTable;