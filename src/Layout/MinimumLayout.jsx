import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomSnackBar from '../Component/CustomSnackBar'

const MinimumLayout = () => {
  return (
    <>
    <CustomSnackBar/> 
    <Outlet/> 
    </>
  )
}

export default MinimumLayout