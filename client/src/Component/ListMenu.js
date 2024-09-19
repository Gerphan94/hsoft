import React, { useState } from 'react';

const ListMenu = ({ data }) => {
  // State to track which item has its submenu open
  const [showIndex, setShowIndex] = useState(null);

  // Function to handle clicking on a parent item
  const handleClickNhom = (id) => {
    // Toggle the submenu for the clicked item
    setShowIndex(showIndex === id ? null : id);
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="text-left">
          {/* Parent Menu Item */}
          <div
            className="px-2 py-1 text-white bg-[#35374B] hover:bg-[#667BC6] hover:border-b-white select-none"
            onClick={() => handleClickNhom(item.id)}
          >
            {item.name}
          </div>
          
          {/* Submenu: only show if the parent menu item is clicked */}
          {showIndex === item.id && (
            <div className="px-2">
              {item.child.map((childItem) => (
                <div key={childItem.id} className="px-2 py-1">
                  {childItem.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListMenu;
