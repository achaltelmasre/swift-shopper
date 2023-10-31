import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Signup from './view/Signup/Signup';
import Login from './view/Login/Login';
import Home from './view/Home/Home'

import './index.css';

const router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>
    },
    {
        path:'/signup',
        element: <Signup/>
    },
    {
        path:'/login',
        element:<Login/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router= {router} />);
