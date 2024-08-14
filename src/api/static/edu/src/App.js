import React, {useEffect, useState} from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Landing from './Components/Dashboard/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';    //memanggil library agar bisa berpindah page 
import SignUp from './Components/LoginSign/SignUp'; //memanggil file Sign';
import Login from './Components/LoginSign/Login';   //memanggil file Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Menu from './Components/Main/Menu'; //memanggil file Menu';
import MenuTK from './Components/Main/MenuTK';
import MenuSD from './Components/Main/MenuSD';
import MenuSMP from './Components/Main/MenuSMP';
import MenuSMA from './Components/Main/MenuSMA';
import Form from './Components/Form/Form';
import Riwayat from './Components/Riwayat/Riwayat';
import Box from './Components/Main/Box';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminSignup from './Components/Admin/AdminSignup';
import AdminMenu from './Components/Admin/AdminMenu';
import AdminPending from './Components/Admin/AdminPending';
import AdminAktif from './Components/Admin/AdminAcc';

import 'bootstrap/dist/css/bootstrap.min.css';
//import TestGet from './Components/LoginSign/TestGet'; memanggil file TestGet';



function App() {
    return (
        <div>
        <router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/Dashboard' element={<Dashboard /> } /> 
            <Route path='/Register' element={<SignUp /> } />        {/* Memanggil fungsi Signup */}
            <Route path='/Login' element={<Login /> } />
            <Route path='/Menu' element={ <Menu /> } />
            <Route path='/MenuTK' element={ <MenuTK /> } />
            <Route path='/MenuSD' element={<MenuSD />} />
            <Route path='/MenuSMP' element={<MenuSMP />} />
            <Route path='/MenuSMA' element={<MenuSMA />} />
            <Route path='/Form' element={<Form />} />
            <Route path='/Riwayat' element={<Riwayat />} />
            <Route path='/Box' element={<Box/>} />
            <Route path='/AdminRegister' element={<AdminSignup/>} />
            <Route path='/AdminLogin' element={<AdminLogin/>} />
            <Route path='/AdminMenu' element={<AdminMenu/>} />
            <Route path='/AdminPending' element={<AdminPending/>} />
            <Route path='/AdminAktif' element={<AdminAktif/>} />
        </Routes>
        </router>
        </div>
    ); 
}
export default App;

