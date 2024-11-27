import React from "react";
import { FcUpRight } from "react-icons/fc";

function CanLamSang({ cls }) {

    return (
        <>
        {cls.tdt && cls.tdt.length > 0 &&
            <div className="">
                <div>
                    <div className="flex gap-2 items-center">
                    <div className="font-bold underline">CLS:</div>
                    <button><FcUpRight /></button>

                    </div>
                    
                    {cls.tdt && cls.tdt.map((item, index) => (<div key={index}>- {item.ten}</div>))}
                </div>
            </div>
            }
        </>
    )
}

export default CanLamSang;  