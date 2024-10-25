import './App.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
// import Navbar from './Component/navBar';
import { useAppContext } from './Component/Store/AppContext';

import DashBoard from './Component/DashBoard';
import NotFound from './Page/404';
import KhamBenh from './Component/KhamBenh/KhamBenh';
import PhongLuu from './Component/NoiTru/PhongLuu';
import DanhMuc from './Component/DanhMuc/DanhMuc';
import Duoc from './Component/Duoc/Duoc';
import VienPhi from './Component/VienPhi/VienPhi';
import NoiTru from './Component/NoiTru/NoiTru';
import ToDieuTri from './Component/ToDieuTri/ToDieuTri';
// import SideBar from './Component/SideBar';
import SideBar from './Component/SideBar/SideBar';

function App() {

  const { site, setSite } = useAppContext();

  // localStorage.setItem('site', 'HN_DEV');

  const Pages = [
    { id: "dashboard", path: "/", title: 'Dash Board', component: <DashBoard /> },
    // { id: "mainpage", path: "/", title: 'Main Pgae', component: <MainPage /> },
    { id: "khambenh", path: "/kham-benh", title: 'Khám bệnh', component: <KhamBenh /> },
    { id: "phongluu", path: "/phong-luu", title: 'Phòng lưu', component: <PhongLuu /> },

    { id: "noitru", path: "/noi-tru", title: 'Nội trú', component: <NoiTru /> },

    { id: "danhmuc", path: "/danh-muc", title: 'Danh mục', component: <DanhMuc /> },
    { id: "duoc", path: "/duoc", title: 'Dược', component: <Duoc /> },

    { id: "vienphi", path: "/vien-phi", title: 'Viện phí', component: <VienPhi /> },

    { id: "todieutri", path: "/to-dieu-tri", title: 'Tờ điều trị', component: <ToDieuTri /> },
    { id: "notfound", path: "*", title: 'Not Found', component: <NotFound /> }
  ]


  return (
    <div className="App">
      <HelmetProvider>
        <div className='flex h-screen overflow-y-hidden'>
          <SideBar />
          <div className='overflow-y-auto w-full z-40'>
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
          </div>

        </div>
      </HelmetProvider>



    </div >
  );
}

export default App;
