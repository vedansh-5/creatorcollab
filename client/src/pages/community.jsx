import React, { useState } from 'react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  // Mock data - replace with API calls
  const discussions = [
    {
      id: 1,
      title: "Tips for growing Instagram engagement",
      author: "Sarah Johnson",
      replies: 24,
      views: 1200,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for brand collaborations",
      author: "Mike Smith",
      replies: 18,
      views: 856,
      timestamp: "5 hours ago"
    },
    // Add more discussions...
  ];

  const events = [
    {
      id: 1,
      title: "Creator Networking Event",
      date: "June 15, 2025",
      location: "Virtual",
      attendees: 120
    },
    {
      id: 2,
      title: "Brand-Creator Matchmaking Session",
      date: "June 20, 2025",
      location: "Mumbai, India",
      attendees: 75
    },
    // Add more events...
  ];

  return (
    <div className="min-h-[calc(85vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Creator Community</h1>
          <p className="text-gray-600">Connect, share, and grow with fellow creators</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('discussions')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'discussions'
                    ? 'border-b-2 border-rose-500 text-rose-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Discussions
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'events'
                    ? 'border-b-2 border-rose-500 text-rose-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Events
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'discussions' ? (
          <div className="bg-white rounded-xl shadow-sm divide-y">
            {discussions.map(discussion => (
              <div key={discussion.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Posted by {discussion.author} · {discussion.timestamp}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="mr-4">{discussion.replies} replies</span>
                    <span>{discussion.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {event.title}
                </h3>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>📅 {event.date}</p>
                  <p>📍 {event.location}</p>
                  <p>👥 {event.attendees} attending</p>
                </div>
                <button className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg text-sm hover:bg-rose-600">
                  Join Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;