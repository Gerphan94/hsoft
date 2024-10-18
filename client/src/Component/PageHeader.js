import React from "react";

function PageHeader({ title, children }) {
    return (
        <div className="w-full shadow-lg border-b text-left flex justify-between">
            <h1 className="font-bold text-xl px-8 py-2 uppercase select-none">{title}</h1>
            <div className="p-2">
                {children}
            </div>

        </div>
    );
}

export default PageHeader;  