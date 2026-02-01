import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/Login'
import { Emailverify } from './pages/Emailverify'
import { ResetPassword } from './pages/ResetPassword'
import { ToastContainer, toast } from 'react-toastify';
import { Vehicle } from './pages/Vehicle';
import { VehicleMap } from './pages/VehicleMap'


const App = () => {
  return (
    <div className='bg-[#0B0E14]'>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<Emailverify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/vehicle-details'element={<Vehicle/>}/>
        <Route path="/vehicle-map" element={<VehicleMap />} />
      </Routes>
    </div>
  )
}

export default App