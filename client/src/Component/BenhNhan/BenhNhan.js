import React, { useState } from "react";
import PageHeader from "../PageHeader";
function BenhNhan() {
    const monthNow = new Date().getMonth() + 1;


    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    return (
        <>
            <div className="w-full">
                <PageHeader title="Random Bệnh nhân" />
                <div className="p-4 flex gap-4">
                    <div className="flex gap-2 items-center">
                        <label>Tháng</label>
                        <select
                            value={month}
                            className="px-2 py-0.5 border outline-none disabled:opacity-50 disabled:text-gray-200"
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                    disabled={item > monthNow}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label>Năm: </label>
                        <select
                            value={year}
                            className="px-2 py-0.5 border outline-none"
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option>2024</option>
                        </select>
                    </div>
                    <button
                        className="btn btn-view"

                    >GET</button>
                </div>
            </div>


        </>
    )

}

export default BenhNhan;