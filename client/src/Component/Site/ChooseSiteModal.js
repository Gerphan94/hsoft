import React from "react";
import styles from "../styles.module.css"; // Assuming you are using this styles file

function ChooseSiteModal({ setShowModal, setSite, setArea }) {
    const sites = [
        { id: 'HCM_DEV', name: 'Bệnh Viện Đa Khoa Tâm Anh TP. Hồ Chí Minh', area: 1 },
        { id: 'HCM_DEV', name: 'Bệnh Viện Đa Khoa Tâm Anh Quận 8', area: 2 },
        { id: 'HCM_DEV', name: 'Phòng khám Đa Khoa Tâm Anh Quận 7', area: 3 },
        { id: 'HN_DEV', name: 'Bệnh Viện Đa Khoa Tâm Anh Hà Nội', area: 6 },
    ];

    const handleClick = (iSite) => {
        sessionStorage.setItem('site', iSite.id);
        sessionStorage.setItem('area', iSite.area);

        setShowModal(false);
        setSite(iSite.id);
        setArea(iSite.area);
    };

    return (
        <>
            <div>111
                <div className="fixed inset-0 z-[888] outline-none focus:outline-none">
                    <div className="relative lg:w-2/3 md:w-1/2 top-10 w-full my-6 mx-auto max-w-2xl bg-white text-2xl font-bold rounded-xl ">
                        <div className="grid grid-cols-1 p-10 gap-3">
                            {sites.map((site) => (
                                <div 
                                    key={site.id} // Ensure each item has a unique key
                                    className="border rounded-xl p-6  text-center  text-[#1E3E62] hover:bg-[#9BB0C1] hover:text-white cursor-pointer"
                                    onClick={() => handleClick(site)}
                                >
                                    {site.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="opacity-85 fixed inset-0 z-[777] bg-black"></div>
            </div>
        </>
    );
}

export default ChooseSiteModal;
