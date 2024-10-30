import React, { useEffect, useState } from "react";


function DanhMucDuocKPModal({ setShowModal, site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [coso, setCoso] = useState([]);
    const [selectedCoso, setSelectedCoso] = useState({ id: 0, name: '' });

    const [duocKps, setDuocKps] = useState([]);
    const [duockpView, setDuockpView] = useState([]);
    const [selectedKp, setSelectedKp] = useState({ id: 0, name: '' });

    useEffect(() => {

        const fetchCoso = async () => {
            const fetchUrl = apiURL + "danhmuc/danhmuc-coso-tamanh/" + site;
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setCoso(data);
            setSelectedCoso({ id: data[0].id, name: data[0].name });

        }
        const fetchDuocKps = async () => {
            console.log('fetchDuocKps')
            const fetchUrl = apiURL + "duoc/danhsach-duockp/" + site;
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setDuocKps(data);
        }
        fetchCoso();
        fetchDuocKps();
        setDuockpView(duocKps ? duocKps.filter(item => item.khu === selectedCoso.id) : []);
    }, []);

    const handeChangeCoso = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        if (selectedOption) {
            const id = parseInt(selectedOption.value);
            console.log('id', typeof (id))

            const name = selectedOption.text;
            setSelectedCoso({ id: id, name: name });

            console.log('-------------------', duocKps);
            setDuockpView(duocKps ? duocKps.filter(item => item.khu === id) : []);
        }
    }


    const handleClick = (id, name) => {
        console.log(id, name);
        setSelectedKp({ id: id, name: name });
    }


    return (

        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            Danh mục khoa phòng
                        </div>
                        {/* BODY */}
                        <div className="text-left px-4 py-2">
                            <select
                                className="border px-2 py-0.5 outline-none"
                                value={selectedCoso.id}
                                onChange={(e) => handeChangeCoso(e)}
                            >
                                {coso.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex h-full px-4 py-2 overflow-hidden ">
                            <div className="h-full w-1/2">
                                <div className=" flex-grow h-full text-left overflow-y-auto text-sm">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="w-6 text-center">STT</th>
                                                <th className="w-32">Dược KP</th>
                                                <th className="w-32">Khoa</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {duockpView.map((duockp, index) => (
                                                <tr key={duockp.id}
                                                    className={`${selectedKp.id === duockp.id ? '!bg-[#9BB0C1]' : ''} hover:bg-[#9BB0C1] cursor-pointer`}
                                                    onClick={() => handleClick(duockp.id, duockp.tenduockp)}
                                                >
                                                    <td className="text-center">{index + 1}</td>

                                                    <td >{duockp.tenduockp}</td>
                                                    <td >{duockp.tenkp}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>


                                </div>


                            </div>
                            <div className="w-1/2 h-full flex text-sm">
                                <div className="px-4 w-full">
                                    <div className="min-h-56">
                                        <div className="bg-[#384B70] w-full text-white px-4 py-0.5">Kho</div>
                                    </div>
                                    <div className="min-h-64">
                                        <div className="bg-[#384B70] w-full text-white px-4 py-0.5">Tủ trực</div>
                                    </div>

                                </div>
                                <div className="flex-grow px-4 w-full h-full overflow-y-auto" >
                                <div className="bg-[#384B70] w-full text-white px-4 py-0.5">Phiếu</div>

                                </div>
                            </div>

                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>



                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )


}
export default DanhMucDuocKPModal