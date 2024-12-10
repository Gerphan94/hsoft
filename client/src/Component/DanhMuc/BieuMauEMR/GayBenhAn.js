import React, { useState } from "react";

function GayBenhAn({ data }) {

    const [isShow, setIsShow] = useState(true);

    return (
        <div className="border rounded-lg ">
            <div className="text-left font-medium rounded-tl-lg rounded-tr-lg px-4 py-1 select-none bg-[#384B70] text-white">{data.tengay}</div>
            <div className="font-normal px-4 py-2">
                {data.bieumaus.map((item) => (
                    <div>
                        <div key={item.idbieumau} className="flex gap-2 items-center ">
                            <div className="italic">{item.maphieu}</div>
                            <div className="font-medium">{item.tenbieumau}</div>

                        </div>
                        <div className="py-2">
                            {item.kys.map((ky, index) => (
                                <div key={index} className="flex gap-2">
                                    <div>{ky.ghichu}</div>
                                    <div>Thứ tự ký: {ky.thutuky}</div>
                                    <div>anchor: {ky.thutuky}</div>


                                </div>
                            ))}




                        </div>
                    </div>

                ))}

            </div>


        </div>

    )

}

export default GayBenhAn;