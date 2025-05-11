import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BrandDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const stats = {
    activeDeals: 12,
    totalInfluencers: 45,
    ongoingCampaigns: 3,
    totalReach: '2.5M'
  };

  const recentDeals = [
    { id: 1, title: 'Summer Collection Campaign', influencer: 'John Doe', status: 'active', reach: '500K' },
    { id: 2, title: 'Product Launch', influencer: 'Jane Smith', status: 'pending', reach: '750K' },
    // Add more deals here
  ];

  return (
    <div className="flex w-full h-[calc(85vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shrink-0">
        <div className="p-4">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-rose-300 rounded-xl mr-3" />
            <span className="text-xl font-semibold">Brand Portal</span>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                activeTab === 'overview' ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Overview
            </button>

            <button 
              onClick={() => setActiveTab('deals')}
              className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                activeTab === 'deals' ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Active Deals
            </button>

            <button 
              onClick={() => navigate('/brand/adddeal')}
              className="w-full flex items-center px-4 py-2 text-white bg-rose-500 rounded-lg hover:bg-rose-600"
            >
              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Deal
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="shrink-0 bg-white border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-gray-500 mb-2">Active Deals</div>
                <div className="text-2xl font-bold">{stats.activeDeals}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-gray-500 mb-2">Total Influencers</div>
                <div className="text-2xl font-bold">{stats.totalInfluencers}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-gray-500 mb-2">Ongoing Campaigns</div>
                <div className="text-2xl font-bold">{stats.ongoingCampaigns}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-gray-500 mb-2">Total Reach</div>
                <div className="text-2xl font-bold">{stats.totalReach}</div>
              </div>
            </div>

            {/* Recent Deals */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold">Recent Deals</h2>
              </div>
              <div className="divide-y">
                {recentDeals.map(deal => (
                  <div key={deal.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{deal.title}</h3>
                        <p className="text-sm text-gray-500">{deal.influencer}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Reach: {deal.reach}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          deal.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {deal.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;