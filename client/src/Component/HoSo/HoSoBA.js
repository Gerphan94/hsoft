import React, { useState} from "react";
import styles from "../styles.module.css"


function HoSoBA( { site }  ) {
    const apiURL = process.env.REACT_APP_API_URL;


    const [personInfo, setPersonInfo] = useState({})


    const handleClick = async (pid) => {
        try {
            const fecthURL = apiURL + "/thongtin_benhnhan/" + site +"/" + pid;

            const response = await fetch(fecthURL);
            const data = await response.json();
            setPersonInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return(
        <>
        <div>Hồ sơ bệnh án</div>
        <div className="p-2">
        <div className="flex gap-4 items-center">
            <label>PID:</label>
            <input name="pid" type="number" className="border outline-none px-2 py-1"/>
            <button className={styles.buttonSubmit} onClick={() => handleClick()} >Tìm</button>
        </div>
        <div >
        
        </div>

        </div>
        {/* THÔNG TIN BỆNH NHÂN */}
        <div>
            <div>{personInfo.hoten}</div>

        </div>

        {/* LỊCH SỬ KHÁM */}
        
        </>
    )

}
export default HoSoBA;