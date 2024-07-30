import React from 'react';

const Tooltip = ({ text, tooltipText }) => {
  return (
    <div className="relative flex flex-col items-center group z-0">
      <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
          {tooltipText}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
      </div>
      {text}
    </div>
  );
};

export default Tooltip;
