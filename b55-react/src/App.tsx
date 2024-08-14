import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes/Routes"
import { UserProvider } from "./stores/UserContext"
import React from "react"



const App: React.FC = () => {


  return (
    <>
      <UserProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
      </UserProvider>


    </>
  )
}

export default App