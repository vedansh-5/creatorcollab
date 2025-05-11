import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const Deals = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        minFollowrs: '',
        platform: 'all',
        catgory: 'all',
        priceRange: 'all'
    });

    //Mock data - have to replace with api calls
    const [deals] = useState([{
        id: 1,
        title: "Summer Fashion Campaign",
        brand: "Fashion Co",
        minFollowers: 10000,
        platform: "Instagram",
        category: "Fashion",
        budget: "₹20,000-30,000",
        description: "Looking for fashion influencers to promote our summer collection",
        requirements: "Must have engaged fashion audience",
        deadline: "2025-06-01"
    },
    // more details
    ]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev, [key]: value
        }));
    };

    const canApply = (deal) => {
        // In real app, check user's followers count from their profile/auth
        const userFollowers = 15000; // Mock data
        return userFollowers >= deal.minFollowers;
    };

    const handleApply = (dealId) => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/users/login', {
                state: {
                    redirectTo: '/deals',
                    message: 'Please login to apply for deals'
                }
            });
            return;
        }

        // Application logic
        console.log('Applying for deal:', dealId);
    }

    return (
        <div className="flex w-full min-h-[calc(85vh-4rem)]">
        {/* Sidebar Filters */}
        <div className="w-64 bg-white border-r p-6 shrink-0">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            <div className="space-y-6">
            {/* Follower Range */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Followers
                </label>
                <select
                value={filters.minFollowers}
                onChange={(e) => handleFilterChange('minFollowers', e.target.value)}
                className="w-full p-2 border rounded-lg"
                >
                <option value="">All</option>
                <option value="1000">1K+</option>
                <option value="5000">5K+</option>
                <option value="10000">10K+</option>
                <option value="50000">50K+</option>
                <option value="100000">100K+</option>
                </select>
            </div>

            {/* Platform */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
                </label>
                <select
                value={filters.platform}
                onChange={(e) => handleFilterChange('platform', e.target.value)}
                className="w-full p-2 border rounded-lg"
                >
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="twitter">Twitter</option>
                </select>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
                </label>
                <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-2 border rounded-lg"
                >
                <option value="all">All Categories</option>
                <option value="fashion">Fashion</option>
                <option value="beauty">Beauty</option>
                <option value="technology">Technology</option>
                <option value="food">Food & Beverage</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="travel">Travel</option>
                </select>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
                </label>
                <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full p-2 border rounded-lg"
                >
                <option value="all">All Ranges</option>
                <option value="0-10000">Under ₹10,000</option>
                <option value="10000-50000">₹10,000 - ₹50,000</option>
                <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                <option value="100000+">₹1,00,000+</option>
                </select>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
            <h1 className="text-2xl font-semibold">Available Deals</h1>
            </div>

            {/* Deals Grid */}
            <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map(deal => (
                <div key={deal.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">{deal.title}</h2>
                        <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded-full text-sm">
                        {deal.platform}
                        </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                        <p className="text-gray-600">{deal.description}</p>
                        <div className="text-sm text-gray-500">
                        <p>Brand: {deal.brand}</p>
                        <p>Min. Followers: {deal.minFollowers.toLocaleString()}</p>
                        <p>Budget: {deal.budget}</p>
                        <p>Deadline: {new Date(deal.deadline).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleApply(deal.id)}
                        disabled={!canApply(deal)}
                        className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                        canApply(deal)
                            ? 'bg-rose-500 hover:bg-rose-600'
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        {canApply(deal) ? 'Apply Now' : 'Insufficient Followers'}
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default Deals;