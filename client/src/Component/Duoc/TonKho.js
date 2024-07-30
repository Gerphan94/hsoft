import React, { useEffect, useState } from "react";

function TonKho({ site }) {

    const [selectedOption, setSelectedOption] = useState('option1');

    const [nhomkhoID, setNhomkhoID] = useState([])

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const apiURL = process.env.REACT_APP_API_URL;

    const [khoData, setKhoData] = useState([]);

    return (
        <>
            <div className="flex gap-2 p-2">
                <div className="flex items-center gap-1">
                    <div className="block">
                    <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="option1"
                        checked={selectedOption === 'option1'}
                        onChange={handleChange}
                        className="mr-2"

                    />
                    <label htmlFor="option1">Kê toa BHYT</label>

                    </div>
                    
                    
                    <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="option2"
                        checked={selectedOption === 'option2'}
                        onChange={handleChange}
                        className="mr-2"

                    />
                    <label htmlFor="option2">Kê toa Nhà thuốc</label>

                    <input
                        type="radio"
                        id="option3"
                        name="options"
                        value="option3"
                        checked={selectedOption === 'option3'}
                        onChange={handleChange}
                        className="mr-2"

                    />
                    <label htmlFor="option3">Tồn kho</label>


                </div>
                <div>

                </div>

            </div>
            <div>

            </div>
        </>
    )
}

export default TonKho;