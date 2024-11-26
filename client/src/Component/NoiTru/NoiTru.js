import React, { useEffect, useState } from "react";


import { useAppContext } from "../Store/AppContext";

import Dropdown from "../Common/Dropdown";

import PageHeader from "../PageHeader";
// Import modal
import ThuocModal from "./Thuoc/ThuocModal";
import DichVuModal from "./DichVu/DichVuModal";
import MauModal from "./Mau/MauModal";
import Hiendien from "./HiendienTable";
import BHYTModal from "./BHYT/BhytModal";
import ToDieuTriModal from "./ToDieuTri/ToDieuTriModal";
import PhieuCongKhaiModal from "./Emr/PhieuCongKhaiModal";
import QuanLyGiuongModal from "./QLGiuong/QuanLyGiuongModal";


import TuTrucModal from "./TuTruc/TuTrucModal";
import DanhSachPhieuModal from "./Thuoc/DanhSachPhieuModal";
import SearchBar from "../Common/SearchBar";

import ButtonChucNang from "./ButtonChucNang";
import ButtonTienIch from "./ButtonTienIch";

function NoiTru() {

    const apiURL = process.env.REACT_APP_API_URL;

    const ButtonList = [
        { id: "bhyt", name: "BHYT" },
        { id: "dichvu", name: "Dịch vụ" },
        { id: "mau", name: "Máu" },
        { id: "thuoc", name: "Thuốc" }
    ]

    const [selectedButton, setSelectedButton] = useState({ id: '', name: '' });
    const { site, setSelectedSideBar, area } = useAppContext();

    const [khoas, setKhoas] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState({ id: null, name: '' });
    const [hiendiens, setHiendiens] = useState([]);
    const [viewData, setViewData] = useState([]);

    const [selected, setSelected] = useState({ pid: null, pname: '', idkhoa: '', maql: '', mavv: '', ngayvk: '' });

    const [showMedicineModal, setShowMedicineModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showBloodModal, setShowBloodModal] = useState(false);
    const [showHealthInsurance, setShowHealthInsurance] = useState(false);
    const [showTreatmentSheet, setShowTreatmentSheet] = useState(false);

    const [showPhieuCongKhai, setShowPhieuCongKhai] = useState(false);
    const [showCabinetModal, setShowCabinetModal] = useState(false);

    // TIỆN ÍCH
    const [showDSPhieuModal, setShowDSPhieuModal] = useState(false);
    const [showQLGiuongModal, setShowQLGiuongModal] = useState(false);

    // --------------------------------------------------------------

    const [searchTerm, setSearchTerm] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (!site) {
            return
        }
        const fetchDanhsachKhoa = async () => {
            try {
                const fecthURL = apiURL + "/noitru/dskhoa/" + site + "/" + area;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setKhoas(data);
                setSelectedKhoa({ id: data[0].id, name: data[0].name });
                setHiendiens([]);
                setViewData([]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        setSelectedSideBar('noitru');
        if (site) {
            fetchDanhsachKhoa();
            setSelectedKhoa({ id: null, name: '' });

        }
    }, [area]);

    const gethiendien = async () => {
        try {
            // const fecthURL = apiURL + "noitru/hiendien/" + site + "/" + selectedKhoa.id;
            const fecthURL = `${apiURL}noitru/hiendien?site=${site}&makp=${selectedKhoa.id}`
            console.log(fecthURL)
            const response = await fetch(fecthURL);
            const data = await response.json();
            setHiendiens(data);
            setViewData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const search = (data, seachValue) => {
        if (seachValue === '') {
            return data;
        }
        return data.filter((item) => item.mabn.toLowerCase().includes(seachValue.toLowerCase()) || item.hoten.toLowerCase().includes(seachValue.toLowerCase()));
    }

    // Search
    const handleSearch = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewData(search(hiendiens, searchTerm));
        }, 1000);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewData(search(hiendiens, searchTerm));
        }, 1000);
        setTimeoutId(newTimeoutId);
    }, [searchTerm]);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    useEffect(() => {

    }, [selectedButton.id]);

    return (
        <>
            <div className="w-full">
                <PageHeader title="Nội trú" />
                <div className="flex items-center px-4 justify-between">
                    <div className="flex p-2 gap-2 items-center">
                        <label className="font-bold">Khoa: </label>
                        <div className="w-[600px]">
                            <Dropdown
                                data={khoas}
                                selectedOption={selectedKhoa}
                                setSelectedOption={setSelectedKhoa}
                                searchable
                            />
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
                        <div className="w-96">
                            <SearchBar
                                placeholder='Nhập PID, Họ tên'
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                handleSearch={handleSearch}

                            />

                        </div>
                    </div>

                </div>

                <div className="px-4 py-1 flex flex-row justify-between">
                    <div className="flex gap-2 items-center text-left">
                        <div className="font-bold text-xl">{selected.pid}</div>
                        <div className="font-bold text-xl">{selected.pname}</div>
                    </div>

                    <div className="flex bg-white">

                        <ButtonChucNang
                            selectedPatient={selected}
                            setShowHealthInsurance={setShowHealthInsurance}
                            setShowServiceModal={setShowServiceModal}
                            setShowBloodModal={setShowBloodModal}
                            setShowMedicineModal={setShowMedicineModal}
                            setShowTreatmentSheet={setShowTreatmentSheet}
                            setShowPhieuCongKhai={setShowPhieuCongKhai}
                        />
                        <ButtonTienIch
                            setShowCabinetModal={setShowCabinetModal}
                            setShowDSPhieuModal={setShowDSPhieuModal}
                            setShowQLGiuongModal={setShowQLGiuongModal}


                        />

                    </div>
                </div>
                <div>
                <Hiendien
                    site={site}
                    data={viewData}
                    selected={selected}
                    setSelected={setSelected}
                />


                    </div>

               

            </div>

            {showMedicineModal &&
                <ThuocModal
                    site={site}

                    selected={selected}
                    setModalShow={setShowMedicineModal}
                />}

            {showServiceModal &&
                <DichVuModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowServiceModal}
                />}

            {showBloodModal &&
                <MauModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowBloodModal}
                />}

            {showHealthInsurance &&
                <BHYTModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowHealthInsurance}
                />}

            {showTreatmentSheet &&
                <ToDieuTriModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowTreatmentSheet}
                />}

            {showPhieuCongKhai &&
                <PhieuCongKhaiModal
                    site={site}
                    selected={selected}
                    setModalShow={setShowPhieuCongKhai}
                />}


            {showCabinetModal &&
                <TuTrucModal
                    site={site}
                    setShowModal={setShowCabinetModal}
                    khoa={selectedKhoa}
                />}

            {showDSPhieuModal &&
                <DanhSachPhieuModal
                    site={site}
                    setShowModal={setShowDSPhieuModal}
                    khoa={selectedKhoa}
                />}

            {showQLGiuongModal &&
                <QuanLyGiuongModal
                    site={site}
                    setShowModal={setShowQLGiuongModal}
                    khoa={selectedKhoa}
                />}
        </>
    );
}
export default NoiTru;