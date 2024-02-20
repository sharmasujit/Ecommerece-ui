import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import $axios from '../../lib/axios.instance';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { openErrorSnackbar, openSuccessSnackbar } from '../store/slices/snackbar.slices';
const DeleteDialog = () => {
  const { id } = useParams()

  const dispatch=useDispatch()
  const navigate = useNavigate()

  const { isLoading, mutate: deleteProduct } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await $axios.delete(`product/delete/${id}`)
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message));
      navigate("/product/list")
    },
    onError:(error)=>{
      dispatch(openErrorSnackbar(error?.response?.data?.error));
    }
  })


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Loader />
  }
  return (
    <React.Fragment>
      <Button
        color='error'
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        <Typography>Delete Product</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>
            <Typography color={"primary"}>No</Typography>
          </Button>
          <Button
            onClick={() => {
              deleteProduct()
              handleClose()
            }}
            autoFocus>
            <Typography color={"error"}>Yes</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteDialog;