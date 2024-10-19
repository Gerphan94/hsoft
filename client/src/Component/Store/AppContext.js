import React, { createContext, useState, useContext, useEffect } from 'react';
const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {

  const [site, setSite] = useState('');
  const [area, setArea] = useState(0);
  
  const [selectedSideBar, setSelectedSideBar] = useState('');
  console.log('site', site, selectedSideBar)

  useEffect(() => {
    const tmp_site = sessionStorage.getItem('site');
    const tmp_area = sessionStorage.getItem('area');
    if (!tmp_site) {
      sessionStorage.setItem('site', 'HCM_DEV');
      sessionStorage.setItem('area', 1);
      setSite('HCM_DEV');
      setArea(1);
    }
    else {
      setSite(tmp_site);
      setArea(tmp_area);
    }
   
  }, []);


  return (
    <AppContext.Provider value={{
      site, setSite,
      area, setArea,
      selectedSideBar, setSelectedSideBar
    }}>
      {children}
    </AppContext.Provider>
  );
};
