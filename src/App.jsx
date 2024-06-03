
import './App.css'
import Layout from './component/AuthLayout/AuthLayout'
import RouterProvider, { createBrowserRouter } from "react-router-dom"
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import AuthLayout from './component/AuthLayout/AuthLayout';

 function App() {

const routes= createBrowserRouter([
  {path:"/",element:<ProtectedRoute>
<Layout />
</ProtectedRoute>},
{path:"/auth", element:<AuthLayout />,
children:[
  {index:true,element: <Home />},
  {path:"/category/:id",element},
]},

{path:"*",element:<NotFound />},


{path:"/login",element: <Login />},
{path:"/signup",element:<Register />},
]);
  return (
    <>
   <RouterProvider router={routes}>

   </RouterProvider>
   <Toaster />
    </>
  )
}

export default App
