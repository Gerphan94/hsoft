import React, { useEffect, useState } from "react";
import Dausinhton from "./Dausinhton";
import moment from "moment";



function ThuocDetail({ couponType, site, data, couponId, selectedCoupon }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const title_ar = ['DỰ TRÙ THƯỜNG QUY', 'XUẤT TỦ TRỰC', 'TOA THUỐC RA VIỆN']
    const TITLE = title_ar[selectedCoupon.type - 1];

    const [detail, setDetail] = useState({});

    useEffect(() => {
        const fetchURL = apiURL + "noitru/thuoc-dutrull-thongtin/" + site + "/" + selectedCoupon.type + "/" + selectedCoupon.id + "/" + selectedCoupon.ngay;
        const fetchDetail = async () => {
            try {
                const response = await fetch(fetchURL);
                const data = await response.json();
                setDetail(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDetail();
    }, [couponId, couponType, site, apiURL]);

    const mutileLineChandoan = (cd) => {
        if (!cd) {
            return ''
        }
        return cd.split(';').join(';\n')

    }

    return (
        <>
            <div>
                <div className="flex items-center w-full bg-gray-100">
                    <div className="font-bold px-2">{TITLE}</div>
                    <div className="flex-1 text-left">{detail && detail.ten}</div>
                    <input type="text" className="w-48 text-center border outline-none px-2 py-0.5" value={selectedCoupon.id} />
                    <div>
                        <Dausinhton />
                    </div>
                </div>
              
                <div className="flex gap-2 border rounded-md p-2 mt-4 bg-[#F7FBFF]">
                    <div className="w-24 space-y-2">
                        <label className="w-24 text-left inline-block">ICD:</label>
                        <label className="w-24 text-left inline-block">Chẩn đoán:</label>
                    </div>
                    <div className="w-full text-left space-y-2">
                        <input type="text" className="w-1/3 border outline-none px-2 py-0.5" readOnly={true} value={detail && detail.maicd} />
                        <textarea
                            type="text"
                            className="w-full h-24 border outline-none px-2 py-0.5"
                            readOnly={true}
                           
                            value={detail && mutileLineChandoan(detail.chandoan)}
                        />
                    </div>

                </div>
            </div>

            <div className="border rounded-md p-2 mt-4 bg-[#F7FBFF]">
                {data.map((item) => (
                    // <div className="pt-2 text-sm border rounded-md p-2 mt-4">
                    <div className="relative border-b rounded-md p-3 mb-3 text-left">
                        <span className="absolute top-0 text-[10px] text-center right-0 w-10 rounded-md bg-slate-300">{item.stt_index}</span>
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <span className="size-6 rounded-full bg-[#379777] border text-center">
                                    {item.tt}
                                </span>
                                <div><strong>{item.mabd} | </strong></div>
                                <div className="font-bold text-left">{item.ten_hamluong}</div>
                                x
                                <div className="font-bold">{item.soluong}</div>
                                <div>{item.dang}</div>
                            </div>
                            <div className="border rounded-2xl px-2 py-0.5 bg-white select-none">{item.duongdung}</div>
                            <div className={`text-sm rounded-xl px-2 py-0.5 text-white select-none ${item.doituong === 'BHYT' ? 'bg-[#4535C1]' : item.doituong === 'Thu phí' ? 'bg-[#E76F51]' : 'bg-[#379777]'} `}>
                                {item.doituong}
                            </div>
                        </div>
                        <div className="grid grid-cols-3">
                            {couponType === 3 ?
                                <div className="text-left italic py-0.5 flex gap-4">
                                    {item.sang !== 0 && <div>Sáng <span className="font-bold">{item.sang}</span> {item.donvidung}</div>}
                                    {item.trua !== 0 && <div>Trưa <span className="font-bold">{item.trua}</span> {item.donvidung}</div>}
                                    {item.chieu !== 0 && <div>Chiều <span className="font-bold">{item.chieu}</span> {item.donvidung}</div>}
                                    {item.toi !== 0 && <div>Tối <span className="font-bold">{item.toi}</span> {item.donvidung}</div>}
                                </div>
                                :
                                <div className="text-left italic py-0.5">Ngày <span className="font-bold">{item.solan}</span> lần, lần <span className="font-bold">{item.lan}</span> {item.donvidung}</div>
                            }
                            <div className="min-w-40"><span className="font-medium">Giờ BD:</span> {item.giobd}</div>
                            <div className="min-w-40"><span className="font-medium">Giờ dùng:</span> {item.giodung}</div>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="min-w-40"><span className="font-medium">Liều dùng:</span> {item.lieudungthuoc}</div>
                            <div className="min-w-40"><span className="font-medium">Tốc độ:</span> {item.tocdo}</div>
                            <div className="text-left"><span className="font-medium">Ghi chú: </span>{item.ghichu}</div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div ><span className="font-medium">Cách dùng: </span><i>{item.cachdung}</i></div>
                        </div>
                        <div className="grid grid-cols-6 text-xs py-1">
                            {item.l1 && <div><strong>L1:</strong> {moment.utc(item.l1).format('DD/MM/YYYY HH:mm:ss')}</div>}
                            {item.l2 && <div><strong>L2:</strong> {moment.utc(item.l2).format('DD/MM/YYYY HH:mm:ss')}</div>}
                            {item.l3 && <div><strong>L3:</strong> {moment.utc(item.l3).format('DD/MM/YYYY HH:mm:ss')}</div>}
                            {item.l4 && <div><strong>L4:</strong> {moment.utc(item.l4).format('DD/MM/YYYY HH:mm:ss')}</div>}
                            {item.l5 && <div><strong>L5:</strong> {moment.utc(item.l5).format('DD/MM/YYYY HH:mm:ss')}</div>}
                            {item.l6 && <div><strong>L6:</strong> {moment.utc(item.l6).format('DD/MM/YYYY HH:mm:ss')}</div>}
                        </div>



                    </div>
                    // </div>
                ))}
            </div>

            {/* PHA TIÊM */}



        </>
    )
}

export default ThuocDetail;