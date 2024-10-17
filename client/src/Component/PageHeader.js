import React from "react";

function PageHeader(props) {
    return (
        <div className="w-full shadow-lg border-b">
            <h1 className="font-bold text-xl px-4 py-3">{props.title}</h1>
        </div>
    );
}

export default PageHeader;  