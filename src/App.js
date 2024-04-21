
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './components/Register';
import Header from './components/Header';
import Signin from './components/Signin';
import GenerateQR from './components/GenrateQRcode';
import Dashboard from './components/Dashboard';
import  QRCodeReader from './components/Upload';
import Edit from './components/Edit';
import { useState } from'react';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false); // Check if user is logged in

  const handleLogin = () => {
    
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  return (
   <>
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout}  />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Signin onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/genrateqr" element={<GenerateQR />} />
        <Route path='/upload' element={<QRCodeReader/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        
      </Routes>
    </Router>
   </>
  );
}

export default App;
