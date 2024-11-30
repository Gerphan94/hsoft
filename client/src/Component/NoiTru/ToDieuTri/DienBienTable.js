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
                            <td className="w-1/3 text-left">
                                <div className="p-4 w-full h-full flex flex-col flex-grow justify-between">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xl font-bold text-center border rounded-2xl px-2 py-0.5">{item.idseq}</span>
                                        <div className="italic text-lg">{item.ngayylenh}</div>
                                    </div>
                                    <div className="h-full">
                                        <div>
                                            <div className="font-bold underline uppercase">Sinh hiệu:</div>
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
                                        </div>
                                        <div className="">
                                            <div className="font-bold underline">CHẨN ĐOÁN:</div>
                                            <div>{item.cdall.split('\r\n').map((item, index) => (
                                                <div key={index}>{item}</div>
                                            ))}
                                            </div>
                                        </div>

                                        <div className="py-2 space-y-2">
                                            {item.vandechinh &&
                                                <div >
                                                    <div className="font-bold underline uppercase">Vấn đề chính:</div>
                                                    <div>{item.vandechinh}</div>
                                                </div>
                                            }
                                            {item.xutri &&
                                                <div >
                                                    <div className="font-bold underline uppercase">Xử trí:</div>
                                                    <div>{item.xutri}</div>
                                                </div>
                                            }

                                        </div>
                                        <div className="mt-10">
                                            <div className="h-full font-bold underline uppercase">Bác sĩ:</div>
                                            <div>{item.tenbs}</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="w-2/3 border-l">
                                <div className="h-full text-left p-4 space-y-3">
                                    <CanLamSang cls={item.cls} />
                                    {item.dutrumau && <DuTruMau dutrumau={item.dutrumau} />}
                                    <div>
                                        {item.chamsoc && item.chamsoc !== '----Chọn chế độ chăm sóc----' &&
                                            <div className="flex gap-2 items-center">
                                                <div className="font-bold underline uppercase">CHĂM SÓC:</div>
                                                <div>{item.chamsoc}</div>
                                            </div>
                                        }
                                        {item.chamsockhac &&
                                            <div className="flex gap-2 items-center">
                                                <div className="">* Chăm sóc khác:</div>
                                                <div>{item.chamsockhac}</div>
                                            </div>
                                        }
                                        {item.tendinhduong &&
                                            <div className="flex gap-2 items-center">
                                                <div className="font-bold underline uppercase">Dinh dưỡng</div>
                                                <div>{item.tendinhduong}</div>
                                            </div>
                                        }
                                        {item.ylenhkhac &&
                                            <div >
                                                <div className="font-bold underline uppercase">Y lệnh khác:</div>
                                                <div>{item.ylenhkhac}</div>
                                            </div>
                                        }
                                        {item.canhbao &&
                                            <div >
                                                <div className="font-bold underline uppercase">Cảnh báo:</div>
                                                <div>{item.canhbao}</div>
                                            </div>
                                        }


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