import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex items-center justiy-center bg-gray-100">
            <div className="bg-white p=8 rounded-lh shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-600 mb-4">
                    {error?.message || 'An unexpected error occured'}
                </p>
                <button onClick={() => window.location.href = '/'} className='bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition'>
                    Go Back Home                    
                </button>
            </div>
        </div>
    );
};

export default ErrorBoundary;