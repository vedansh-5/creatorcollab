import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev, [field]: value
        }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: ""}));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
            try{
                setIsLoading(true);
                //api call for login here, using dummy login now
                await new Promis(resolve => setTimeout(resolve, 1000));

                // Store the token (in real app, this would come API)
                localStorage.setItem('token', 'dummy-token');

                navigate('/users/profile')
            } catch (err) {
                setErrors(prev => ({
                    ...prev, submit: 'Invalid email or password'
                }));
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <div className="flex w-full h-[calc(85vh-4rem)]">
          <div className="flex w-full overflow-hidden">
            <div className="flex-1 flex flex-col h-full">
              {/* Header */}
              <div className="shrink-0 p-4">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-rose-300 rounded-xl mr-2" />
                  <span className="text-lg font-semibold">Creator Collab</span>
                </div>
              </div>
    
              {/* Main Content */}
              <div className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                      <h1 className="text-2xl font-bold">Welcome Back Creator!</h1>
                      <p className="text-gray-600 mt-2">Login to manage your deals</p>
                    </div>
    
                    {errors.submit && (
                      <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                        {errors.submit}
                      </div>
                    )}
    
                    <div className="space-y-4">
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`w-full p-3 bg-gray-50 border rounded-lg ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
    
                      <div>
                        <input
                          type="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) => handleChange('password', e.target.value)}
                          className={`w-full p-3 bg-gray-50 border rounded-lg ${
                            errors.password ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                      </div>
                    </div>
    
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Remember me
                      </label>
                      <Link to="/user/forgot-password" className="text-rose-500 hover:text-rose-600">
                        Forgot Password?
                      </Link>
                    </div>
    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 rounded-lg font-semibold text-white ${
                        isLoading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-rose-500 hover:bg-rose-600'
                      } transition`}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>
    
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        className="flex justify-center items-center py-2 px-4 border rounded-lg hover:bg-gray-50"
                      >
                        <img src="/google.svg" alt="Google" className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="flex justify-center items-center py-2 px-4 border rounded-lg hover:bg-gray-50"
                      >
                        <img src="/facebook.svg" alt="Facebook" className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="flex justify-center items-center py-2 px-4 border rounded-lg hover:bg-gray-50"
                      >
                        <img src="/twitter.svg" alt="Twitter" className="h-5 w-5" />
                      </button>
                    </div>
    
                    <p className="text-center text-gray-600 text-sm">
                      Don't have an account?{' '}
                      <Link to="/user/signup" className="text-rose-500 hover:text-rose-600 font-semibold">
                        Sign up
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
    
              {/* Footer */}
              <div className="shrink-0 p-4 bg-white border-t">
                <p className="text-xs text-gray-500 text-center">
                  By logging in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
    
            {/* Right Panel */}
            <div className="hidden lg:block w-1/3 bg-gradient-to-b from-rose-400 to-rose-500" />
          </div>
        </div>
    );
};

export default UserLogin;