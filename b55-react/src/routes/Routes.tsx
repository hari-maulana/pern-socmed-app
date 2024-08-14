import { RouteObject } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import Reset from "../pages/Reset";
import AuthLayout from "../layout/AuthLayout";
import Homepage from "../pages/Homepage";
import SearchPage from "../pages/SearchPage";
import FollowsPage from "../pages/FollowsPage";
import ProfilePage from "../pages/ProfilePage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: "/search",
                element: <SearchPage />,
            },
            {
                path: "/follows",
                element: <FollowsPage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            }
        ]
    },

    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "register",
                element: <Register />, 
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "forgot",
                element: <Forgot />,
            },
            {
                path: "reset",
                element: <Reset />,
            },
        ]
    },
];

export default routes;