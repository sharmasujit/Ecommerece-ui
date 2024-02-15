import EditIcon from '@mui/icons-material/Edit';
import { Button, Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import DeleteDialog from './DeleteDialog';
import { useNavigate } from 'react-router-dom';

const ProductDescription = ({ name, brand, description, price, category, quantity, _id }) => {
    const userRole = localStorage.getItem("role");
    const navigate = useNavigate();
    return (
        <Grid container
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <Grid item>
                <Typography variant='h4'>{name}</Typography>
            </Grid>

            <Grid item>
                <Typography variant='h5'>{brand}</Typography>
            </Grid>

            <Grid item>
                <Typography variant='h6' sx={{ textAlign: "justify" }}>{description}</Typography>
            </Grid>

            <Grid item
                sx={{ display: "flex" }}
            >
                <Typography variant="h6">Rs.</Typography>
                <Typography variant='h6' sx={{ fontWeight: "bold" }}>{price}</Typography>
            </Grid>

            <Grid item
                sx={{ display: "flex" }}
            >
                <Typography variant='h6'>Available Quantity:</Typography>
                <Typography variant='h6' sx={{ fontWeight: "bold" }}>{quantity}</Typography>
            </Grid>

            <Grid item>
                <Chip
                    label={category}
                    variant="outlined"
                    color="warning"
                    size="medium"
                />
            </Grid>

            <Grid item mt="1rem">
                {userRole==="seller" &&(
                    <Stack direction={"row"} spacing={4}>
                    <Button
                        variant='contained'
                        color='success'
                        size='medium'
                        startIcon={<EditIcon />}
                    >
                        <Typography>Edit Product</Typography>
                    </Button>
                    <DeleteDialog />
                </Stack>
                )}
            </Grid>

        </Grid>
    )
}

export default ProductDescription