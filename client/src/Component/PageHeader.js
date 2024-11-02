import React from "react";
import { useAppContext } from "./Store/AppContext";

function PageHeader({ title }) {

    const { siteName } = useAppContext();   

    return (
        <div className="w-full shadow-lg border-b text-left flex justify-between items-center">
            <h1 className="font-bold text-xl px-8 py-2 uppercase select-none">{title}</h1>
            <div className="px-4 italic text-gray-500">
                {siteName}
            </div>

        </div>
    );
}

export default PageHeader;  