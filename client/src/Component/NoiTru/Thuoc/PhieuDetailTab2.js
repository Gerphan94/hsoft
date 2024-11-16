import React, { useEffect } from "react";
import { useAppContext } from "../../Store/AppContext";
function PhieuDetailTab2({ selectedCoupon }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const { site } = useAppContext();

    const [phatiem, setPhaTiem] = React.useState([]);

    useEffect(() => {
        const fetchPhatiem = async () => {
            const response = await fetch(`${apiURL}noitru/thuoc-phatiem?site=${site}&idtoathuoc=${selectedCoupon.id}&thangnam=${selectedCoupon.thangnam}`);
            const data = await response.json();
            setPhaTiem(data);
        }
        fetchPhatiem();

    }, [])

    return (

        <>
            <div className="mt-6">
                {phatiem && phatiem.length === 0 && <div>KHÔNG CÓ PHA TIÊM</div>}
                {phatiem && phatiem.length > 0 &&
                    phatiem.map((item) => (
                        <div key={item.phathuocid}
                            className="border rounded-lg bg-white px-2 py-1 cursor-pointer text-left mb-4">
                            <div className="text-sm italic"><strong>Pha tiêm: </strong> {item.thuocpha} - {phatiem.id}</div>
                            <div className="text-sm "><strong>Cách pha:</strong> {item.cachpha}</div>
                            <div className="px-4 space-y-1 py-1">
                                {item.detail && item.detail.length > 0 &&
                                    item.detail.map((detail) => (
                                        <div key={detail.id} className="text-sm">
                                            {detail.ma} - <strong>{detail.tenbd}</strong> | {detail.tenhc} - <i>{detail.duongdung}</i> 
                                            

                                            </div>
                                ))}

                                </div>
                        </div>
                    ))
                }</div>
        </>
    )
}
export default PhieuDetailTab2;