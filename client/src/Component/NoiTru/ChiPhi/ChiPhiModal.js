import React from "react";

function ChiPhiModal( { site, setShowModal, selected } ) {


    return (
        <>
             <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            Chi phí bệnh nhân
                        </div>
                        {/* BODY */}
                        <div className=" h-full p-4 overflow-hidden ">
                           

                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-view"
                            >
                                Xem
                            </button>

                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>



                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ChiPhiModal;