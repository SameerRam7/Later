import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App