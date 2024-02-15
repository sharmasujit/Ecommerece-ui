import { Grid } from '@mui/material'
import React from 'react'

const ProductImage = ({imageUrl}) => {
  return (
    <Grid container>
        <Grid item>
            <img style={{objectFit:"cover", width:"100%",height:"600px"}} 
            src={imageUrl || "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-illustration-of-a-flat-vector-photo-camera-icon-and-a-no-image-available-icon-vector-png-image_40968614.jpg"} />
        </Grid>
    </Grid>
  )
}

export default ProductImage