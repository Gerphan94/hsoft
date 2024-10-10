import React, { createContext, useState, useContext, useEffect } from 'react';
const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {

  const [site, setSite] = useState('');
  
  const [selectedSideBar, setSelectedSideBar] = useState('');
  console.log('site', site, selectedSideBar)

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
      site, setSite,
      selectedSideBar, setSelectedSideBar
    }}>
      {children}
    </AppContext.Provider>
  );
};
