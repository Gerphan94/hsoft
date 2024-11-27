import React from "react";
import { FcUpRight } from "react-icons/fc";

function DuTruMau({ dutrumau }) {

    return (
        <>
           
                <div className="">
                    <div>
                        <div className="flex gap-2 items-center">
                            <div className="font-bold underline uppercase">Dự trú máu:</div>
                            <button><FcUpRight /></button>
                        </div>
                        <div>Thời gian lãnh máu dự kiến: {dutrumau.maull.ngaydukien} {dutrumau.maull.abo} {dutrumau.maull.rh}</div>

                        {dutrumau.mauct && dutrumau.mauct.map((item, index) => (<div key={index}>- {item.tentuimau}</div>))}
                    </div>
                </div>
            
        </>
    )
}

export default DuTruMau;  