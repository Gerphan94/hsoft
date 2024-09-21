import './App.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
// import Navbar from './Component/navBar';

// import NotFound from './Page/404';
import MainPage from './Component/MainPage';
import NotFound from './Page/404';

import DanhMuc from './Component/DanhMuc/DanhMuc';

function App() {

  const Pages = [
    { id: "mainpage", path: "/", title: 'Main Pgae', component: <MainPage /> },
    { id: "danhmuc", path: "/danh-muc", title: 'Danh mục', component: <DanhMuc /> },

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
