import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import { UserProvider } from "./stores/UserContext";
import React from "react";
import { PostProvider } from "./stores/PostContext";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <PostProvider>
        <UserProvider>
          <RouterProvider router={createBrowserRouter(routes)} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </UserProvider>
      </PostProvider>
    </>
  );
};

export default App;
