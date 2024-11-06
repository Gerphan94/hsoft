import React, { useState, useEffect } from 'react';
import { BsInfoCircle } from "react-icons/bs";




export const SuccessAlert = ( { visible, setVisible, message } ) => {

  const hideAlert = () => setVisible(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(hideAlert, 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer); // Clear the timer if component unmounts
    }
  }, [visible]);

  return (
    <div className='absolute top-4 right-4 z-[1000]'>
      <div
        className={`bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
        role="alert"
      >
        <div className="flex gap-4 justify-between">
          <div className="flex items-center">
            <div className="py-1 pr-2">
              <BsInfoCircle className='size-6' />
            </div>
            <div className='font-bold'>
             {message}
            </div>
          </div>
          <button onClick={hideAlert} className="text-teal-500 font-bold">&times;</button>
        </div>
      </div>
    </div>
  );
};
