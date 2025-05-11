import React, { useState } from 'react';

const Settings = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    account: {
      email: 'johndoe@example.com',
      phone: '+91 1234567890',
      language: 'en',
      timezone: 'Asia/Kolkata'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      dealAlerts: true,
      paymentUpdates: true,
      newMessages: true
    },
    privacy: {
      profileVisibility: 'public',
      showEarnings: false,
      showStats: true
    },
    payment: {
      defaultMethod: 'bank',
      bankAccount: {
        accountName: 'John Doe',
        accountNumber: '****6789',
        bankName: 'Example Bank'
      },
      upi: {
        id: 'johndoe@upi'
      }
    }
  });

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex h-[600px]">
            {/* Sidebar */}
            <div className="w-64 border-r">
              <nav className="p-4 space-y-1">
                {['account', 'notifications', 'privacy', 'payment'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full px-4 py-2 text-left rounded-lg ${
                      activeTab === tab
                        ? 'bg-rose-50 text-rose-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Account Settings</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={settings.account.email}
                        onChange={(e) => handleChange('account', 'email', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={settings.account.phone}
                        onChange={(e) => handleChange('account', 'phone', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="flex-grow">{key.split(/(?=[A-Z])/).join(' ')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleChange('notifications', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Profile Visibility</label>
                      <select
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => handleChange('privacy', 'profileVisibility', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="verified">Verified Brands Only</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Show Earnings</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.privacy.showEarnings}
                          onChange={(e) => handleChange('privacy', 'showEarnings', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Payment Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Default Payment Method</label>
                      <select
                        value={settings.payment.defaultMethod}
                        onChange={(e) => handleChange('payment', 'defaultMethod', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      >
                        <option value="bank">Bank Transfer</option>
                        <option value="upi">UPI</option>
                      </select>
                    </div>
                    {settings.payment.defaultMethod === 'bank' && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Bank Account Details</p>
                          <p className="font-medium">{settings.payment.bankAccount.accountName}</p>
                          <p className="text-gray-600">{settings.payment.bankAccount.accountNumber}</p>
                          <p className="text-gray-600">{settings.payment.bankAccount.bankName}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 p-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;