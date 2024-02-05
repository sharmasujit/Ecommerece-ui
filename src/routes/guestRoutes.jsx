import MinimumLayout from "../Layout/MinimumLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const guestRoutes =[
    {
        path:"/",
        element:<MinimumLayout/>,
        children:[
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"login",
                element:<Login/>
            }
        ]
    }
   
]