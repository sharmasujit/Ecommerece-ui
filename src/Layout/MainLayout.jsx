import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import CustomSnackBar from '../Component/CustomSnackBar'

const MainLayout = () => {
  return (
    <>
    <CustomSnackBar/>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MainLayout