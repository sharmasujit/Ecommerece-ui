import MainLayout from "../Layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import Home from "../pages/Home";
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
        ]
    }

]