import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";
import TouchSwitch from "../TouchSwitch";

import ThuocModal from "./Thuoc/ThuocModal";
import DichVuModal from "./DichVu/DichVuModal";
import MauModal from "./Mau/MauModal";
import Hiendien from "./HiendienTable";
import BHYTModal from "./BHYT/BhytModal";

import ToDieuTriModal from "./ToDieuTri/ToDieuTrIModal";

function PhongLuu({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [selectedBTN, setSelectedBNT] = useState(1);

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: 999, name: 'Cấp cứu' });
    const [hiendiens, setHiendiens] = useState([]);
    const [viewData, setViewData] = useState([]);

    const [selectedPatient, setSelectedPatient] = useState({ 'pid': '', 'name': '' });
    const [selectedIdKhoaOfPatinent, setSelectedIdKhoaOfPatinent] = useState('');

    const [selected, setSelected] = useState({ pid: '', pname: '', idkhoa: '', maql: '' });


    const [isShowModalThuoc, setIsShowModalThuoc] = useState(false);
    const [showDichVuModal, setShowDichVuModal] = useState(false);
    const [showMauModal, setShowMauModal] = useState(false);
    const [showBHYTModal, setShowBHYTModal] = useState(false);
    const [showTodieuTriModal, setShowTodieuTriModal] = useState(false);

    const funcBTN = [
        { id: 'thuoc', name: 'Thuốc' },
        { id: 'dichvu,', name: 'Dịch vụ' }
    ]

    const otherBTN = [
        { id: 'bhyt', name: 'BHYT' }
    ]


    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/noitru/dskhoa/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setKhoas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const gethiendien = async () => {
        try {
            const fecthURL = apiURL + "noitru/hiendien/" + site + "/" + selectedKhoa.id;
            console.log(fecthURL)
            const response = await fetch(fecthURL);
            const data = await response.json();
            setHiendiens(data);
            setViewData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>

            <div className="flex p-2 gap-2 items-center">
               
                <div className="h-full">
                    <ViewButton onClick={gethiendien} />
                </div>
              

            </div>
            <div className="px-4 py-1 flex flex-row justify-between">
                <div className="flex gap-2 items-center text-left">
                    <div className="font-bold text-xl">{selected.pid}</div>
                    <div className="font-bold text-xl">{selected.pname}</div>
                </div>

                <div className="flex">
                    <button
                        className="w-20 border px-2 py-1 select-none"
                        onClick={() => setShowBHYTModal(true)}
                    >BHYT
                    </button>
                    <button
                        className="w-20 border px-2 py-1 select-none"
                        onClick={() => setShowDichVuModal(true)}
                    >Dịch vụ
                    </button>
                    <button
                        className="w-20 border px-2 py-1 select-none"
                        onClick={() => setShowMauModal(true)}
                    >Máu
                    </button>
                    <button
                        className="w-20 border px-2 py-1 select-none"
                        onClick={() => setIsShowModalThuoc(true)}
                    >Thuốc
                    </button>
                    <button
                        className="w-20 border px-2 py-1 select-none"
                        onClick={() => setShowTodieuTriModal(true)}
                    >TĐT
                    </button>

                    <div>


                        {/* <ButtonList data={otherBTN} setSelectedOption={setSelectedBNT} /> */}
                    </div>
                </div>





            </div>


            <Hiendien
                site={site}
                data={viewData}
                setSelected={setSelected}
                setSelectedIdKhoaOfPatinent={setSelectedIdKhoaOfPatinent}
            />
            {isShowModalThuoc &&
                <ThuocModal
                    site={site}

                    selected={selected}
                    setModalShow={setIsShowModalThuoc}
                />}

            {showDichVuModal &&
                <DichVuModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowDichVuModal}
                />}

            {showMauModal &&
                <MauModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowMauModal}
                />}

            {showBHYTModal &&
                <BHYTModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowBHYTModal}
                />}
            {showTodieuTriModal &&
                <ToDieuTriModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowTodieuTriModal}
                />}




        </>
    );
}
export default PhongLuu;