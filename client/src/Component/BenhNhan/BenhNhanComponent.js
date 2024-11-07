import React, { useState } from "react";
import { SuccessAlert } from "../Common/Alert";
function BenhNhanComponent({ person }) {


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleClick = (mabn) => {
        navigator.clipboard.writeText(mabn);
        setShowAlert(true);
        setAlertMessage('Copied ' + mabn + ' to clipboard');

    }

    return (
        <>
            <div
                onClick={() => handleClick(person.mabn)}
                className="w-full border rounded-lg px-5 py-3 select-none shadow-lg hover:bg-[#608BC1] hover:text-white hover:scale-105 cursor-pointer">
                <div className="">{person.mabn}</div>
                <div className="font-bold text-lg">{person.hoten}</div>

            </div>
            {showAlert && <SuccessAlert visible={showAlert} setVisible={setShowAlert} message={alertMessage} />}

        </>

    );
}

export default BenhNhanComponent;