import React, { createContext, useState, useContext, useEffect } from 'react';
const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {

  const [site, setSite] = useState('');

  useEffect(() => {
    const tmp_site = sessionStorage.getItem('site');
    if (!tmp_site) {
      sessionStorage.setItem('site', 'HCM_DEV');
      setSite('HCM_DEV');
    }
    else {
      setSite(tmp_site);
    }
   
  }, []);


  return (
    <AppContext.Provider value={{
      site, setSite
    }}>
      {children}
    </AppContext.Provider>
  );
};
