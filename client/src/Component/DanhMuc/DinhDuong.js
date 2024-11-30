import React, { useEffect, useState } from "react";
import { useAppContext } from "../Store/AppContext";
import Pagination from "../Common/Pagination";

function DinhDuong() {

    // danhmuc/dinhduong-chedoan
    const apiURL = process.env.REACT_APP_API_URL;

    const [dinhduongs, setDinhDuongs] = useState([]);

    const { site } = useAppContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [dataInPage, setDataInPage] = useState([]);

    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }

    useEffect(() => {
        setTotalPage(Math.ceil(dinhduongs.length / itemsPerPage));
        setDataInPage(constDataInPage(currentPage, dinhduongs));
    }, [dinhduongs, itemsPerPage]);

    useEffect(() => {
        setDataInPage(constDataInPage(currentPage, dinhduongs));
    }, [currentPage]);

    const fetchDinhDuong = async () => {
        try {
            const fetchURL = `${apiURL}danhmuc/dinhduong-chedoan?site=${site}`
            const response = await fetch(fetchURL);
            const data = await response.json();
            setDinhDuongs(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    useEffect(() => {
        fetchDinhDuong();
    }, [site]);


    return (
        <>
        <div>HIIII</div>
        <div className="text-md">
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Nhóm</th>
                    </tr>
                </thead>
                <tbody>
                    {dataInPage.map((dinhduong, index) => (
                        <tr key={dinhduong.id}>
                            <td>{(currentPage - 1) * 20 + (index + 1)}</td>
                            <td><div className="text-left px-2 py-0.5">{dinhduong.ma}</div></td>
                            <td><div className="text-left px-2 py-0.5">{dinhduong.ten}</div></td>
                            <td><div className="text-left px-2 py-0.5">{dinhduong.tennhom}</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full">
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                        setItemsPerPage={setItemsPerPage}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
        </div>
        
        </>
    )

}

export default DinhDuong;