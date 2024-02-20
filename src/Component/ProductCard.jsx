import { Chip, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ name, brand, price, description, image, _id }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: "25%", padding: "1rem", boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;" }}>
      <img
        onClick={() => { navigate(`/product/details/${_id}`) }}
        style={{ 
          objectFit: "contain", 
          padding: "1rem 0" , 
          height:"300px",
          width:"100%",
          cursor:"pointer"
        }}
        src={image ||"https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"} />
      <CardContent>
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">{name}</Typography>

          <Chip label={brand} color="secondary" variant="outlined" />
        </Stack>

        <Typography variant='h6'>Rs.{price}</Typography>
        <Typography variant="body1" color="text.secondary">{description}...</Typography>
      </CardContent>
      <CardActions>
        <Button size="large" variant='contained' color='success' fullWidth onClick={() => { navigate(`/product/details/${_id}`) }}>Explore</Button>
      </CardActions>
    </Card>
  );
}
export default ProductCard;