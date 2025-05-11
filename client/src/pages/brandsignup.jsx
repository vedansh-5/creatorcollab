import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandSignup = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState ({
        brandName: "",
        email: "",
        password: "",
        confirmPassword: "",
        website: "",
        industry: "",
        location: "",
        description: "",
        logo: null
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, logo: file}));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if( !formData.brandName.trim()) newErrors.brandName = "Brand name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.password) newErrors.password = "Password is required";
        else if(formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if(formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!formData.industry) newErrors.industry = "Industry is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setIsLoading(true);
                navigate('/brand/dashboard');
            } catch (err) {
                setErrors(prev => ({
                    ...prev, submit: 'Failed to create account. Please try again.'
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
                    <div className="flex-1 overflow-y-auto px-6 pb-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h1 className="text-2xl font-bold mb-6">Create your Brand Account</h1>

                            {/* Logo upload - Fixed typo in className */}
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                    {formData.logo ? (
                                        <img 
                                            src={URL.createObjectURL(formData.logo)} 
                                            alt="Brand logo" 
                                            className="w-full h-full rounded-full object-cover" 
                                        />
                                    ) : (
                                        <svg 
                                            className="w-8 h-8 text-gray-400" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2" 
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                            />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <input 
                                        type="file" 
                                        id="logo" 
                                        accept="image/*" 
                                        onChange={handleLogoChange} 
                                        className="hidden" 
                                    />
                                    <label 
                                        htmlFor="logo" 
                                        className="bg-rose-50 text-rose-500 px-4 py-2 rounded cursor-pointer hover:bg-rose-100"
                                    >
                                        Upload logo
                                    </label>
                                </div>
                            </div>

                            {/* Brand information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Brand name" 
                                        value={formData.brandName} 
                                        onChange={(e) => handleChange('brandName', e.target.value)} 
                                        className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.brandName ? 'border-red-500' : 'border-gray-200'}`} 
                                    />
                                    {errors.brandName && <p className="text-red-500 text-sm mt-1">{errors.brandName}</p>}
                                </div>

                                {/* Fixed error.email to errors.email */}
                                <div>
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        value={formData.email} 
                                        onChange={(e) => handleChange('email', e.target.value)} 
                                        className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-200'}`} 
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <input 
                                        type="password" 
                                        placeholder="Password" 
                                        value={formData.password} 
                                        onChange={(e) => handleChange('password', e.target.value)} 
                                        className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-200'}`} 
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                        className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>
                                    
                                <div>
                                    <input
                                        type="url"
                                        placeholder="Website (Optional)"
                                        value={formData.website}
                                        onChange={(e) => handleChange('website', e.target.value)}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <select
                                        value={formData.industry}
                                        onChange={(e) => handleChange('industry', e.target.value)}
                                        className={`w-full p-3 bg-gray-50 border rounded-lg ${errors.industry ? 'border-red-500' : 'border-gray-200'}`}
                                    >
                                        <option value="">Select Industry</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="beauty">Beauty</option>
                                        <option value="technology">Technology</option>
                                        <option value="food">Food & Beverage</option>
                                        <option value="health">Health & Wellness</option>
                                        <option value="travel">Travel</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                                </div>

                                <div>
                                    <textarea
                                        placeholder="Tell us about your brand..."
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-24"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{' '}
                            <a href="/brand/login" className="text-rose-400 hover:text-rose-600 font-semibold">
                                Login here
                            </a>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="shrink-0 p-4 bg-white border-t">
                        <p className="text-xs text-gray-500 text-center">
                            By signing up, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="hidden lg:block w-1/3 bg-gradient-to-b from-rose-400 to-rose-500" />
            </div>
        </div>
    );
};

export default BrandSignup;