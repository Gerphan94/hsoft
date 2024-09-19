import React, { useState } from "react";
import styles from "./styles.module.css"
import Welcome from "./Welcome";
import Inpatient from "./Inpatient";
import HoSoBA from "./HoSo/HoSoBA";
import GoiKham from "./GoiKham/GoiKham";
import KhamBenh from "./KhamBenh/KhamBenh";
import DatKham from "./DatKham/DatKham";
import SQLCol from "./SQL/SQLCollection";
import DanhMuc from "./DanhMuc/DanhMuc";
import Duoc from "./Duoc/Duoc";
import ToDieuTri from "./ToDieuTri/ToDieuTri";
import NoiTru from "./NoiTru/NoiTru";
import PhongLuu from "./NoiTru/PhongLuu";
import MainPageHeader from "./MainPageHeader";

import SideMenu from "./SideMenu";
import ChooseSite from "./Site/ChooseSite";

import { GiHospitalCross } from "react-icons/gi";


function MainPage() {

    const [site, setSite] = useState({ id: 'HCM_DEV', name: 'HCM - DEV' })
    const [selectedFunc, setSelectedFunc] = useState('welcome');
    const [pageTitle, setPageTitle] = useState('')
    const [mainIcon, setMainIcon] = useState(null);


    const [isChooseSite, setIsChooseSite] = useState(false);

    const sites = [
        { id: 'HCM_DEV', name: 'HCM - DEV' },
        { id: 'HCM_UAT', name: 'HCM - UAT' },
        { id: 'HN_DEV', name: 'HN - Dev' },
        { id: 'HN_LIVE', name: 'HN - Live' }
    ]

    return (
        <>

            <div className={styles.bodyPage}>
                <div className="flex">
                    <div className="w-56  h-screen border-r-2 bg-[#031C30]">
                        <div className="flex justify-between">
                            <div className="text-white font-bold text-2xl p-2">{site.name}</div>
                            <div className="flex items-center">
                            <button
                                className="p-2  text-white"
                                onClick={() => setIsChooseSite(true)}>
                                <GiHospitalCross className="h-8 w-8" />

                            </button>
                            </div>
                           
                        </div>
                        <SideMenu
                            selectedFunc={selectedFunc}
                            setSelectedFunc={setSelectedFunc}
                            setPageTitle={setPageTitle}
                            setMainIcon={setMainIcon}

                        />
                    </div>
                    <div className={styles.MainPage}>
                        <MainPageHeader title={pageTitle} />
                        <div>
                            {selectedFunc === 'welcome' && <Welcome site={site.id} />}
                            {selectedFunc === 'hosobenhan' && <HoSoBA site={site.id} />}
                            {selectedFunc === 1 && <Inpatient site={site.id} />}
                            {selectedFunc === 'goikham' && <GoiKham site={site.id} />}
                            {selectedFunc === 'khambenh' && <KhamBenh site={site.id} />}
                            {selectedFunc === 'phongluu' && <PhongLuu site={site.id} />}
                            {selectedFunc === 'noitru' && <NoiTru site={site.id} />}
                            {selectedFunc === 'datkham' && <DatKham site={site.id} />}
                            {selectedFunc === 'duoc' && <Duoc site={site.id} />}
                            {selectedFunc === 'todieutri' && <ToDieuTri site={site.id} />}
                            {selectedFunc === 'danhmuc' && <DanhMuc site={site.id} />}
                            {selectedFunc === 'sql' && <SQLCol />}
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
            {/* FOOTER */}
            <div className={`w-full h-5 ${site.id === 'HCM_DEV' || site.id === 'HN_DEV' || site.id === 'HCM_UAT' ? "bg-red-500" : "bg-green-500"}  `} >
                <div className="lowercase text-white text-left text-sm">
                { site.name}
                </div>
                
            </div>
            {isChooseSite &&
                <ChooseSite
                    sites={sites}
                    setSite={setSite}
                    setModalShow={setIsChooseSite}
                    setSelectedFunc={setSelectedFunc}
                    setPageTitle={setPageTitle}

                />}
        </>

    )
}
export default MainPage;