import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { guestRoutes } from './routes/guestRoutes';
import { mainRoutes } from './routes/mainRoutes';

const router = createBrowserRouter([...guestRoutes,...mainRoutes]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
