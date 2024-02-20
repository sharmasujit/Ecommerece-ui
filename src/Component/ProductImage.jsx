import { Grid } from '@mui/material'
import React from 'react'

const ProductImage = ({imageUrl}) => {
  return (
    <Grid container>
        <Grid item>
            <img style={{objectFit:"cover", width:"100%",height:"600px"}} 
            src={imageUrl || "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"} />
        </Grid>
    </Grid>
  )
}

export default ProductImage