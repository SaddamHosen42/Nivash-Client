import { createBrowserRouter } from "react-router";
import RootLayOut from "../layouts/RootLayOut";
import Home from "../pages/home/Home";

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
    }
])