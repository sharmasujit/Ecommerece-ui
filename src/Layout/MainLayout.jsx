import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import CustomSnackBar from '../Component/CustomSnackBar'
import { Box } from '@mui/material'

const MainLayout = () => {
  return (
    <>
      <CustomSnackBar />
      <Header />
      <Box 
      sx={{padding: "5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "70vh",}}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}

export default MainLayout