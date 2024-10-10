import React from "react";

export const BtnOK = ( {onClik,  name='Save' } ) => {
    return (
        <button
            className="flex gap-2 items-center bg-[#049474] border border-[#049474] text-white font-bold py-1 pl-4 pr-6 focus:shadow-outline hover:bg-[#06755C]"
            type="submit"
            onClik={onClik}
        >
            {name}
        </button>
    );
};
