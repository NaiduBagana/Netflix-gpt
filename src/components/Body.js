import React from 'react';
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/Browse",
        element: <Browse/>
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
