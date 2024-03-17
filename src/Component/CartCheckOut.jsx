import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const CartCheckout = ({ subTotal, discount, grandTotal }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: {
          xs: "100%",
          md: "400px",
        },
        gap: "1rem",
        padding: "2rem",
        boxShadow:
          " rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
      <Typography variant="h4">Order summary</Typography>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography>Sub total</Typography>
        <Typography>Rs.{subTotal}</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography>Discount </Typography>
        <Typography>Rs.{discount}</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography>Grand total</Typography>
        <Typography>Rs.{grandTotal}</Typography>
      </Stack>
      <Button variant="contained" color="success" fullWidth>
        <Typography>proceed to checkout</Typography>
      </Button>
    </Box>
  );
};

export default CartCheckout;