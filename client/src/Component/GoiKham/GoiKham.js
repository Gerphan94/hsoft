import React, { useState } from "react";
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";
import DSgoi from "./GoiKhamDSModal";
import GoiList from "./GoiList";
import GoiBNList from "./GoiBN";

function GoiKham({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [pid, setPid] = useState(null);
    const [person, setPerson] = useState({});

    const [goiList, setGoiList] = useState([]);
    const [goiChitiet, setGoiChitiet] = useState([]);

    const [isGoiList, setIsGoiList] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        const numericValue = e.target.value.replace(/[^0-9]/g, "");
        setPid(numericValue);
    }

    const fetchPersonInfo = async () => {
        
        try {
            const fecthURLPerson = apiURL + "thongtin_benhnhan/" + site + "/" + pid; 
            const response = await fetch(fecthURLPerson);
            const data = await response.json();
            setPerson(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    const fetchPacket = async () => {
        try {
            const fecthURL = apiURL + "goikham/" + site + "/" + pid;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setGoiList(data);
            setGoiChitiet([]);
            setIsGoiList(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleView = () => {
        fetchPersonInfo();
        fetchPacket();
    }

    



    return (
        <>
            <div className="p-4">
                <div className="text-left flex gap-4 items-center">
                    <button
                        className="w-8 h-8 text-2xl flex items-center justify-center"
                        onClick={() => setModalShow(true)}

                    ><RiAlignJustify /></button>
                    <label>Mã BN:</label>
                    <div className="flex">
                        <input
                            name="inputPid"
                            type="text"
                            className="border px-2 py-1 outline-none h-8 "
                            placeholder="Nhập PID"
                            value={pid}
                            onChange={handleChange}
                        />
                        <button className="bg-blue-400 h-8 w-8 flex items-center justify-center" onClick={() => handleView()}>
                            <RiSearch2Line className="h-full text-white font-bold" />
                        </button>
                    </div>

                    <div className="text-lg font-bold">{person.hoten}</div>

                  

                </div>
            </div>

            <div className="flex p-4">
                {modalShow &&
                    <DSgoi setModalShow={setModalShow} />

                }
                <div className="w-1/4">
                    <div className="flex w-full">
                        <div 
                        className={`px-2 py-1.5 bg-[#031C30] mb-2 text-center text-white font-bold flex-1 cursor-pointer ${isGoiList ? 'opacity-50': 'opacity-100'}`}
                        onClick={() => setIsGoiList(false)}
                        >
                            Danh BN
                            </div>

                        <div 
                        className={`px-2 py-1.5 bg-[#031C30] mb-2 text-center text-white font-bold flex-1 cursor-pointer ${isGoiList ? 'opacity-100': 'opacity-50'} `}
                        onClick={() => setIsGoiList(true)}
                        
                        >Danh sách gói</div>
                    </div>

                    {isGoiList ?
                        <GoiList site={site} goiList={goiList}  setGoiChitiet={setGoiChitiet}  />
                    :
                        <GoiBNList site={site} />
                    }
                </div>

                <div className="mt-0 px-4 w-full lg:h-[720px] overflow-y-auto" >
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-200 ">
                                <th><div className="w-10 py-1">STT</div></th>
                                <th><div className="">Mã</div></th>
                                <th><div>Tên dịch vụ</div></th>
                                <th><div>Đơn giá</div></th>
                                <th><div>Đơn giá gói</div></th>
                                <th><div className="w-10 text-center">SL</div></th>
                                <th><div className="w-10 text-center">SLSD</div></th>
                            </tr>

                        </thead>
                        <tbody>
                            {goiChitiet.map((chitiet) =>
                                <tr key={chitiet.stt}
                                    className={`even:bg-gray-200 ${chitiet.sl === chitiet.slsudung ? 'text-red-600' : ''}`}  >
                                    <td><div>{chitiet.stt}</div></td>
                                    <td><div>{chitiet.mavp}</div></td>
                                    <td><div className="text-left">{chitiet.ten}</div></td>
                                    <td><div className="text-right">{Number(chitiet.dongia).toLocaleString()}</div></td>
                                    <td><div className="text-right">{Number(chitiet.dongiagoi).toLocaleString()}</div></td>
                                    <td><div className="text-center">{chitiet.sl}</div></td>
                                    <td><div className="text-center">{chitiet.slsudung}</div></td>
                                </tr>
                            )}
                        </tbody>
                    </table>


                </div>

            </div>





        </>
    )

}

export default GoiKham;