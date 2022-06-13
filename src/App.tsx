import React from 'react';
import SigUpPage from 'modules/auth/pages/SignUpPage/SignUpPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './modules/home/Home/index';
import Contact from './modules/home/Contact/index';
import LoginPage from 'modules/auth/pages/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SigUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
