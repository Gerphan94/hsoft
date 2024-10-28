import React, { useEffect, useState } from "react";

function TaiKhoaKpModal({ kpModal, setKpModal, site }) {
    console.log('kpModal', kpModal)

    const apiURL = process.env.REACT_APP_API_URL;
    const [khoaphongs, setKhoaphongs] = useState([]);

    useEffect(() => {
        if (kpModal.data !== 'None') {
            fetch(`${apiURL}/danhmuc/danhmuc-khoaphong-in/${site}/${kpModal.data}`)
                .then(res => res.json())
                .then(data => setKhoaphongs(data));
        }
    }, [kpModal.data, apiURL, site]);

    const closeModal = () => {
        setKpModal({
            show: false,
            data: ''
        });
    }

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative lg:w-1/4 md:w-2/3 top-20 w-full my-6 mx-auto max-w-3xl bg-white">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-2 bg-[#9BB0C1]">
                            Danh sách Khoa Phòng
                        </div>
                        {/* BODY */}
                        <div className=" p-4">
                            <div className="h-96 overflow-y-auto border rounded- p-3">
                                {khoaphongs.map((kp, index) =>
                                    <div className="flex gap-10 hover:bg-slate-300 odd:bg-slate-100 ">
                                        <div className="w-10">{kp.id}</div>
                                        <div className="text-left">{kp.name}</div>

                                    </div>

                                )}
                            </div>



                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={closeModal}
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

export default TaiKhoaKpModal;

