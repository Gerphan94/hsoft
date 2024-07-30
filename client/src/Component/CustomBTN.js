import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

function CustomBTN({ btntype, name }) {


    const [borderColor, setBorderColor] = useState("border-purple-500");
    const [backgroundColor, setBackgroundColor] = useState("bg-purple-500");

    // if (btntype === "view") {
    //     setBorderColor("bg-blue-400");
    //     setBackgroundColor("bg-blue-300");

    // }
    // else  {
    //     setBorderColor("bg-red-500");
    //     setBackgroundColor("bg-red-400");
    // }

    return (
        <>
            <button type="button" class={`relative inline-flex items-center justify-center px-1 py-1  overflow-hidden text-indigo-600 transition duration-300 ease-out border ${borderColor} ${backgroundColor}  shadow-md group`}>
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                    <FaEye className="h-5 w-5" />
                </span>
                <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">{name}</span>
                <span class="relative invisible h-full">{name}</span>
            </button>
        </>

    );
}

export default CustomBTN;