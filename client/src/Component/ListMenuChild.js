import React, { useEffect, useState } from "react";

function ListMenuChild({ data, isShow }) {

    return (

        <>

            {isShow && data.map((item) => (
                <div className=" px-2">{item.name}</div>
            ))}


        </>
    )

}

export default ListMenuChild;