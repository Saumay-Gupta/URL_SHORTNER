import React from 'react'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'
import SignUP from '../components/SignUP'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Home from '../components/Home'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/signUP",
      element: <SignUP/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/dashboard",
      element: <Dashboard/>
    },
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App