import React, { useEffect, useState } from "react";
import Dausinhton from "./Dausinhton";
function ThuocDetail({ couponType, site, data, couponId, selectedCoupon }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const title_ar = ['DỰ TRÙ THƯỜNG QUY', 'XUẤT TỦ TRỰC', 'TOA THUỐC RA VIỆN']
    const TITLE = title_ar[selectedCoupon.type - 1];


    const [detail, setDetail] = useState({});

    useEffect(() => {
        const fetchURL = apiURL + "noitru/phieu_info/" + site + "/" + selectedCoupon.type + "/" + selectedCoupon.id + "/" + selectedCoupon.ngay;
        const fetchDetail = async () => {
            try {
                const response = await fetch(fetchURL);
                const data = await response.json();
                setDetail(data);
                console.log(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDetail();
    }, [couponId, couponType, site, apiURL]);

    return (
        <>
            <div>
                <div className="flex items-center w-full bg-gray-100">
                    <div className="font-bold px-2">{TITLE}</div>
                    <div className="flex-1 text-left">{detail && detail.ten}</div>
                    <div>
                        <Dausinhton />
                    </div>
                </div>
                <div className="border rounded-md p-2 mt-4">
                    <div className="px-2 py-1 flex gap-2 items-center">
                        <label className="w-20 text-left">ICD:</label>
                        <input type="text" className="w-1/3 border outline-none px-2 py-0.5" readOnly={true} value={detail && detail.maicd} />
                    </div>
                    <div className="px-2 py-1 flex gap-2 items-center">
                        <label className="w-20 text-left">Chẩn đoán:</label>
                        <input type="text" className="w-full border outline-none px-2 py-0.5" readOnly={true} value={detail && detail.chandoan} />
                    </div>

                </div>
            </div>

            <div className="border rounded-md p-2 mt-4">
                {data.map((item) => (
                    // <div className="pt-2 text-sm border rounded-md p-2 mt-4">
                    <div className="relative border-b rounded-md p-3 mb-3 text-left">
                        <span className="absolute top-0 text-[10px] right-0 w-10 rounded-md bg-slate-300">{item.stt_index}</span>
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <span className="size-6 rounded-full bg-[#379777] border text-center">
                                    {item.tt}
                                </span>
                                <div><strong>{item.mabd} | </strong></div>
                                <div className="font-bold text-left">{item.ten_hamluong}</div>
                            </div>
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

                            <div className="min-w-40"><>Liều dùng:</> {item.lieudungthuoc}</div>
                            <div className="min-w-40"><>Tốc độ:</> {item.tocdo}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="min-w-40">Cách dùng: <i>{item.cachdung}</i></div>
                            <div className="text-left">Ghi chú:
                                <input value={item.ghichu} />
                            </div>
                        </div>



                    </div>
                    // </div>
                ))}
            </div>


        </>
    )
}

export default ThuocDetail;