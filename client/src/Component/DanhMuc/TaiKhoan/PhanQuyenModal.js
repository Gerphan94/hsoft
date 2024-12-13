import React, { useEffect } from "react";
import { useAppContext } from "../../Store/AppContext";

function PhanQuyenModal({ site, setModalShow }) {

    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetch = async () => {
            
            try {
                const fetchURL = `${apiURL}benhnhan/get-random-benhnhan?site=${site}`
                console.log('fetchURL', fetchURL)
                const response = await fetch(fetchURL);
                const data = await response.json();
                console.log('data', data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetch();

    },[site])

    const title = 'Phân quyền';

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none p-10">
                    <div className="relative lg:w-1/3 md:w-2/3 w-full h-full  mx-auto max-w-3xl bg-white flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {title}
                        </div>

                        {/* BODY */}
                        <div className="min-h-40">
                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-save"
                                type="button"
                                onClick={() => setModalShow(false)}
                            >
                                Lưu
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
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default PhanQuyenModal;

