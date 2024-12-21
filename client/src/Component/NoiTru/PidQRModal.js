import React from "react";
import QRCode from "react-qr-code";


function PidQRModal({ pid, setModalShow }) {
    return (

        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative lg:w-56 lg:h-56 md:w-2/3 top-1/4 w-full my-6 mx-auto max-w-3xl bg-white rounded-tl-lg rounded-tr-lg">
                        {/* BODY */}
                        <div className="h-full w-full p-4">
                            <QRCode
                                size={100}
                                className="w-full h-full"
                                value={pid}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-center px-4 py-1 bg-[#f5f5f5] relative rounded-bl-lg rounded-br-lg">
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

export default PidQRModal;
