import React from 'react';
import SigUpPage from 'modules/auth/pages/SignUpPage/SignUpPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './modules/home/Home/index';
import Contact from './modules/home/Contact/index';
// import LoginPage from 'modules/auth/pages/LoginPage/LoginPage';
import PhotosPage from 'modules/photos/pages/PhotosPage';
import PayrollList from 'modules/payrolls/pages/PayrollsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PayrollList />} />
          <Route path="/sign-up" element={<SigUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/list-photos" element={<PhotosPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
