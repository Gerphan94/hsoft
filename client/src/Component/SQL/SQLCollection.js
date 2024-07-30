import React, { useState, useEffect } from 'react';
import SQLElement from './SQLElement';

import khambenh from "./data/khambenh.json"

function SQLCol() {


  // const path = "./sql.json";

  const list = [
    {ma: 'tiepnhan', name: "Tiếp nhận"},
    {ma: 'khambenh', name: "Khám bệnh"},
    {ma: 'duoc', name: "Dược"}
    ]
  const [jsonData, setJsonData] = useState(khambenh);

  return (
    <>
      <div className='font-bold text-2xl'>SQL</div>
      <div className='flex'>
        <div>{jsonData.map((data) =>
          <SQLElement data={data} />
        )}
        </div>

        <div className="bg-blue-100 h-full w-40">
            {list.map((ele) =>
                <button className="block p-2">{ele.name}</button>
            
            )}

        </div>
      </div>

    </>
  )


}

export default SQLCol;