import React, { useEffect, useState } from "react";
import Dropdown from "../Common/Dropdown";
import { useAppContext } from "../Store/AppContext";

function PhongGiuong() {

    const apiURL = process.env.REACT_APP_API_URL;

    const { site, area } = useAppContext();
    const [selectedKhoa, setSelectedKhoa] = useState({ id: null, name: '' });
    const [selectedPhong, setSelectedPhong] = useState({ id: null, name: '' });
    const [khoas, setKhoas] = useState([]);
    const [phongs, setPhongs] = useState([]);

    const fetchPhong = async (makp) => {
        try {
            const fetchURL = `${apiURL}danhmuc/phong-in-khoa?site=${site}&makp=${makp}`
            const response = await fetch(fetchURL);
            const data = await response.json();
            setPhongs(data);
            if (data.length > 0) {
                setSelectedPhong({ id: data[0].id, name: data[0].name });
            }
            else {
                setSelectedPhong({ id: null, name: '' });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const fetchKhoa = async () => {
            try {
                const fetchURL = `${apiURL}danhmuc/khoa?site=${site}&khu=${area}`
                const response = await fetch(fetchURL);
                const data = await response.json();
                setKhoas(data);
                setSelectedKhoa({ id: data[0].id, name: data[0].name });
                fetchPhong(data[0].id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchKhoa();
    }, [site, area]);

    useEffect(() => {
        fetchPhong(selectedKhoa.id);


    },[selectedKhoa.id]);


    return (
        <>
            <div className="p-4">
                <div className="w-full flex gap-10">
                    <div className="w-96 flex gap-2 items-center">
                        <label>Khoa:</label>
                        <Dropdown
                            searchable
                            data={khoas}
                            selectedOption={selectedKhoa}
                            setSelectedOption={setSelectedKhoa}
                        />
                    </div>
                    <div className="w-96 flex gap-2 items-center">
                        <label>Phòng:</label>
                        <Dropdown
                            data={phongs}
                            selectedOption={selectedPhong}
                            setSelectedOption={setSelectedPhong}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default PhongGiuong;