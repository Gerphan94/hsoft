import React from "react";
import moment from "moment";

function ChiTietThuocComponent({ item, couponType }) {
    return (

        <div key={item.stt_index} className="relative border rounded-md mb-3 text-left p-2 select-none" data-id={item.stt_index} >
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <span className="size-6 rounded-full bg-[#379777] border text-sm flex items-center justify-center">
                        {item.tt}
                    </span>
                    <div><strong>{item.mabd} | </strong></div>
                    <div className="font-bold text-left">{item.ten_hamluong}</div>
                    x
                    <div className="font-bold">{item.soluong}</div>
                    <div>{item.dang}</div>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="px-0.5 py-0.5 select-none font-medium italic">{item.duongdung}</div>
                    <div className="flex gap-1 items-center">
                        <input
                            id={"isdalieu-" + item.stt_index}
                            name={"isdalieu-" + item.stt_index}
                            type="checkbox"
                            readOnly={true}
                            checked={item.dalieu === 1 ? true : false}
                            value='Đa liều'
                        />
                        <label htmlFor={"isdalieu-" + item.stt_index}>Đa liều</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input
                            id="isdvsd"
                            name='isdvsd'
                            type="checkbox"
                            readOnly={true}
                            checked={item.usingdvsd === 1 ? true : false}
                            value='Đa liều'
                        />
                        <label htmlFor="isdvsd">isDVSD</label>
                    </div>
                </div>
                <div className={`text-sm flex items-center rounded-xl px-2 py-0.5 text-white select-none ${item.doituong === 'BHYT' ? 'bg-[#4535C1]' : item.doituong === 'Thu phí' ? 'bg-[#E76F51]' : 'bg-[#379777]'} `}>
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


    );
}

export default ChiTietThuocComponent;