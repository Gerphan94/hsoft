import React, { useState } from "react";
import { useAppContext } from "./Store/AppContext";
import ChooseSiteModal from "./Site/ChooseSiteModal";
function PageHeader({ title }) {

    const { siteName } = useAppContext();
    const [showChooseSiteModal, setShowChooseSiteModal] = useState(false);

    return (
        <>
            <div className="w-full shadow-lg border-b text-left flex justify-between items-center select-none">
                <h1 className="font-bold text-xl px-8 py-2 uppercase ">{title}</h1>
                <button
                    className="px-4 italic text-gray-500 hover:underline hover:text-[#000B58]"
                    onClick={() => setShowChooseSiteModal(true)}
                >
                    {siteName}
                </button>

            </div>
            {showChooseSiteModal &&
                <ChooseSiteModal
                    setShowModal={setShowChooseSiteModal}
                />}
        </>

    );
}

export default PageHeader;  