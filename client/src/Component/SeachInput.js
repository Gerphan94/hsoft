import React from "react";

function SeachInput(props) {


    return (
        <>
        <input
                    type="text"
                    className="border w-56 px-2 py-1 outline-none"
                    placeholder="Nhập mã, tên, ..."
                    // value={searchTerm}
                    spellCheck="false"
                    // onChange={handleSearch}
                />
        </>
    )

}
export default SeachInput;