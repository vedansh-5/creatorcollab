import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserSignup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        socialAccounts: {
            instagram: "",
            youtube: "",
            tiktok: "",
            twitter: "",
        },
        reachStats: {
            instagram: null,
            youtube: null,
            tiktok: null,
            twitter: null
        },
        verified: {
            instagram: false,
            youtube: false,
            tiktok: false,
            twitter: false
        }
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingStats, setIsFetchingStats] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev,
            [field]: value
        }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: ""}));
        }
    };

    const handleSocialChange = (platform, value) => {
        setFormData(prev => ({
            ...prev, socialAccounts: {
                ...prev.socialAccounts,
                [platform]: value
            }
        }));
    };

    const fetchSocialStats = async (platform) => {
        setIsFetchingStats(true);
        try {
            // API call to fetch stats
            // For now, we'll use dummy stats
            const mockStats = {
                instagram: { followers: 10500, engagement: "2.4%" },
                youtube: { subscribers: 25000, views: "500K" },
                tiktok: { followers: 15000, likes: "100K" },
                twitter: { followers: 5000, engagement: "1.8%" }
            };

            setFormData(prev => ({
                ...prev,
                reachStats: {
                    ...prev.reachStats,
                    [platform]: mockStats[platform]
                }
            }));
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                [platform] : "Failed to fetch stats"
            }));
        } finally {
            setIsFetchingStats(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Basic Info validation
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        
        // Social Media validation
        const hasAtLeastOneSocialAccount = Object.values(formData.socialAccounts).some(account => account !== "");
        if (!hasAtLeastOneSocialAccount) {
            newErrors.social = "At least one social media account is required";
        }

        // Stats validation
        const hasAtLeastOneVerifiedAccount = Object.values(formData.verified).some(isVerified => isVerified);
        if (!hasAtLeastOneVerifiedAccount) {
            newErrors.verified = "Please verify at least one social media account";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                setIsLoading(true);
                
                // Here you would make an API call to your backend
                const response = await fetch('/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error('Signup failed');
                }

                const data = await response.json();
                
                // Store the token in localStorage or your auth state management
                localStorage.setItem('token', data.token);
                
                // Navigate to profile page
                navigate('/user/profile', { 
                    state: { 
                        isNewUser: true,
                        message: 'Account created successfully!' 
                    }
                });
                
            } catch (error) {
                setErrors(prev => ({
                    ...prev,
                    submit: 'Failed to create account. Please try again.'
                }));
            } finally {
                setIsLoading(false);
            }
        }
    };

    const renderSocialStats = (platform) => {
        const stats = formData.reachStats[platform];
        if(!stats) return null;

        return (
            <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm">
            {platform === 'instagram' && (
            <>
                <p>Followers: {stats.followers}</p>
                <p>Engagement Rate: {stats.engagement}</p>
            </>
            )}
            {/* Add similar blocks for other platforms */}
        </div>
        )
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div className="space-y-4 mb-2">
                            <div>
                                <input type="text" placeholder='Full Name' value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className='w-full p-3 bg-gray-50 border rounded-lg'/>
                            </div>
                        </div>
                        <div className='mb-2'>
                            <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full p-3 bg-gray-50 border rounded-lg"
                            />
                        </div>
                        <div className='mb-2'>
                            <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            className="w-full p-3 bg-gray-50 border rounded-lg"
                            />
                        </div>
                    </>
                );

            case 2:
                return (
                    <>
                      <h2 className="text-xl font-semibold mb-4">Social Media Accounts</h2>
                      <div className="space-y-6">
                        {/* Instagram */}
                        <div>
                          <label className="flex items-center text-gray-700 mb-1">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              {/* Add Instagram icon path */}
                            </svg>
                            Instagram
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Instagram Username"
                              value={formData.socialAccounts.instagram}
                              onChange={(e) => handleSocialChange('instagram', e.target.value)}
                              className="flex-1 p-3 bg-gray-50 border rounded-lg"
                            />
                            <button
                              onClick={() => fetchSocialStats('instagram')}
                              disabled={isFetchingStats || !formData.socialAccounts.instagram}
                              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50"
                            >
                              {isFetchingStats ? 'Fetching...' : 'Fetch Stats'}
                            </button>
                          </div>
                          {renderSocialStats('instagram')}
                        </div>

                        {/* Youtube */}
                        <div>
                          <label className="flex items-center text-gray-700 mb-1">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              {/* Add Instagram icon path */}
                            </svg>
                            Youtube
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Youtube Username"
                              value={formData.socialAccounts.youtube}
                              onChange={(e) => handleSocialChange('youtube', e.target.value)}
                              className="flex-1 p-3 bg-gray-50 border rounded-lg"
                            />
                            <button
                              onClick={() => fetchSocialStats('youtube')}
                              disabled={isFetchingStats || !formData.socialAccounts.youtube}
                              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50"
                            >
                              {isFetchingStats ? 'Fetching...' : 'Fetch Stats'}
                            </button>
                          </div>
                          {renderSocialStats('youtube')}
                        </div>

                        {/* Twitter */}
                        <div>
                          <label className="flex items-center text-gray-700 mb-1">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              {/* Add Instagram icon path */}
                            </svg>
                            Twitter
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Twitter Username"
                              value={formData.socialAccounts.twitter}
                              onChange={(e) => handleSocialChange('twitter', e.target.value)}
                              className="flex-1 p-3 bg-gray-50 border rounded-lg"
                            />
                            <button
                              onClick={() => fetchSocialStats('twitter')}
                              disabled={isFetchingStats || !formData.socialAccounts.twitter}
                              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50"
                            >
                              {isFetchingStats ? 'Fetching...' : 'Fetch Stats'}
                            </button>
                          </div>
                          {renderSocialStats('twitter')}
                        </div>

                        {/* Tiktok */}
                        <div>
                          <label className="flex items-center text-gray-700 mb-1">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              {/* Add Instagram icon path */}
                            </svg>
                            Tiktok
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Tiktok Username"
                              value={formData.socialAccounts.tiktok}
                              onChange={(e) => handleSocialChange('tiktok', e.target.value)}
                              className="flex-1 p-3 bg-gray-50 border rounded-lg"
                            />
                            <button
                              onClick={() => fetchSocialStats('tiktok')}
                              disabled={isFetchingStats || !formData.socialAccounts.tiktok}
                              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50"
                            >
                              {isFetchingStats ? 'Fetching...' : 'Fetch Stats'}
                            </button>
                          </div>
                          {renderSocialStats('tiktok')}
                        </div>
          
                        {/* Add similar blocks for YouTube, TikTok, and Twitter */}
                      </div>
                    </>
                  );

            case 3:
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Verify Your Accounts</h2>
                        <div className="space-y-4">
                             {/* Show fetched stats and verification options */}
                            {Object.entries(formData.reachStats).map(([platform, stats]) => {
                                if (!stats) return null;
                                return (
                                    <div key={platform} className="p-4 bg-gray-50 rounded-lg">
                                      <h3 className="font-semibold capitalize mb-2">{platform}</h3>
                                      {/* Display stats and verification status */}
                                    </div>
                                  );
                                })}
                        </div>
                    </>
                );
            default:
                return null;
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

          {/* Progress Steps */}
          <div className="px-4">
            <div className="flex justify-between mb-8">
              {['Basic Info', 'Social Media', 'Verify'].map((label, idx) => (
                <div
                  key={label}
                  className={`flex items-center ${idx < step ? 'text-rose-500' : 'text-gray-400'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    idx < step ? 'bg-rose-500 text-white' : 'bg-gray-200'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="ml-2">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto px-6">
            <div className="max-w-2xl mx-auto">
              {renderStep()}
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 p-4 bg-white border-t">
            <div className="max-w-2xl mx-auto flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-rose-500 hover:bg-rose-600'
                } text-white`}
              >
                {step === 3 
                  ? (isLoading ? 'Creating Account...' : 'Complete Signup') 
                  : 'Next'
                }
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block w-1/3 bg-gradient-to-b from-rose-400 to-rose-500" />
      </div>
    </div>
  );
};

export default UserSignup;
