import { useState } from "react";

export default function Toggle({ idname, enabled, setEnabled, displayName = '', toggleble = true }) {

    return (
        <div className="relative flex flex-col items-center justify-center px-2 py-1 overflow-hidden">
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
                        onClick={() => {
                            toggleble && setEnabled(!enabled);
                        }}
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"                    ></div>
                    <div className="ml-2 text-sm  text-gray-900 select-none"
                        onClick={() => { toggleble && setEnabled(!enabled); }} >
                        {displayName}
                    </div>
                </label>
            </div>
        </div>
    )






}