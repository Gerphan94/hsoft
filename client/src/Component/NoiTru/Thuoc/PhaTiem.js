import React from "react";


function PhaTiem({ data }) {
    return (
        <>
            {data && data.length > 0 ?
                <div className="border rounded-md p-2 mt-4">
                </div>
                :
                <div>KHÔNG CÓ PHA TIÊM</div>
            }
        </>

    )
}

export default PhaTiem;