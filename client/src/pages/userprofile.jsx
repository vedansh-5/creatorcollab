import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isNewUser, message } = location.state || {};

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/user/login');
    }
  }, [navigate]);

  return (
    <div className="flex w-full h-[calc(85vh-4rem)]">
      <div className="flex w-full overflow-hidden">
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div className="shrink-0 p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-rose-300 rounded-xl mr-2" />
                <span className="text-lg font-semibold">Creator Collab</span>
              </div>
              {/* Add profile menu here */}
            </div>
          </div>

          {/* Success Message */}
          {isNewUser && message && (
            <div className="bg-green-50 text-green-700 p-4 m-4 rounded-lg">
              {message}
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
              
              {/* Profile sections will go here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                  {/* Add profile info here */}
                </div>

                {/* Social Media Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold mb-4">Social Media Accounts</h2>
                  {/* Add social media stats here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;