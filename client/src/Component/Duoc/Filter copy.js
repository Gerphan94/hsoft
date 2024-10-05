import React, { useRef, useState, useEffect , memo} from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Dropdown from "../Dropdown";
import styles from "../styles.module.css"

export default memo(function Filter({ idkho, site, filter, setFilter, setSelectedAtc, setTyleBH }) {

    const apiURL = process.env.REACT_APP_API_URL;
    console.log('rending filter -------------------------------------')
    const [atcs, setAtcs] = useState([]);

    const tyleBHYTs = [
        {id: '100', name :'100'},
        {id: '0', name :'0'},
        {id: '1', name :'Other'}
    ];
    
    // useEffect(() => {
    //     const getDuocbvs = async () => {
    //         const response = await fetch(`${apiURL}duoc/dm_duocbv/${site}`);
    //         const data = await response.json();
    //         setDuocbvs(data);
    //     };
    //     getDuocbvs();
    // }, [site]);

    useEffect(() => {
        const getACTs = async () => {
            const response = await fetch(`${apiURL}duoc/dup_act/${site}/${idkho}`);
            const data = await response.json();
            console.log("ACTS", data);
            setAtcs(data);
        };
        getACTs();

    }, [idkho]);


    const [count, setCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [filterDuocBvId, setFilterDuocBvId] = useState(null);

    const toggleDropdown = () => {
        if (idkho !== 0) {
            setIsOpen(!isOpen);

        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleClick = (id, name) => {
        closeDropdown();
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleChange = (item) => {

        const updatedCheckboxes = filter.map(checkbox =>
            checkbox.id === item.id ? { ...checkbox, value: !checkbox.value } : checkbox
        );
        if (item.value) {
            setCount(count - 1);
        }
        else {
            setCount(count + 1);
        }
        setFilter(updatedCheckboxes);
    };

    const onClickClear = () => {
        setFilter(filter.map(item => ({ ...item, value: false })));
        setCount(0);
        setIsOpen(false);
    }

    const onClickApply = () => {
        setIsOpen(false);

    }

    return (
        <>
            <div className='text-left p-3' ref={dropdownRef}>
                <div className="relative inline-block">
                    <button
                        className="flex items-center justify-center px-2 py-1"
                        onClick={toggleDropdown}
                    >
                        {count === 0 ?
                            <MdFilterAlt className="h-5 w-5" /> :
                            <MdFilterAltOff className="h-5 w-5" />
                        }
                    </button>
                    {isOpen && (
                        <div className="border p-4 origin-top-right absolute left-0 mt-2 w-[600px] shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 min-h-10">
                            <div>
                                {filter.map((item) => (
                                    <div className="w-full px-2 py-2 flex gap-1 items-center">
                                        <input
                                            id={item.id}
                                            name={item.id}
                                            type="checkbox"
                                            checked={item.value}
                                            onChange={() => handleChange(item)}
                                        />
                                        <label className="select-none" htmlFor={item.id}>{item.name}</label>
                                        {item.id === 'khangsinhchungatc' &&
                                            <div className="w-32">
                                                <Dropdown
                                                    searchable={false}
                                                    data={atcs}
                                                    setSelectedOption={setSelectedAtc}
                                                    firstChoose={true}

                                                />
                                            </div>
                                        }

                                      
                                    </div>
                                ))}
                            </div>
                          
                            <div className="flex gap-4 mt-2">
                                {count === 0 ?
                                    <button className={`${styles.btn} ${styles.btnNotAllowed}`}>Apply</button>
                                    :
                                    <button className={`${styles.btn} ${styles.btnOk}`} onClick={() => onClickApply()}>Apply</button>
                                }
                                <button className={`${styles.btn} ${styles.btnClose}`} onClick={() => onClickClear()}>Clear</button>

                            </div>


                        </div>
                    )}
                </div>
            </div>
        </>
    )
})

