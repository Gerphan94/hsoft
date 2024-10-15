import React, { useEffect, useState } from "react";
import styles from "../../styles.module.css"
import ThuocDetail from "./ThuocModalDetail";
import CouponList from "./CouponList";
import moment from "moment";


function ThuocModal({ site, selected, setModalShow }) {

    const title = 'THUỐC - ' + selected.pid + ' - ' + selected.pname;

    const apiURL = process.env.REACT_APP_API_URL;

    const [dutrull, setDutrull] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState({id: 0,  name:'', type:'', ngay:''});
    const [medicineDetail, setMedicineDetail] = useState([]);
    const [dutrullDetail, setDutrullDetail] = useState({});

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
        fetchMedicineDetail();
    }, [selectedCoupon])

    return (
        <>
            <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                <div className="relative w-full h-full  mx-auto bg-white">
                    <div className="h-full flex flex-col justify-between">
                        {/* HEADER */}
                        <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                            {title}
                        </div>
                        {/* BODY */}
                        <div className="flex h-full p-4 overflow-hidden ">
                            <div className="w-1/3 flex-grow h-full text-left overflow-y-scroll ">
                                <div className="p-2">
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
                                    {selectedCoupon.id !== '' &&
                                        <ThuocDetail 
                                        site={site}
                                        couponType={selectedCoupon.type} 
                                        data={medicineDetail}
                                        couponId={selectedCoupon.id}
                                        selectedCoupon={selectedCoupon}
                                        />
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

