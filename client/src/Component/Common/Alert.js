import React, { useState, useEffect } from 'react';

export const Alert = ( { visible, setVisible, message } ) => {

  const showAlert = () => setVisible(true);
  const hideAlert = () => setVisible(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(hideAlert, 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer); // Clear the timer if component unmounts
    }
  }, [visible]);

  return (
    <div className='absolute top-4 right-4'>
      <div
        className={`bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
        role="alert"
      >
        <div className="flex gap-4 justify-between">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
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
