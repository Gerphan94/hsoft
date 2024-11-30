import React, { useState } from "react";
import { useAppContext } from "./Store/AppContext";
import ChooseSiteModal from "./Site/ChooseSiteModal";
import { FaAlignJustify } from "react-icons/fa6";
function PageHeader({ title }) {

    const { siteName, longSideBar, setLongSideBar } = useAppContext();
    const [showChooseSiteModal, setShowChooseSiteModal] = useState(false);

    return (
        <>
            <div className="w-full h-10 shadow-lg border-b text-left flex justify-between items-center select-none">
                <div className="flex gap-2 px-2">
                    <button
                        className="text-gray-500 hover:text-gray-600"
                        onClick={() => setLongSideBar(!longSideBar)}
                    >
                        <FaAlignJustify className="size-6" />
                    </button>
                    <h1 className="font-bold text-xl  py-2 uppercase ">{title}</h1>

                </div>
                <button
                    className="px-4 italic text-gray-500 hover:underline hover:text-[#000B58]"
                    onClick={() => setShowChooseSiteModal(true)}
                >
                    {siteName !== '' ? siteName : 'No site found'}
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