import React, { useState, useEffect } from 'react';
import SQLElement from './SQLElement';

import khambenh from "./data/khambenh.json"
import SideMenu from '../SideMenu';

function SQLColection() {


  const api = 'https://api.npoint.io/3b8e320a68aa0d6c040a'

  const [data, setData] = useState([])
  const [modules, setModules] = useState([])


  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(api);
      const data = await response.json();
      setData(data);
      setModules(data.map(item => item.id));
    }
    fetchApi();

  }, [])



  const [jsonData, setJsonData] = useState(khambenh);

  return (
    <>
      <div className='flex'>
        <SideMenu />
        <div>
          <div className='font-bold text-2xl'>SQL</div>
          <div className='flex'>
            <div>{jsonData.map((data) =>
              <SQLElement data={data} />
            )}
            </div>
            <div className="bg-blue-100 h-full w-40">
              {modules.map((ele) =>
                <li className="block p-2">{ele}</li>

              )}

            </div>
          </div>

        </div>

      </div>


    </>
  )


}

export default SQLColection;