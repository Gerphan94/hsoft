import React, { useEffect, useState } from "react";
import styles from "../../styles.module.css"
import ThuocDetail from "./ThuocModalDetail";
import PhieuDanhSach from "./PhieuDanhSach";
import moment from "moment";
import PhieuDetail from "./PhieuDetail";
import ChitietXuatThuoc from "./ChitietXuatThuoc";

function ThuocModal({ site, selected, setModalShow }) {

    const title = 'THUỐC - ' + selected.pid + ' - ' + selected.pname;

    const apiURL = process.env.REACT_APP_API_URL;

    const [dutrull, setDutrull] = useState([]);
    const [detail, setDetail] = useState({'detail': {}, 'thuoc':[]});
    const [danhSachThuoc, setDanhSachThuoc] = useState([]);
    const [thucxuat, setThucxuat] = useState([]);


    const [selectedCoupon, setSelectedCoupon] = useState({ id: null, name: '', type: '', thangnam: '' });
    const [medicineDetail, setMedicineDetail] = useState([]);
    const [dutrullDetail, setDutrullDetail] = useState({});
    const [tabNumber, setTabNumber] = useState(1);


    const fetchDutrull = async () => {
        const fetchUrl = apiURL + "noitru/thuoc-danhsach-theo-idkhoa/" + site + "/" + selected.idkhoa
        const response = await fetch(fetchUrl);
        const data = await response.json();
        console.log('-------', data)

        const grouped = data.reduce((acc, item) => {
            console.log(acc)
            const date = moment(item.ngaytao).utc().format('DD/MM/YYYY');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;

        }, {});
        console.log(grouped)
        setDutrull(grouped);
    }

    useEffect(() => {
        fetchDutrull();
    }, [selected.idkhoa]);

    const onClickReload = () => {
        setMedicineDetail([]);
        fetchDutrull();
    }
    // useEffect(() => {
    //     setGroupedData(dutrull);
    // }, [dutrull]);

    useEffect(() => {
        const fetchDetail = async () => {
            const fetchUrl = selectedCoupon.type === 2 ?
                `${apiURL}noitru/thuoc-xtutrucct?site=${site}&id=${selectedCoupon.id}&thangnam=${selectedCoupon.thangnam}` :
                `${apiURL}noitru/thuoc-dutruct?site=${site}&id=${selectedCoupon.id}&thangnam=${selectedCoupon.thangnam}`
            try {
                console.log(fetchUrl)
                const response = await fetch(fetchUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setDetail(data);
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
      
        const getThucxuat = async () => {
            const fetchurl = apiURL + "duoc/get-thucxuat-benhnhan-by-id/" + site + "/" + selectedCoupon.id;
            const response = await fetch(fetchurl);
            const data = await response.json();
            console.log(data)
            setThucxuat(data);
        };

        if (selectedCoupon && selectedCoupon.id) {
            getThucxuat();
            fetchDetail();
        }
    }, [selectedCoupon.id])

    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-grow flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {title}
                        </div>
                        {/* BODY */}
                        <div className="flex h-full p-4 overflow-hidden gap-6">
                            <div className="h-full w-1/3 border p-2 rounded-lg shadow-lg">
                                <div className=" flex-grow h-full text-left overflow-y-scroll p-3">
                                    {Object.keys(dutrull).map((date) => (
                                        <PhieuDanhSach
                                            date={date}
                                            entries={dutrull[date]}
                                            setDutrullDetail={setDutrullDetail}
                                            selectedCoupon={selectedCoupon}
                                            setSelectedCoupon={setSelectedCoupon}
                                        />
                                    ))}
                                </div>

                            </div>

                            <div className="w-2/3 h-full border p-3 rounded-lg shadow-lg">
                                <div className="flex-grow px-4 w-full h-full overflow-y-scroll" >
                                    {selectedCoupon && selectedCoupon.id &&
                                        <PhieuDetail
                                            selectedCoupon={selectedCoupon}
                                            detail={detail}
                                            couponType={selectedCoupon.type}
                                        />}



                                </div>
                            </div>
                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className="btn btn-view"
                                onClick={onClickReload}
                            >
                                Xem
                            </button>

                            <button
                                className="btn btn-close"
                                type="button"
                                onClick={() => setModalShow(false)}
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

export default ThuocModal;