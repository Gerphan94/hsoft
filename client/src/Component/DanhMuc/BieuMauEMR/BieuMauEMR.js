import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Store/AppContext";
import Loading from "../../Loading";

import GayBenhAn from "./GayBenhAn";

function BieuMauEMR() {

    const apiURL = process.env.REACT_APP_API_URL;
    const { site, area } = useAppContext();

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const fetchURL = `${apiURL}emr/danhmuc-bieumau-emr?site=${site}`;
            const response = await fetch(fetchURL);
            const data = await response.json();

            const grouped = data.reduce((acc, item) => {
                const key =  `${item.idgay}|${item.tengay}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push({
                    item
                });
                return acc;
            }, {});
            console.log('grouped', grouped)
            setData( grouped);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {

        fetchData();

    }, [site]);







    return (
        <>
            <div className="space-y-4">
                {/* {data.map((item) => (
                    <></>
                    // <GayBenhAn key={item.idgay} data={item} />
                ))} */}
            </div>


            {isLoading && <Loading />}
        </>
    )


}


export default BieuMauEMR