import { useState } from "react";

export default function Toggle({ idname, enabled, setEnabled, displayName, toggleble = true }) {

 

    return (
        <div className="relative flex flex-col items-center justify-center py-1 overflow-hidden">
            <div className="flex">
                <label className="inline-flex relative items-center mr-5 cursor-pointer" htmlFor={idname}>
                    <input
                        id={idname}
                        name={idname}
                        type="checkbox"
                        className="sr-only peer"
                        checked={enabled}
                        readOnly
                    />
                    <div
                        onClick={() => {toggleble && setEnabled(!enabled);
                        }}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>
                    <div className="ml-2 text-sm  text-gray-900 select-none"
                        onClick={() => {toggleble && setEnabled(!enabled);}} >
                        {displayName}
                    </div>
                </label>
            </div>
        </div>
    );
}