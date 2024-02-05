import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './slices/snackbar.slices.js'

const store = configureStore({
  reducer: {
    snackbar:snackbarReducer
  },
})

export default store;
