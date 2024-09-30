import React, { createContext, useState, useContext } from 'react';
const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {

  const [site, setSite] = useState('');
  

  return (
    <AppContext.Provider value={{
      site, setSite
    }}>
      {children}
    </AppContext.Provider>
  );
};
