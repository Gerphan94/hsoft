import React, { useEffect, useState } from "react";
import styles from "../../styles.module.css"
import ThuocDetail from "./ThuocModalDetail";
import CouponList from "./CouponList";
import moment from "moment";
import ChitietThuoc from "./ChitietThuoc";
import ChitietXuatThuoc from "./ChitietXuatThuoc";

function ThuocModal({ site, selected, setModalShow }) {

    const title = 'THUỐC - ' + selected.pid + ' - ' + selected.pname;

    const apiURL = process.env.REACT_APP_API_URL;

    const [dutrull, setDutrull] = useState([]);
    const [chitiet, setChitiet] = useState([]);
    const [thucxuat, setThucxuat] = useState([]);


    const [selectedCoupon, setSelectedCoupon] = useState({ id: null, name: '', type: '', ngay: '' });
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
        const fetchUrl = apiURL + "/noitru/thuoc-chitiet/" + site + "/" + selectedCoupon.type + "/" + selectedCoupon.id;

        const fetchMedicineDetail = async () => {
            const response = await fetch(fetchUrl);
            const data = await response.json();
            console.log(data)
            setMedicineDetail(data);
        }
        const fetchDetail = async () => {
            const fetchURL2 = apiURL + "noitru/thuoc-dutrull-thongtin/" + site + "/" + selectedCoupon.type + "/" + selectedCoupon.id + "/" + selectedCoupon.ngay;

            try {
                const response = await fetch(fetchURL2);
                const data = await response.json();
                console.log('data', data)
                setChitiet(data);
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

        getThucxuat();

        fetchDetail();
        fetchMedicineDetail();
    }, [selectedCoupon])

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
                        <div className="flex h-full p-4 overflow-hidden ">
                            <div className="h-full w-1/3">
                                <div className=" flex-grow h-full text-left overflow-y-auto ">
                                    {Object.keys(dutrull).map((date) => (
                                        <CouponList
                                            date={date}
                                            entries={dutrull[date]}
                                            setDutrullDetail={setDutrullDetail}
                                            selectedCoupon={selectedCoupon}
                                            setSelectedCoupon={setSelectedCoupon}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="w-2/3 h-full">
                                <div className="mt-2 flex-grow px-4 w-full h-full overflow-y-auto my-4" >

                                    <div className="flex border">
                                        <div className="w-56 flex border bg-white">
                                            <button
                                                className={`px-2 py-0.5 hover:bg-blue-300 hover:text-white ${tabNumber === 1 ? 'bg-blue-500 text-white' : ''}`}
                                                onClick={() => setTabNumber(1)}
                                            >Chi tiết</button>
                                            <button
                                                className={`px-2 py-0.5 hover:bg-blue-300 hover:text-white ${tabNumber === 2 ? 'bg-blue-500 text-white' : ''}`}
                                                onClick={() => setTabNumber(2)}
                                            >Thông tin xuất</button>
                                        </div>
                                        <div className="w-full flex justify-between border bg-white p-2 ">
                                            <div className="font-medium">
                                                {chitiet && chitiet.ten ? chitiet.ten : '...'}
                                            </div>
                                            <div>{selectedCoupon && selectedCoupon.id}</div>
                                        </div>
                                    </div>
                                    {selectedCoupon && selectedCoupon.id &&
                                        <>
                                            {tabNumber === 1 ?
                                                <ChitietThuoc
                                                    detail={dutrullDetail}
                                                    data={medicineDetail}
                                                    couponType={selectedCoupon.type}
                                                />
                                                :
                                                <ChitietXuatThuoc
                                                    thucxuat={thucxuat}

                                                />
                                            }

                                        </>
                                        // <ThuocDetail 
                                        // site={site}
                                        // couponType={selectedCoupon.type} 
                                        // data={medicineDetail}
                                        // couponId={selectedCoupon.id}
                                        // selectedCoupon={selectedCoupon}
                                        // />
                                    }
                                </div>
                            </div>
                        </div>
                        {/* FOOTER  */}
                        <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                            <button
                                className={`${styles.btn} ${styles.btnNew}`}
                                onClick={onClickReload}
                            >
                                Xem
                            </button>

                            <button
                                className={`${styles.btn} ${styles.btnClose}`}
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