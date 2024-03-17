import MainLayout from "../Layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import CartPage from "../pages/CartPage";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";

export const mainRoutes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "product/list",
                element:<ProductList/>
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "product/add",
                element: <AddProduct />
            },
            {
                path:"product/details/:id",
                element:<ProductDetail/>
            },
            {
                path:"product/edit/:id",
                element:<EditProduct/>
            },
            {
                path:"/cart",
                element:<CartPage/>
            }
        ]
    }

]