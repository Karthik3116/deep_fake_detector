

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom'; // To handle routing

const data = [
  { name: 'Jan', trustScore: 85, contentReach: 2400, verifiedPieces: 24 },
  { name: 'Feb', trustScore: 88, contentReach: 1398, verifiedPieces: 22 },
  { name: 'Mar', trustScore: 92, contentReach: 9800, verifiedPieces: 35 },
  { name: 'Apr', trustScore: 89, contentReach: 3908, verifiedPieces: 28 },
  { name: 'May', trustScore: 95, contentReach: 4800, verifiedPieces: 32 },
];

const CreatorDashboard = () => {
  const [showPostOptions, setShowPostOptions] = useState(false); // Controls visibility of post options

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">Creator Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-600" />
              <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
              <button onClick={() => setShowPostOptions(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post Options */}
      {showPostOptions && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h3 className="text-2xl font-semibold mb-4">Choose Post Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Link to="/post/video" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                Video
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Link to="/post/image" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                Image
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Link to="/post/text" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                Text
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Overall Trust Score</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Content Pieces Verified</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Issues Flagged</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
          <div className="h-80">
            <LineChart width={800} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="trustScore" stroke="#2563eb" />
              <Line type="monotone" dataKey="contentReach" stroke="#16a34a" />
              <Line type="monotone" dataKey="verifiedPieces" stroke="#ca8a04" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
