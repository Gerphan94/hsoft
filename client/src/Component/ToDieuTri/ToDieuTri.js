import React, { useState, useEffect } from "react";

import ToaMau from "./ToaMau";
import ButtonMenu from "../ButtonMenu";
import SideMenu from "../SideMenu";

function ToDieuTri({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;
    console.log(site)

    const [selectedOption, setSelectedOption] = useState({ id: 0, name: '' })

    const menuData = [
        { id: 'toamau', name: 'Toa mẫu', borderTop: false },

    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchURL = apiURL + "/tdt";
                const response = await fetch(fetchURL);
                const data = await response.json();
                console.log('data', data)
            
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
        <div className="w-full">
        <div className="flex items-center">
                {/* <div className="w-8">
                    <ButtonMenu data={menuData} setSelectedOption={setSelectedOption} />

                </div> */}
                <div className="font-bold text-lg uppercase">{selectedOption.name}</div>
            </div>
            <div>
                {selectedOption.id === 'toamau' && <ToaMau site={site} />}

            </div>
        </div>
           
        </>
    )
}

export default ToDieuTri;