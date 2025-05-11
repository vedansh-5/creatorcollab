import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isNewUser, message } = location.state || {};
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with API calls
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    avatar: null,
    bio: "Lifestyle and tech content creator",
    completionPercentage: 75,
    socialAccounts: {
      instagram: {
        username: "johndoe",
        followers: 15000,
        engagement: "2.4%",
        verified: true
      },
      youtube: {
        username: "JohnDoeVlogs",
        subscribers: 25000,
        views: "500K",
        verified: true
      },
      tiktok: {
        username: "johndoe_official",
        followers: 10000,
        likes: "100K",
        verified: false
      }
    },
    portfolio: [
      {
        id: 1,
        type: "image",
        platform: "instagram",
        thumbnail: "https://example.com/post1.jpg",
        engagement: "5.2K",
        date: "2025-04-01"
      },
      // Add more portfolio items
    ],
    deals: [
      {
        id: 1,
        brand: "TechGear",
        status: "active",
        type: "Product Review",
        compensation: "₹20,000",
        deadline: "2025-06-01"
      },
      // Add more deals
    ],
    analytics: {
      reachGrowth: "+12%",
      avgEngagement: "3.2%",
      topPerformingPlatform: "Instagram",
      earnings: {
        current: "₹45,000",
        previous: "₹38,000",
        growth: "+18.4%"
      }
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      navigate('/users/login', {
        state: { message: 'Please login to access your profile' }
      });
      return;
    }
  }, [navigate]);

  const calculateCompletionTasks = () => {
    return [
      { task: "Add profile picture", completed: !!profileData.avatar },
      { task: "Write bio", completed: !!profileData.bio },
      { task: "Connect Instagram", completed: !!profileData.socialAccounts.instagram.verified },
      { task: "Connect YouTube", completed: !!profileData.socialAccounts.youtube.verified },
      { task: "Add portfolio items", completed: profileData.portfolio.length > 0 }
    ];
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Profile Overview</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Profile Completion</span>
                    <span className="text-sm font-medium">{profileData.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-rose-500 rounded-full h-2" 
                      style={{ width: `${profileData.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  {calculateCompletionTasks().map((task, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className={`mr-2 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}>
                        {task.completed ? '✓' : '○'}
                      </span>
                      <span className={task.completed ? 'text-gray-600' : 'text-gray-400'}>
                        {task.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Social Media Reach</h2>
              <div className="space-y-4">
                {Object.entries(profileData.socialAccounts).map(([platform, data]) => (
                  <div key={platform} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium capitalize">{platform}</h3>
                      <p className="text-sm text-gray-500">@{data.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {data.followers || data.subscribers} 
                        {platform === 'youtube' ? ' subscribers' : ' followers'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {data.engagement || `${data.views} views`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Reach Growth</p>
                  <p className="text-xl font-semibold text-green-500">
                    {profileData.analytics.reachGrowth}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Engagement</p>
                  <p className="text-xl font-semibold">
                    {profileData.analytics.avgEngagement}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Top Platform</p>
                  <p className="text-xl font-semibold">
                    {profileData.analytics.topPerformingPlatform}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Earnings</p>
                  <p className="text-xl font-semibold text-green-500">
                    {profileData.analytics.earnings.current}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Deals */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Active Deals</h2>
              <div className="space-y-4">
                {profileData.deals.map(deal => (
                  <div key={deal.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{deal.brand}</h3>
                      <p className="text-sm text-gray-500">{deal.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {deal.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {deal.compensation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'portfolio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileData.portfolio.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={`Portfolio item ${item.id}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="capitalize text-sm font-medium">
                      {item.platform}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.engagement} engagement
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Detailed Analytics */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
              {/* Add detailed analytics charts here */}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-8">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {profileData.avatar ? (
                <img 
                  src={profileData.avatar} 
                  alt={profileData.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl text-gray-400">
                  {profileData.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Profile Info */}
            <div>
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <p className="text-gray-600">{profileData.bio}</p>
            </div>
          </div>

          {/* Success Message */}
          {isNewUser && message && (
            <div className="mt-4 bg-green-50 text-green-700 p-4 rounded-lg">
              {message}
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-6 mt-6">
            {['overview', 'portfolio', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-2 font-medium capitalize ${
                  activeTab === tab 
                    ? 'text-rose-500 border-b-2 border-rose-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTab()}
      </div>
    </div>
  );
};

export default UserProfile;