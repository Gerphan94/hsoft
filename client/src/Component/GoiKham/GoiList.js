import React, { useState } from "react";

function GoiList( { site, goiList, setGoiChitiet }) {

    const apiURL = process.env.REACT_APP_API_URL;


    const handleDetailView = async (idgoi) => {
        console.log(idgoi);
        setGoiChitiet([]);
        try {
            const fecthURL = apiURL + "goikham_chitiet/" + site + "/" + idgoi;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setGoiChitiet(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <>
            {goiList.map((goi) =>
                <div
                    key={goi.id}
                    className="border rounded-lg bg-gray-200 px-2 py-1 cursor-pointer text-left mb-4"
                    onClick={() => handleDetailView(goi.id)}
                >
                    <div className="text-sm italic">{goi.ngay} - {goi.id}
                    </div>
                    <div className="font-bold">
                        {goi.idgoi} - {goi.tengoi}
                    </div>
                    <div className="flex gap-10">
                        <div className="text-red-600 font-bold">
                            {Number(goi.sotien).toLocaleString()}
                        </div>
                        {goi.idtt !== '0' ?
                            <div>Đã tạm ứng</div> : <div>Chưa tạm ứng</div>
                        }
                    </div>
                </div>
            )}
        </>
    )

}

export default GoiList;