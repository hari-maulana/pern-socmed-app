import { RouteObject } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Forgot from "../pages/auth/Forgot";
import Reset from "../pages/auth/Reset";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/main/Home";
import Search from "../pages/main/Search";
import Follows from "../pages/main/Follows";
import Profile from "../pages/main/Profile";
import PostDetail from "../components/post/postDetail/PostDetailPage";
import UserProfile from "../pages/main/UserProfile";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/follows",
                element: <Follows />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/post/:id",
                element: <PostDetail/>
            },
            {
                path: "/users/:id",
                element: <UserProfile />,
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