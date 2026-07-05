import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Projects from '../screens/Projects'
import UserAuth from '../auth/UserAuth'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/project' element={<Projects/>}/>
        
        
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes