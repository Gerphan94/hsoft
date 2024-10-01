import React from "react";
import { PiClipboardTextLight } from "react-icons/pi";

function SQLElement({ data }) {


    return (
        <>
            <div className="w-full px-4 py-2 border rounded-lg text-left space-y-2">
                <div className="flex justify-between">
                <div className="font-bold text-lg text-left">{data.name}</div>
                <button className="size-6"><PiClipboardTextLight className="size-full" /></button>

                </div>
                <div>{data.des}</div>
                <div className=" bg-pink-100 px-2 py-1">{data.query}</div>

            </div>
        </>
    )
}

export default SQLElement;