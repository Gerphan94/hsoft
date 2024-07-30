import React, { useState, useEffect } from "react";
import styles from "../styles.module.css"

function TonBHYT({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const today = new Date();
    console.log(today);

    const [pharmars, setPharmars] = useState([]);

    const handeleView = async () => {
        try {
            const fecthURL = apiURL + "/duoc/tonbhyt/" + site;

            const response = await fetch(fecthURL);
            const data = await response.json();
            setPharmars(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className="flex px-4 pb-2 justify-between">
                <button
                    className={styles.buttonSubmit}
                    onClick={() => handeleView()}
                >Xem
                </button>
                <div className="flex gap-10">
                    <div className="">
                    <div className="inline-block">Số ngày hiệu lực:</div>
                    <div className="inline-block ml-2">20</div>
                    </div>
                    <div className="text-blue-600">
                    <div className="inline-block">Phần trăm hiệu lực:</div>
                    <div className="inline-block ml-2">20</div>
                    </div>
                   
                    <div>Phần trăm hiệu lực;</div>
                    <div>20</div>


                </div>
            </div>
            <div className="mt-0 px-4 w-full h-[720px] overflow-y-auto" >
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="w-10">#</th>
                            <th>ID</th>
                            <th className="w-28">Mã thuốc</th>
                            <th className="w-[1000px]">Tên thuốc</th>
                            <th>ĐVT</th>
                            <th className="w-28">Lô SX</th>
                            <th>Hiệu lực thầu</th>
                            <th>SL thầu BH</th>
                            <th>SL Tồn</th>
                            <th>Đã xuất</th>
                            <th>Tồn BH Treo</th>
                            <th>Tồn BH KD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pharmars.map((pharmar, index) =>
                            <tr className={`${pharmar.tonthuc !== (pharmar.tontreo + pharmar.tonkd) ? "bg-red-500" : ""} even:bg-gray-100 odd:bg-white hover:bg-blue-200`}>
                                <td>{index + 1}</td>
                                <td><div>{pharmar.id}</div></td>
                                <td><div>{pharmar.ma}</div></td>

                                <td><div className="text-left">{pharmar.ten}</div></td>
                                <td><div>{pharmar.dvt}</div></td>
                                <td>
                                    <div className="px-2 py-1">
                                        <select className="w-full bg-transparent">
                                            {pharmar.losx.map((ele) => 
                                            <option>{ele.losx}</option>
                                        )}
                                        </select>
                                    </div>

                                </td>
                                <td><div>{pharmar.hieulucthau}</div></td>
                                <td><div>{pharmar.tonbd}</div></td>
                                <td><div>{pharmar.tonthuc}</div></td>
                                <td><div>{pharmar.dadung}</div></td>
                                <td><div>{pharmar.tontreo}</div></td>
                                <td><div>{pharmar.tonkd}</div></td>
                            </tr>

                        )}
                    </tbody>
                </table>
            </div>

        </>
    )


}

export default TonBHYT;
