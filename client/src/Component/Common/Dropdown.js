import React, { useEffect, useRef, useState, useMemo, memo } from 'react'
import { FaAngleDown } from "react-icons/fa6";

const Dropdown = memo(({
    data,
    selectedOption,
    setSelectedOption,
    searchable = false,
    placeholder = '',
    chooseIndex = 0,
    optionALL = false,
    disabled = false
}) => {

    console.log('render dropdown', data)
    const [initData, setInitData] = useState([]);
    const [viewData, setViewData] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);


    useEffect(() => {
        if (optionALL) {
            setInitData([{ id: 0, name: 'Tất cả' }, ...data]);
            setViewData([{ id: 0, name: 'Tất cả' }, ...data]);
        }
        else {
            setInitData(data);
            setViewData(data);
        }
        if (chooseIndex > 0 && initData.length > 0) {
            setSelectedOption({ id: initData[chooseIndex - 1].id, name: initData[chooseIndex - 1].name });
            // setSearchTerm(initData[chooseIndex - 1].name)
        }

    }, [data]);

    // useEffect(() => {
    //     if (chooseIndex > 0 && viewData.length > 0) {
    //         setSelectedOption({ id: viewData[chooseIndex - 1].id, name: viewData[chooseIndex - 1].name });
    //         setSearchTerm(viewData[chooseIndex - 1].name)
    //     }
    // }, [data, setSelectedOption]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClick = (id, name) => {
        setSelectedOption({ id, name });
        setIsDropdownOpen(false);
        setSearchTerm('')
        setViewData(initData);

    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(true);
        if (e.target.value === '') {
            setViewData(initData);
        }
        else {
            const filedata = initData.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setViewData(filedata);
        }
    }

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);


    return (
        <div className='w-full h-full inline-block text-left' ref={dropdownRef}>
            <div className="relative inline-block w-full">
                <div className='relative group '>
                    <button
                        className={`font-medium text-left flex items-center justify-between border select-none outline-none h-full w-full py-1 px-2 text-[#0C1844] group-hover:border-blue-200 rounded-lg ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'cursor-pointer'}`}
                        onClick={toggleDropdown}
                        disabled={disabled}
                    >
                        <div
                            className="truncate"
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {selectedOption.name}
                        </div>
                        <FaAngleDown className="h-5 w-5 text-gray-500 group-hover:text-blue-200" />
                    </button>

                </div>
                {isDropdownOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-full max-h-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ">
                        {searchable &&
                            <div className='p-2'>
                                <input
                                    className={`border outline-none h-full w-full py-1 px-2 text-[#0C1844] group-hover:border-blue-200 }`}
                                    value={searchTerm}
                                    onChange={handleChange}
                                    placeholder='Search'
                                    autoComplete='off'
                                    spellCheck={false}
                                // readOnly={!searchable}
                                />
                            </div>
                        }
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {viewData.length === 0 ?
                                <li className="">
                                    <button
                                        className="w-full text-left block px-4 py-2 text-sm text-[#0C1844] hover:bg-gray-100 select-none"
                                    >
                                        None
                                    </button>

                                </li> :
                                <>
                                    <div className='overflow-y-auto max-h-64'>
                                        {viewData.map((item) => (
                                            <li key={item.id}>
                                                <button
                                                    className={`w-full text-left block px-4 py-2 text-sm select-none text-[#0C1844] hover:bg-[#667BC6] hover:text-white ${selectedOption.id === item.id ? 'bg-[#667BC6] text-white' : ''}`}
                                                    onClick={() => handleClick(item.id, item.name)}
                                                >
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </div>
                                </>


                            }


                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
})

export default Dropdown;