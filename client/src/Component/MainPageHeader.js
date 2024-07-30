import React from "react";

function MainPageHeader( { title } ) {
    return (
        <>
            <div className="p-2 w-full border-b flex gap-2 items-center">

                <div className="text-left text-2xl font-bold">{title}</div>

            </div>
        </>
    )


}
export default MainPageHeader;