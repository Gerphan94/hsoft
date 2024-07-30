import React from "react";
import styles from "../styles.module.css"

function ChooseSite({ sites, setSite,  setModalShow, setSelectedFunc, setPageTitle }) {

    const handleClick = (id, name) => {
        setSite({id: id, name: name});
        setSelectedFunc('welcome');
        setModalShow(false);
        setPageTitle("WELCOME")

    } 
    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative lg:w-1/3 md:w-2/3 top-1/4 w-full my-6 mx-auto max-w-3xl bg-white text-3xl">
                        <div className="grid grid-cols-1 p-10 gap-3">
                            {sites.map((site) => (
                                <div 
                                    className="border rounded-md p-3 hover:bg-[#9BB0C1] hover:text-white cursor-pointer"
                                    onClick={() => handleClick(site.id, site.name)}
                                >
                                    {site.name}
                                    </div>
                            ))}
                        </div>
                     
                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default ChooseSite;

