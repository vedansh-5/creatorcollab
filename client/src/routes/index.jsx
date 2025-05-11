import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import AddDeal from '../pages/adddeal';
import BrandSignup from '../pages/brandsignup';
import ErrorBoundary from '../components/errorboundary';
import BrandLogin from '../pages/brandlogin';
import UserSignup from '../pages/usersignup';
import UserProfile from '../pages/userprofile';
import UserLogin from '../pages/userlogin';
import BrandDashboard from '../pages/branddashboard';
import Home from '../pages/home';
import Deals from '../pages/deals';
import Community from '../pages/community';
import FAQ from '../pages/faq';

const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/brand/signup",
                element: <BrandSignup/>,
            },
            {
                path: "/brand/login",
                element: <BrandLogin />,
            },
            {
                path: "/brand/dashboard",
                element: <BrandDashboard />,
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
            {
                path: "/deals",
                element: <Deals />,
            },
            {
                path: "/community",
                element: <Community />,
            },
            {
                path: "/faq",
                element: <FAQ />,
            },
        ],
    },
]);

export default router;