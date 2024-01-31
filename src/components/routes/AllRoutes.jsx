import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from '../../pages/dashboard/DashboardPage'
import Allusers from '../../pages/allusers/Allusers'
import UserDetail from '../../pages/userdetail/UserDetail'

function AllRoutes() {
  return (
    <Routes> 
        <Route path='/' element={<DashboardPage/>}/>
        {/* <Route path='land' */}
        <Route path='/allusers' element={<Allusers/>}/>
        <Route path='/user' element={<UserDetail/>}/>
        
    </Routes>
  )
}

export default AllRoutes