import { Button, Stack } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SellerProduct = () => {
    return (
        <>
            <Stack justifyContent="center" alignItems="center">
                <Button variant='contained' color='success' sx={{ width:{xs:"100%",md:"15%"} }}>
                    Add Product
                </Button>
            </Stack>

        </>
    )
}

export default SellerProduct;