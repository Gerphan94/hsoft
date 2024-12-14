import React, { useState } from "react";
// import { SuccessAlert } from "../Common/Alert";
import { SuccessAlert } from "../Common/Alert";

import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";

function BenhNhanComponent({ person,selectedPid, setSelectedPid }) {

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleClick = (mabn) => {
        navigator.clipboard.writeText(mabn);
        setShowAlert(true);
        setSelectedPid(mabn);
        setAlertMessage('Copied ' + mabn + ' to clipboard');

    }

    return (
        <>
            <div
                onClick={() => handleClick(person.mabn)}
                className={`w-full border rounded-lg px-5 py-3 select-none shadow-lg ${selectedPid === person.mabn ? 'bg-[#608BC1] text-white' : ''} hover:bg-[#608BC1] hover:text-white hover:scale-105 cursor-pointer`}>
                <div className="">{person.mabn}</div>
                <div className="flex gap-1 justify-center items-center font-bold text-lg">
                    <span>{person.phai === 0 ? <AiOutlineMan className="text-blue-500 " /> : <AiOutlineWoman className="text-pink-500" />}</span>
                    <div className="">{person.hoten}</div>

                </div>

            </div>
            {showAlert && <SuccessAlert visible={showAlert} setVisible={setShowAlert} message={alertMessage} />}

        </>

    );
}

export default BenhNhanComponent;