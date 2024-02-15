import { Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Stack sx={{
      background:"#FFB0B0",
      width:"100vw",
      minHeight:100,
      justifyContent:"center",
      alignItems:"center"
      }}>
        <Typography variant='body2'>Copyright @Nep-Mart 2024</Typography>
    </Stack>
  )
}

export default Footer