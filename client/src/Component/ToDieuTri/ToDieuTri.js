import React, { useState, useEffect } from "react";

import PageHeader from "../PageHeader";

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
            <div className="w-full flex flex-col">
                <PageHeader title="Tờ điều trị" >
                </PageHeader>
            </div>



        </>
    )
}

export default ToDieuTri;