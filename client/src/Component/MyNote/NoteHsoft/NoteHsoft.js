import React from "react";
import TomTatBATemplate from "./TomTatBATemplate";
import QRCode from "react-qr-code";


function NoteHsoft() {


    return (
        <>
            <div className="px-40 py-10">
                <div className="text-left font-bold py-1 uppercase">HSOFT</div>
                <TomTatBATemplate />
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={'123'}
                    viewBox={`0 0 256 256`}
                />




            </div>


        </>
    )


}


export default NoteHsoft;