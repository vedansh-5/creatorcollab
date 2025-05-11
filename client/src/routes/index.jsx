import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import AddDeal from '../pages/adddeal';
import BrandSignup from '../pages/brandsignup';
import ErrorBoundary from '../components/errorboundary';
import BrandLogin from '../pages/brandlogin';

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
        ],
    },
]);

export default router;