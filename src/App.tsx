import React from "react";
import LoginPage from "./components/Login/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

function App() {
    let localStorageEmail = localStorage.getItem("email");
    let localStoragePasswod = localStorage.getItem("password");
    return (
        <div className="App">
            {/* <LoginPage /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={localStorageEmail && localStoragePasswod ? <Home /> : <LoginPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
