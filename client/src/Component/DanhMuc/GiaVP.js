import React, { useEffect, useState } from "react";
import Dropdown from "../Common/Dropdown";
import ViewButton from "../Button/ViewButton";
import { FaPlus, FaMinus, FaDotCircle } from "react-icons/fa";
import { FaFolderTree } from "react-icons/fa6";

import { FcCurrencyExchange, FcFlowChart, FcMoneyTransfer } from "react-icons/fc";
import { FaEye, FaBars } from "react-icons/fa";

function GiaVP({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [selectedGiavpType, setSelectedGiavpType] = useState({ id: 'giavp', name: 'Giá viện phí' });
    const [isShowGiaVP, setIsShowGiaVP] = useState(true);

    const [giavps, setGiavps] = useState([]);
    // const [nhombhytys, setNhombhytys] = useState([]);

    const [nhomVPs, setNhomVPs] = useState([]);
    const [selectedNhomVp, setSelectedNhomVp] = useState({ id: 0, name: '' });
    const [disabledNhomVp, setDisabledNhomVp] = useState(false); 

    const [loaiVps, setLoaiVps] = useState([]);
    const [selectedLoaiVP, setSelectedLoaiVP] = useState({ id: 0, name: '' });
    const [disabledLoaiVP, setDisabledLoaiVP] = useState(false);

    // danhmuc-vienphi/nhomnbhyt/<site>

    const [nhombhyt, setNhombhyt] = useState({ id: 0, name: '' });

    const [treeLoaiVps, setTreeLoaiVps] = useState([]);
    const [showIndex, setShowIndex] = useState(0);
    const [selectedNhomBHYT, setSelectedNhomBHYT] = useState(0);

    const giavpTypes = [
        { id: 'giavp', name: 'Giá viện phí', icon: FcCurrencyExchange },
        { id: 'goivp', name: 'Gói viện phí', icon: FcMoneyTransfer },
        { id: 'dieutiet', name: 'Điều tiết', icon: FcFlowChart }
    ]
    

    useEffect(() => async () => {
        const fetchNhomVps = async () => {
            try {
                const fecthURL = apiURL + "danhmuc-vienphi/nhomnbhyt/" + site;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setNhomVPs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchNhomVps();

    }, []);

    useEffect(() => {
        if (!selectedGiavpType || !selectedGiavpType.id) return;
        if (selectedGiavpType.id === 'giavp') {
            setDisabledNhomVp(false);
            setDisabledLoaiVP(false);
        }
        else {
            setDisabledNhomVp(true);
            setDisabledLoaiVP(true);
        }



    }, [selectedGiavpType?.id, site]);

    useEffect(() => {
        const fetchLoaiVps = async () => {
            if (!selectedNhomVp || !selectedNhomVp.id) return;
            const nhomvpid = selectedNhomVp.id;
            try {
                const fecthURL = apiURL + "danhmuc-vienphi/loaivp/" + site + "/" + nhomvpid;
                console.log(fecthURL);
                const response = await fetch(fecthURL);
                const data = await response.json();
                setLoaiVps(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchLoaiVps();
    }, [selectedNhomVp?.id, site]);

    
    return (
        <>
            <div className="flex flex-col">
                <div className="flex gap-2 px-4 py-2">
                    <div className="w-40">
                        <Dropdown
                            data={giavpTypes}
                            setSelectedOption={setSelectedGiavpType}
                            selectedOption={selectedGiavpType}
                            
                             />
                    </div>
                    <div className="w-80">
                        <Dropdown
                            data={nhomVPs}
                            setSelectedOption={setSelectedNhomVp}
                            selectedOption={selectedNhomVp}
                            disabled={disabledNhomVp}
                            optionALL
                             />
                    </div>
                    <div className="w-80">
                        <Dropdown
                            data={loaiVps}
                            setSelectedOption={setSelectedLoaiVP}
                            selectedOption={selectedLoaiVP}
                            disabled={disabledLoaiVP}
                            optionALL
                             />
                    </div>

                    <button
                        className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1 select-none"
                    // onClick={() => handeleView()}
                    >
                        Xem <FaEye />
                    </button>


                </div>


                <div className="px-4 w-full h-[750px] overflow-y-auto">
                    <table className=" w-full">
                        <thead className="sticky top-0 z-80">
                            <tr className="bg-gray-200 ">
                                <th></th>
                                <th className="text-center w-10"><div className="py-1 text-center">STT</div></th>

                                <th className=""><div>Tên VP</div></th>
                                <th><div className="text-center">DVT</div></th>
                                <th className="w-8"><div className="text-center">BHYT</div></th>
                                <th className=""><div className="px-2 text-right">Giá TH</div></th>
                                <th><div className="text-right">Giá BHYT</div></th>
                                <th><div className="text-right w-20">Giá DV</div></th>
                            </tr>
                        </thead>

                        <tbody>
                            {giavps.map((giavp, index) => (
                                <tr key={index} className="even:bg-gray-200">
                                    <td></td>
                                    <td className="text-center py-1">{index + 1}</td>
                                    <td className="text-left">
                                        <div className="inline-block">
                                            <p>{giavp.ten}</p>
                                        </div>
                                    </td>
                                    <td className="text-center">{giavp.dvt}</td>
                                    <td><div className="text-center">{giavp.bhyt}</div></td>
                                    <td className="text-right px-2">{Number(giavp.giath).toLocaleString()}</td>
                                    <td className="text-right px-2"> {Number(giavp.giabh).toLocaleString()}</td>
                                    <td className="text-right px-2">{Number(giavp.giadv).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default GiaVP;