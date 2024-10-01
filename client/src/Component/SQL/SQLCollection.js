import React, { useState, useEffect } from 'react';
import SQLElement from './SQLElement';

import SideMenu from '../SideMenu';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function SQLColection() {

  const apiURL = process.env.REACT_APP_API_URL;

  const site = localStorage.getItem('site');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState({ id: 0, name: '' })

  const [schemaDate, setSchemaDate] = useState(new Date());

  useEffect(() => {
    const fetchSection = async () => {
      const apiUrl = apiURL + "sql/section";
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSections(data);

    };
    fetchSection();

  }, [])

  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchQuery = async () => {
      const apiUrl = apiURL + "sql/query/" + selectedSection.id;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setJsonData(data);
    }

    fetchQuery();

  }, [selectedSection.id])


  return (
    <>
      <div className='flex'>
        <SideMenu site={site} />
        <div className='w-full'>

          <div className='font-bold text-2xl text-left border-b px-2 py-1'>SQL</div>

          <div className='w-full flex '>
            <div className='w-full px-10 py-4 space-y-4'>
              <div className='w-56 flex gap-2 border-b-2 pb-2 '>
                <label htmlFor='schema' className='font-medium'>Tháng năm:</label>
                <DatePicker
                  name='schema'
                  id='schema'
                  selected={schemaDate}
                  onChange={(date) => setSchemaDate(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  className='border text-center px-2 py-0.5 w-24 outline-none'
                />
              </div>
              {jsonData.map((data) =>
                <SQLElement data={data} />
              )}
            </div>

            <div className="h-full text-left p-4">
              <div className='bg-blue-100 w-60 border rounded-2xl p-4'>
                {sections.map((ele) =>
                  <li
                    onClick={() => setSelectedSection(ele)}
                    className={`block p-2 select-none ${selectedSection.id === ele.id ? 'bg-blue-200 font-medium' : ''}`}
                  >{ele.name}</li>

                )}
              </div>


            </div>
          </div>

        </div>

      </div>


    </>
  )


}

export default SQLColection;