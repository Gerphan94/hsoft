import React, { createContext, useState, useContext, useEffect } from 'react';
const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {

  const [site, setSite] = useState('');
  const [area, setArea] = useState(0);
  const [siteName, setSiteName] = useState('');
  
  const [selectedSideBar, setSelectedSideBar] = useState('');

  useEffect(() => {
    const tmp_site = sessionStorage.getItem('site');
    const tmp_siteName = sessionStorage.getItem('sitename');
    const tmp_area = sessionStorage.getItem('area');

    if (!tmp_site) {
      sessionStorage.setItem('site', 'HCM_DEV');
      sessionStorage.setItem('area', 1);
      sessionStorage.setItem('sitename', 'Bệnh Viện Đa Khoa Tâm Anh TP. Hồ Chí Minh');
      setSite('HCM_DEV');
      setSiteName('Bệnh Viện Đa Khoa Tâm Anh TP. Hồ Chí Minh');
      setArea(1);
    }
    else {
      setSite(tmp_site);
      setSiteName(tmp_siteName);
      setArea(tmp_area);
    }
   
  }, []);


  return (
    <AppContext.Provider value={{
      site, setSite,
      area, setArea,
      siteName, setSiteName,
      selectedSideBar, setSelectedSideBar
    }}>
      {children}
    </AppContext.Provider>
  );
};
