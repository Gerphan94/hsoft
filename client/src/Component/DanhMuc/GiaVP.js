import React, { useEffect, useState } from "react";
import Dropdown from "../Common/Dropdown";
import ViewButton from "../Button/ViewButton";
import { FaPlus, FaMinus, FaDotCircle } from "react-icons/fa";
import { FaFolderTree } from "react-icons/fa6";
import Pagination from "../Common/Pagination";
import { FcCurrencyExchange, FcFlowChart, FcMoneyTransfer } from "react-icons/fc";
import { FaEye, FaBars } from "react-icons/fa";
import Toggle from "../Common/ToggleSwitch";
function GiaVP({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;

    const [selectedGiavpType, setSelectedGiavpType] = useState({ id: 'giavp', name: 'Giá viện phí' });

    const [data, setData] = useState([]);
    // const [nhombhytys, setNhombhytys] = useState([]);

    const [nhomVPs, setNhomVPs] = useState([]);
    const [selectedNhomVp, setSelectedNhomVp] = useState({ id: 0, name: '' });
    const [disabledNhomVp, setDisabledNhomVp] = useState(false);

    const [loaiVps, setLoaiVps] = useState([]);
    const [selectedLoaiVP, setSelectedLoaiVP] = useState({ id: 0, name: '' });
    const [disabledLoaiVP, setDisabledLoaiVP] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [dataInPage, setDataInPage] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [viewDatas, setViewDatas] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const [isBenhphamRangbuoc, setIsBenhphamRangbuoc] = useState(false);


    const giavpTypes = [
        { id: 'giavp', name: 'Giá viện phí', icon: FcCurrencyExchange },
        { id: 'goivp', name: 'Gói viện phí', icon: FcMoneyTransfer },
        { id: 'dieutiet', name: 'Điều tiết', icon: FcFlowChart }
    ]


    useEffect(() => async () => {
        const fetchNhomVps = async () => {
            try {
                const fecthURL = apiURL + "danhmuc-vienphi/nhomnbhyt/" + site;
                const response = await fetch(fecthURL);
                const data = await response.json();
                setNhomVPs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchNhomVps();
    }, []);

    useEffect(() => {
        if (!selectedGiavpType || !selectedGiavpType.id) return;
        if (selectedGiavpType.id === 'giavp') {
            setDisabledNhomVp(false);
            setDisabledLoaiVP(false);
        }
        else {
            setDisabledNhomVp(true);
            setDisabledLoaiVP(true);
        }
    }, [selectedGiavpType?.id, site]);

    useEffect(() => {
        const fetchLoaiVps = async () => {

            // if (!selectedNhomVp || !selectedNhomVp.id) return;
            const nhomvpid = selectedNhomVp.id;

            if (nhomvpid === 0) {
                setLoaiVps([]);
                setDisabledLoaiVP(true);
            }
            else {

                try {
                    const fecthURL = apiURL + "danhmuc-vienphi/loaivp/" + site + "/" + nhomvpid;
                    console.log(fecthURL);
                    const response = await fetch(fecthURL);
                    const data = await response.json();
                    setLoaiVps(data);
                    setDisabledLoaiVP(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

        };
        fetchLoaiVps();
        setSelectedLoaiVP({ id: 0, name: 'Tất cả' });
    }, [selectedNhomVp?.id, site]);

    const constDataInPage = (iPage, iData) => {
        const indexOfLastItem = iPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return iData.slice(indexOfFirstItem, indexOfLastItem);
    }

    const handeleView = async () => {
        try {
            const fecthURL = apiURL + "danhmuc-vienphi/gia-vp/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setData(data);
            setViewDatas(data);
            setCurrentPage(1);
            setTotalPage(Math.ceil(data.length / itemsPerPage));
            setDataInPage(constDataInPage(1, data));
            setSelectedNhomVp({ id: 0, name: 'Tất cả' });
            setSelectedLoaiVP({ id: 0, name: 'Tất cả' });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        setDataInPage(constDataInPage(currentPage, viewDatas));
    }, [currentPage]);

    // SEARCH ############################################################
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm === '') {
            setViewDatas(data);
            setTotalPage(Math.ceil(data.length / itemsPerPage));
            setDataInPage(constDataInPage(1, data));
        } else {
            const lowerCasedSearchTerm = debouncedSearchTerm.toLowerCase();
            const filteredData = data.filter(item => {
                const ten = item.ten?.toLowerCase() ?? '';
                return ten.includes(lowerCasedSearchTerm);
            });
            setTotalPage(Math.ceil(filteredData.length / itemsPerPage));
            setDataInPage(constDataInPage(1, filteredData));
            setViewDatas(filteredData);
        }
    }, [debouncedSearchTerm]);

    const handleSearch = (event) => {
        setCurrentPage(1);
        setSearchTerm(event.target.value);
    };
    // END SEARCH ############################################################

    // FILTER ################################################################

    const handleFilter = () => {
        setSearchTerm('');
        const filterData = data.filter((item) => {
            let matchesAllFilters = true;
            if (selectedLoaiVP.id > 0) {
                matchesAllFilters = matchesAllFilters && (item.idloai === selectedLoaiVP.id);
            }
            else {
                if (selectedNhomVp.id > 0) {
                    matchesAllFilters = matchesAllFilters && (item.idnhom === selectedNhomVp.id);
                }
            }

            return matchesAllFilters;
        });

        setTotalPage(Math.ceil(filterData.length / itemsPerPage));
        setCurrentPage(1);
        setDataInPage(constDataInPage(1, filterData));
        setViewDatas(filterData);
    };

    // END FILTER ############################################################
    return (
        <>
            <div className="flex flex-col text-sm">
                <div className="flex gap-2 px-4 py-2">
                    <div className="w-40">
                        <Dropdown
                            data={giavpTypes}
                            setSelectedOption={setSelectedGiavpType}
                            selectedOption={selectedGiavpType}
                        />
                    </div>
                    <button
                        className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1 select-none"
                        onClick={() => handeleView()}
                    >
                        Xem <FaEye />
                    </button>
                    <div className="flex gap-5">
                        <input
                            type="text"
                            className="border w-56 px-2 py-0.5 outline-none"
                            placeholder="Nhập mã, tên, ..."
                            value={searchTerm}
                            spellCheck="false"
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="flex gap-4 px-4 py-2">
                    <div className="w-80">
                        <Dropdown
                            data={nhomVPs}
                            setSelectedOption={setSelectedNhomVp}
                            selectedOption={selectedNhomVp}
                            disabled={disabledNhomVp}
                            optionALL
                        />
                    </div>
                    <div className="w-80">
                        <Dropdown
                            data={loaiVps}
                            setSelectedOption={setSelectedLoaiVP}
                            selectedOption={selectedLoaiVP}
                            disabled={disabledLoaiVP}
                            optionALL
                        />
                    </div>
                    <div>
                        <Toggle
                            idname={'bprangbuoc'}
                            displayName='Bệnh phẩm ràng buộc'
                            setEnabled={setIsBenhphamRangbuoc}

                        />
                    </div>
                    <button
                        className="flex items-center gap-2 text-white bg-blue-400 px-2 py-1 select-none"
                        onClick={() => handleFilter()}
                    >
                        Lọc <FaEye />
                    </button>
                </div>

                <div className="p-4">
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table >
                            <thead className="sticky top-0 z-80">
                                <tr>
                                    <th className="text-center py-1 px-2">STT</th>
                                    <th className="text-left px-2 ">Tên VP</th>
                                    <th className="text-center w-14">DVT</th>
                                    <th className="text-center w-10 px-2">BHYT</th>
                                    <th className="text-right whitespace-nowrap px-2">Giá Thường</th>
                                    <th className="text-right whitespace-nowrap px-2">Giá BHYT</th>
                                    <th className="text-right whitespace-nowrap px-2">Giá Dịch vụ</th>
                                    <th className="text-right w-24 px-2">Nhóm BHYT</th>
                                    <th className="text-right w-24 px-2">Nhóm VP</th>
                                    <th className="text-right w-24 px-2">Loại VP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataInPage.map((giavp, index) => (
                                    <tr key={index} className="even:bg-gray-200">
                                        <td className="text-center py-1 w-10">{itemsPerPage * (currentPage - 1) + (index + 1)}</td>
                                        <td className="text-left px-2 w-[400px]  truncate">{giavp.tenvp} </td>
                                        <td className="text-center">{giavp.dvt}</td>
                                        <td><div className="text-center">{giavp.bhyt}</div></td>
                                        <td className="text-right px-2">{Number(giavp.giath).toLocaleString()}</td>
                                        <td className="text-right px-2"> {Number(giavp.giabh).toLocaleString()}</td>
                                        <td className="text-right px-2">{Number(giavp.giadv).toLocaleString()}</td>
                                        <td className="text-left px-2 whitespace-nowrap">{giavp.tennhombhyt}</td>
                                        <td className="text-left px-2 whitespace-nowrap">{giavp.tennhom}</td>
                                        <td className="text-left px-2 whitespace-nowrap">{giavp.tenloai}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />
            </div>

        </>
    )
}

export default GiaVP;