import './App.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
// import Navbar from './Component/navBar';

import DashBoard from './Component/DashBoard';
import MainPage from './Component/MainPage';
import NotFound from './Page/404';
import KhamBenh from './Component/KhamBenh/KhamBenh';
import DanhMuc from './Component/DanhMuc/DanhMuc';
import Duoc from './Component/Duoc/Duoc';
import SQLColection from './Component/SQL/SQLCollection';
import ChooseSite from './Component/Site/ChooseSite';
import { useAppContext } from './Component/Store/AppContext';
import NoiTru from './Component/NoiTru/NoiTru';
import ChooseSiteModal from './Component/Site/ChooseSite';
import { useEffect } from 'react';

function App() {

  const { site, setSite } = useAppContext();

  // localStorage.setItem('site', 'HN_DEV');

  const Pages = [
    { id: "dashboard", path: "/", title: 'Dash Board', component: <DashBoard /> },
    // { id: "mainpage", path: "/", title: 'Main Pgae', component: <MainPage /> },
    { id: "khambenh", path: "/kham-benh", title: 'Khám bẹnh', component: <KhamBenh /> },
    { id: "noitru", path: "/noi-tru", title: 'Nội trú', component: <NoiTru /> },

    { id: "danhmuc", path: "/danh-muc", title: 'Danh mục', component: <DanhMuc /> },
    { id: "duoc", path: "/duoc", title: 'Dược', component: <Duoc /> },
    { id: "sql", path: "/sql", title: 'SQL', component: <SQLColection /> },
    { id: "notfound", path: "*", title: 'Not Found', component: <NotFound /> }
  ]


  return (
    <div className="App">
      <HelmetProvider>
        <Routes >
          {Pages.map((page) => (
            <Route key={page.id} path={page.path}
              element={
                <>
                  <Helmet>
                    <title>{page.title}</title>
                  </Helmet>
                  {page.component}
                </>
              } />
          ))}
        </Routes>
      </HelmetProvider>


    </div>
  );
}

export default App;
