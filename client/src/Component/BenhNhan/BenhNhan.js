import React, { useState } from "react";
import PageHeader from "../PageHeader";
import { useAppContext } from "../Store/AppContext";
import BenhNhanComponent from "./BenhNhanComponent";

import Loading from "../Loading";
function BenhNhan() {


    const { site } = useAppContext();

    const apiURL = process.env.REACT_APP_API_URL;

    const [isLoading, setIsLoading] = useState(false);

    const [persons, setPersons] = useState([]);

    const handleRandom = async () => {
        setIsLoading(true);
        try {
            const fecthURL = apiURL + "benhnhan/get-random-benhnhan/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setPersons(data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    

    return (
        <>
            <div className="w-full">
                <PageHeader title="Random Bệnh nhân" />
                <div className="px-20 py-4 flex gap-4">
                    <button
                        className="btn btn-view"
                        onClick={handleRandom}
                    >RANDOM</button>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 p-20 gap-10">
                    {persons.map((person) => (
                        <BenhNhanComponent person={person} />
                    ))}

                </div>
            </div>

            {isLoading && <Loading />}
        </>
    )

}

export default BenhNhan;