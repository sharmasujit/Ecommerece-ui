import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import CustomSnackBar from '../Component/CustomSnackBar'
import { Box, Stack } from '@mui/material'

const MainLayout = () => {
  return (
    <>
      <CustomSnackBar />
      <Stack spacing={7}>
        <Header />

        <Box
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <Outlet />
        </Box>

        <Footer />
      </Stack>
    </>
  )
}

export default MainLayout