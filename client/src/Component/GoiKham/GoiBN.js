import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";

function GoiBNList( {site }) {

    const apiURL = process.env.REACT_APP_API_URL;


    const [viewDate, setviewDate] = useState(new Date());


    const handleClick = async () => {
        
        try {
            const fecthURL = apiURL + "goikham_list/" + site + "/" + viewDate; 
            console.log(fecthURL);
            const response = await fetch(fecthURL);
            const data = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }



    }

    return (
        <>
            <div className="flex items-center mb-2">
                <div className="w-14 text-left">Ngày:</div>
                <DatePicker
                    className="border px-2 py-1 w-32 outline-none"
                    selected={viewDate}
                    onChange={(date) => setviewDate(date)}
                />
                <button className="bg-blue-400 h-8 w-8 flex items-center justify-center" onClick={() => handleClick()} >
                    <RiSearch2Line className="h-full text-white font-bold" />

                </button>

            </div>

        </>
    )


}
export default GoiBNList;