import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomSnackBar from '../Component/CustomSnackBar'
import { Box } from '@mui/material'

const MinimumLayout = () => {
  return (
    <>
    <CustomSnackBar/> 
    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default MinimumLayout