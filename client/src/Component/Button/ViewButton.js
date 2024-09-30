import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

function ViewButton({ onClick }) {

    return (
        <>
            <button
            



                type="button"
                onClick={onClick}
                className="relative inline-flex w-20 items-center justify-center px-1 py-1  overflow-hidden text-indigo-600 transition duration-300 ease-out border border-blue-500 shadow-md group">
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-400 group-hover:translate-x-0 ease">
                    <FaEye className="h-5 w-5" />
                </span>
                <span class="absolute flex items-center justify-center w-full h-full text-blue-500 font-bold transition-all duration-300 transform group-hover:translate-x-full ease">Xem</span>
                <span class="relative invisible h-full">Xem</span>
            </button>
        </>
    );
}

export default ViewButton;