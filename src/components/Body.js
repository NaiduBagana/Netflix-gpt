import React, { useEffect } from 'react';
import Login from './Login';
import Browse from './Browse';
import Error from './Error';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';



const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/browse",
        element: <Browse/>

    },
    {
        path:"/error",
        element:<Error/>
    },
    {
        errorElement: <div>Error Occurred</div>
    }
    
]);


const Body = () => {
    
    
    return (
        <div>
           <RouterProvider router={appRouter}/>
        </div>
    );
}

export default Body;
