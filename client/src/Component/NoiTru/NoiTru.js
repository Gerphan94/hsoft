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
import SideMenu from "../SideMenu";
import { useAppContext } from "../Store/AppContext";
import TuTrucModal from "./TuTruc/TuTrucModal";

import { FaAngleDown } from "react-icons/fa6";

function NoiTru() {

    const apiURL = process.env.REACT_APP_API_URL;
    // const [site, setSite ] = useState(localStorage.getItem('site'));
    console.log('render noi tru');

    const { site, setSelectedSideBar } = useAppContext();

    const [selectedBTN, setSelectedBNT] = useState(1);

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: 0, name: '' });
    const [hiendiens, setHiendiens] = useState([]);
    const [viewData, setViewData] = useState([]);

    const [selected, setSelected] = useState({ pid: '', pname: '', idkhoa: '', maql: '' });

    const [isShowModalThuoc, setIsShowModalThuoc] = useState(false);
    const [showDichVuModal, setShowDichVuModal] = useState(false);
    const [showMauModal, setShowMauModal] = useState(false);
    const [showBHYTModal, setShowBHYTModal] = useState(false);
    const [showTodieuTriModal, setShowTodieuTriModal] = useState(false);

    const [showTuTrucModal, setShowTuTrucModal] = useState(false);

    useEffect(() => {
        if (!site) {
            return
        }
        const fetchDanhsachKhoa = async () => {
            try {
                const fecthURL = apiURL + "/noitru/dskhoa/" + site;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setKhoas(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        setSelectedSideBar('noitru');
        if (site) {
            fetchDanhsachKhoa();
        }


    }, [site]);

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
            <div className="w-full">
                {/* <SideMenu site={site} setSite={setSite} selectedMenu="noitru" /> */}
                <div className="w-full">
                    <div className="px-4 py-2 text-left flex gap-4 border-b shadow-md">Nội trú</div>
                    <div className="flex items-center px-4 justify-between">
                        <div className="flex p-2 gap-2 items-center">

                            <label className="font-bold">Khoa: </label>
                            <div className="w-[600px]">
                                <Dropdown data={khoas} selectedOption={selectedKhoa} setSelectedOption={setSelectedKhoa} />
                            </div>
                            <div className="h-full">
                                <button
                                    type="button"
                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                                    onClick={gethiendien}
                                >
                                    Xem
                                </button>

                            </div>
                            {/* <TouchSwitch /> */}
                            <div>
                                <input type="text" className="border px-2 py-1 outline-none h-8 " />
                            </div>
                        </div>
                        <div>
                            <button
                                className="border px-2 py-1"
                                onClick={() => setShowTuTrucModal(true)}

                            >Tồn tủ trực</button>
                        </div>
                    </div>

                    <div className="px-4 py-1 flex flex-row justify-between">
                        <div className="flex gap-2 items-center text-left">
                            <div className="font-bold text-xl">{selected.pid}</div>
                            <div className="font-bold text-xl">{selected.pname}</div>
                        </div>

                        <div className="flex bg-white">
                            <button
                                className={`w-20 border border-r-0 border-[#B7E0FF] px-2 py-1 select-none disabled:bg-[#E5E5E5] disabled:text-[#ACACAC] disabled:border-[#ACACAC] disabled:cursor-not-allowed`}
                                onClick={() => setShowBHYTModal(true)}
                                disabled={selected.pid === ''}
                            >BHYT
                            </button>
                            <button
                                className="w-20 border border-r-0 border-[#B7E0FF] px-2 py-1 select-none disabled:bg-[#E5E5E5] disabled:text-[#ACACAC] disabled:border-[#ACACAC] disabled:cursor-not-allowed"
                                onClick={() => setShowDichVuModal(true)}
                                disabled={selected.pid === ''}
                            >Dịch vụ
                            </button>
                            <button
                                className="w-20 border border-r-0 border-[#B7E0FF] px-2 py-1 select-none disabled:bg-[#E5E5E5] disabled:text-[#ACACAC] disabled:border-[#ACACAC] disabled:cursor-not-allowed"
                                onClick={() => setShowMauModal(true)}
                                disabled={selected.pid === ''}
                            >Máu
                            </button>
                            <button
                                className="w-20 border border-r-0 border-[#B7E0FF] px-2 py-1 select-none disabled:bg-[#E5E5E5] disabled:text-[#ACACAC] disabled:border-[#ACACAC] disabled:cursor-not-allowed"
                                onClick={() => setIsShowModalThuoc(true)}
                                disabled={selected.pid === ''}
                            >Thuốc
                            </button>
                            <button
                                className="w-20 border  border-[#B7E0FF] px-2 py-1 select-none disabled:bg-[#E5E5E5] disabled:text-[#ACACAC] disabled:border-[#ACACAC] disabled:cursor-not-allowed"
                                disabled={selected.pid === ''}
                                onClick={() => setShowTodieuTriModal(true)}
                            >TĐT
                            </button>
                           
                            <div>
                            </div>
                        </div>
                    </div>

                    <Hiendien
                        site={site}
                        data={viewData}
                        selected={selected}
                        setSelected={setSelected}
                    />

                </div>
            </div>



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

            {showTuTrucModal &&
                <TuTrucModal
                    site={site}
                    setShowModal={setShowTuTrucModal}
                    khoa={selectedKhoa}
                />}




        </>
    );
}
export default NoiTru;