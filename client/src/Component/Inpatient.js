import React, { useState, useEffect } from "react";
import Dutru from "./Dutru";

function Inpatient( {site }   ) {

    // const apiURL = 'http://127.0.0.1:5000/'

    const apiURL = process.env.REACT_APP_API_URL;
    console.log(apiURL)

    const [pidSearch, setPIDSearch] = useState('')
    const [presentData, setPresentData] = useState([]);
    const [personData, setPersonData] = useState({});
    const [selectedID, setSelectedID] = useState('');

    // Detail List
    const [showDetail, setShowDetail] = useState(false);
    const [detailType, setDetailType] = useState(0);
    const [dutruData, setDutruData] = useState([]);

    const handleChange = (e) => {
        setPIDSearch(e.target.value);
    }

    const hanldeSearch = async (e) => {
        try {
            const response = await fetch(apiURL + "hien_dien/" + site + "/" + pidSearch);
            console.log(apiURL + "hien_dien/" + site + "/" + pidSearch)

            const data = await response.json();
            console.log(data);
            setPresentData(data['hiendien']);
            setPersonData(data['personinfo']);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleThuoc = async () => {

        if (selectedID !== '') {
            try {
                const response = await fetch(apiURL + "hien_dien/dutru_benhnhan/" + site + "/" + selectedID);
                console.log(apiURL + "/hien_dien/dutru_benhnhan/" + site + "/" + selectedID)
                const data = await response.json();
                console.log(data);
                setDutruData(data);
    
                setShowDetail(!showDetail)
                setDetailType(1);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // /hien_dien/dutru_benhnhan/<site>/<hiendien_id>

    }
    return (
        <>
            <div className="p-5">
                <div className="flex gap-10">
                    <div className="text-left mt-2">

                        <label htmlFor="input_pid" className="inline-block" >PID: </label>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            name="input_pid"
                            type="number"
                            className="inline-block w-44 border outline-none px-2 py-1 ml-4"
                        />
                        <button onClick={(e) => hanldeSearch(e)} className="ml-2 borer bg-green-600 text-white px-2 py-1 rounded-md">Tìm</button>
                    </div>

                    {presentData && presentData.length > 0 ?
                        (
                        <div className="flex gap-5 justify-between items-center text-lg">
                            <div className="">
                                {personData['pid']}
                            </div>
                            <div className="font-bold">
                                {personData['hoten']}
                            </div>
                            <div>
                                {personData['ngaysinh']}
                            </div>
                            <div>
                                {personData['phai']}
                            </div>
                        </div>
                        )
                        :
                        (
                            <div className="flex items-center text-lg justify-center text-red-500">
                                Không tìm thấy thông tin bệnh nhân
                            </div>
                        )
                    }
                </div>
                <div className="w-full mt-10">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border bg-gray-200">

                                <th className="py-1">ID</th>
                                <th>PID</th>
                                <th>NGAYVAOVIEN</th>
                                <th>NGAYNHAPKHOA</th>
                                <th>TENKP</th>
                                <th>MAVAOVIEN</th>
                                <th>MAQL</th>
                                <th>LOAIBA</th>

                            </tr>
                        </thead>
                        <tbody>
                            {presentData.map((data) =>
                                <tr key={data.id}
                                    className={`border-b hover:bg-blue-200 ${selectedID === data.id ? 'bg-blue-200' : ''}`}
                                    onClick={() => setSelectedID(data.id)}>
                                    <td className="py-1">{data.id}</td>
                                    <td>{data.pid}</td>
                                    <td>{data.ngayvv}</td>
                                    <td>{data.ngaynk}</td>
                                    <td>{data.tenkp}</td>
                                    <td>{data.mavaovien}</td>
                                    <td>{data.maql}</td>
                                    <td>{data.loaiba}</td>
                                </tr>


                            )}
                        </tbody>

                    </table>
                </div>


                <div className="mt-4 text-left text-white">
                    <button
                        className="border bg-blue-400 px-2 py-1"
                        onClick={() => handleThuoc()}
                    >
                        Thuốc
                    </button>
                    <button
                        className="border bg-blue-400 px-2 py-1 "
                        // onClick={() => handleThuoc()}
                    >
                        Dịch vụ
                    </button>
                    <button
                        className="border bg-blue-400 px-2 py-1"
                        // onClick={() => handleThuoc()}
                    >
                        Chi phí
                    </button>


                </div>
                <div>
                    {/* {detailType===1 && showDetail && */}
                    {showDetail &&
                    <Dutru site={site}  data={dutruData}/>

                    
                    }
                </div>



            </div>



        </>
    )
}

export default Inpatient