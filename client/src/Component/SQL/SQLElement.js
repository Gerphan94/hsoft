import React from "react";

function SQLElement({ data }) {


    return (
        <>
            <div className="p-4">
                <div className="font-bold text-lg text-left">{data.name}</div>
                {data['data'].map((childdata) =>
                    <div className="text-left mb-5 w-[800px]">
                        <div className="font-bold">{childdata.name}</div>
                        <div className="italic">{childdata.des}</div>
                        <div className="bg-gray-100 p-4 text-[#803D3B] whitespace-pre-wrap">{childdata.sql}</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SQLElement;