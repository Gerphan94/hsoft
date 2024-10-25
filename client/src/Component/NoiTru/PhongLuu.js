import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import ViewButton from "../Button/ViewButton";
import TouchSwitch from "../TouchSwitch";
import { useAppContext } from "../Store/AppContext";

import ThuocModal from "./Thuoc/ThuocModal";
import DichVuModal from "./DichVu/DichVuModal";
import MauModal from "./Mau/MauModal";
import Hiendien from "./HiendienTable";
import BHYTModal from "./BHYT/BhytModal";
import PhongLuuTable from "./PhongLuuTable";
import ToDieuTriModal from "./ToDieuTri/ToDieuTrIModal";
import PageHeader from "../PageHeader";

function PhongLuu() {

    const apiURL = process.env.REACT_APP_API_URL;
    const { site, setSelectedSideBar } = useAppContext();
    const monthNow = new Date().getMonth() + 1;


    const [selectedBTN, setSelectedBNT] = useState(1);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: 999, name: 'Cấp cứu' });
    const [hiendiens, setHiendiens] = useState([]);
    const [viewData, setViewData] = useState([]);

    const [selectedPatient, setSelectedPatient] = useState({ 'pid': '', 'name': '' });
    const [selectedIdKhoaOfPatinent, setSelectedIdKhoaOfPatinent] = useState('');

    const [selected, setSelected] = useState({ pid: '', pname: '',   maql: '' });


    const [isShowModalThuoc, setIsShowModalThuoc] = useState(false);
    const [showDichVuModal, setShowDichVuModal] = useState(false);
    const [showMauModal, setShowMauModal] = useState(false);
    const [showBHYTModal, setShowBHYTModal] = useState(false);
    const [showTodieuTriModal, setShowTodieuTriModal] = useState(false);

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const convertMothyearToChars = (month, year) => {
        const mothChar = month < 10 ? '0' + month : month;
        const yearChar = year.toString().slice(-2);
        return `${mothChar}${yearChar}`;
    }

    const handleClickView = () => {
        const mothYear = convertMothyearToChars(month, year);
        console.log('mothYear', mothYear)
        const fecthURL = apiURL + "noitru/hiendien-phongluu/" + site + "/" + mothYear;
        console.log(fecthURL)
        const gethiendien = async () => {
            try {
                const response = await fetch(fecthURL);
                const data = await response.json();
                setHiendiens(data);
                setViewData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        gethiendien();

    }

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
            <PageHeader title="Phòng lưu" />
            <div className="p-4">
                <div className="w-full text-left px-4 py-1 flex gap-4 items-center">
                    <div className="flex gap-2 items-center">
                        <label>Tháng</label>
                        <select
                            value={month}
                            className="px-2 py-0.5 border outline-none"
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                    disabled={item > monthNow}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2 items-center">
                        <label>Năm: </label>
                        <select
                            value={year}
                            className="px-2 py-0.5 border outline-none"
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option>2024</option>
                        </select>
                    </div>
                    <button
                        className="btn-view"
                        onClick={handleClickView}

                    >Xem</button>
                </div>


                <div className="px-4 py-1 flex flex-row justify-between">
                    <div className="flex gap-2 items-center text-left">
                        <div className="font-bold text-xl">{selected.pid}</div>
                        <div className="font-bold text-xl">{selected.pname}</div>
                    </div>
                </div>


                <PhongLuuTable
                    site={site}
                    data={viewData}
                    setSelected={setSelected}
                    setSelectedIdKhoaOfPatinent={setSelectedIdKhoaOfPatinent}
                />
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




        </>
    );
}
export default PhongLuu;