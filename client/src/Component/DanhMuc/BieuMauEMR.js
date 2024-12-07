import React, { useEffect, useState } from "react";
import { useAppContext } from "../Store/AppContext";
function BieuMauEMR() {

    const apiURL = process.env.REACT_APP_API_URL;
    const { site, area } = useAppContext();

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const fetchURL = `${apiURL}emr/danhmuc-bieumau-emr?site=${site}`;
            const response = await fetch(fetchURL);
            const data = await response.json();
            console.log('data', data)
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [site]);


    return (
        <>
        {data.map((item) => (
                <div key={item.idgay} className=" px-2">
                    <div>{item.tengay}</div>
                  
                
                
            
                
                </div>
            ))}
        </>
    )


}


export default BieuMauEMR