import { createBrowserRouter } from "react-router";
import RootLayOut from "../layouts/RootLayOut";
import Home from "../pages/home/Home";
import AuthLayOut from "../layouts/AuthLayOut";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<RootLayOut />,
        children:[
            {
                index: true,
                element:<Home />
            }
        ]
    },
    {
        path:"/",
        element:<AuthLayOut />,
        children:[
            {
                path:"login",
                element:<Login />
            },
            {
                path:"register",
                element:<Register />
            }
        ]
    }
])