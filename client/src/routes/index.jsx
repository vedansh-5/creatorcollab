import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import AddDeal from '../pages/adddeal';
import BrandSignup from '../pages/brandsignup';
import ErrorBoundary from '../components/errorboundary';
import BrandLogin from '../pages/brandlogin';
import UserSignup from '../pages/usersignup';
import UserProfile from '../pages/userprofile';
import UserLogin from '../pages/userlogin';

const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            // {
            //     path: "/",
            //     element: <Home />,
            // },
            {
                path: "/brand/signup",
                element: <BrandSignup/>,
            },
            {
                path: "/brand/login",
                element: <BrandLogin />,
            },
            {
                path: '/brand/adddeal',
                element: <AddDeal />,
            },
            {
                path: "/users/signup",
                element: <UserSignup />,
            },
            {
                path: "/users/login",
                element: <UserLogin />,
            },
            {
                path: "/users/profile",
                element: <UserProfile />,
            },
        ],
    },
]);

export default router;