import React from "react";
import styles from "../styles.module.css"; // Assuming you are using this styles file
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Store/AppContext";

function ChooseSite({ setModalShow }) {

    const { setSite } = useAppContext();

    const navigate = useNavigate();
    const sites = [
        { id: 'HCM_DEV', name: 'HCM - DEV' },
        { id: 'HN_DEV', name: 'HN - DEV' },
    ];

    const handleClick = (id) => {
        localStorage.setItem('site', id);
        setSite(id);
        navigate('/');
    };

    return (
        <>
            <div>
                <div className="fixed inset-0 z-[888] outline-none focus:outline-none">
                    <div className="relative lg:w-1/3 md:w-2/3 top-1/4 w-full my-6 mx-auto max-w-3xl bg-white text-3xl">
                        <div className="grid grid-cols-1 p-10 gap-3">
                            {sites.map((site) => (
                                <div 
                                    key={site.id} // Ensure each item has a unique key
                                    className="border rounded-md p-3 hover:bg-[#9BB0C1] hover:text-white cursor-pointer"
                                    onClick={() => handleClick(site.id)}
                                >
                                    {site.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-[777] bg-black"></div>
            </div>
        </>
    );
}

export default ChooseSite;
