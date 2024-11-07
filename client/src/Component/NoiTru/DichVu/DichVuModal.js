import React, { useEffect, useState } from "react";
import Dropdown from "../../Dropdown";
import DichvuTable from "./DichVuTable";
import styles from "../../styles.module.css"

function DichVuModal({ site, setModalShow, selected }) {

    const apiURL = process.env.REACT_APP_API_URL;
    const [chidinhs, setChidinhs] = useState([]);

    // useEffect(() => {
    //     const fetchNhapKhoa = async () => {
    //         const fetchUrl = apiURL + "/noi-tru/get-nhap-khoa-of-bn/" + site + "/" + selected.maql;
    //         console.log(fetchUrl)
    //         const response = await fetch(fetchUrl);
    //         const data = await response.json();
    //         setnhapKhoas(data);
    //         console.log('----------------------', data);
    //     }
    //     fetchNhapKhoa();

    // }, [selected, apiURL, site])


    const fetchChidinh = async () => {
        try {
            const fetchUrl = apiURL + "/noitru/get-chidinh-by-idkhoa/" + site + "/" + selected.idkhoa;
            const response = await fetch(fetchUrl);
            const data = await response.json();

            const grouped = data.reduce((acc, item) => {
                const date = item.ngay;
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(item);
                return acc;

            }, {});

            setChidinhs(grouped);
            console.log(grouped)
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const onClickView = () => {
        fetchChidinh();
    }

    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {'Dịch vụ'} - {selected.idkhoa}
                        </div>
                        {/* BODY */}
                        <div className=" h-full p-4 overflow-hidden ">
                            <div className="flex gap-2 items-center">
                                
                               
                            </div>
                            <div className="h-full w-full flex-grow overflow-y-auto pb-10">
                                {Object.keys(chidinhs).map((date) => (
                                    <div className="p-2">
                                        <div className="text-left w-full bg-gray-200 px-2 py-1 font-bold">{date}</div>
                                        <DichvuTable data={chidinhs[date]} />
                                    </div>
                                ))}

                            </div>

                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-view"
                            onClick={onClickView}
                            >
                                Xem
                            </button>

                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={() => setModalShow(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>



                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default DichVuModal;