import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Shield, Search, CheckCircle, AlertTriangle,
    TrendingUp, User, ThumbsUp, Eye, Share2,
    BadgeCheck, AlertOctagon, Clock, BarChart2
} from 'lucide-react';
const Nav = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('trending');
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState([]);
    return (

        <div className="bg-white border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-2xl font-bold text-blue-600" onClick={() => {
                                    navigate('/'); // Navigate to /trending
                                }}>TruthLens</h1>
                        <nav className="hidden md:flex space-x-4">
                            <button
                                onClick={() => {
                                    setActiveTab('trending');
                                    navigate('/news'); // Navigate to /trending
                                }}
                                className={`px-3 py-2 rounded-md ${activeTab === 'trending' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Trending
                            </button>

                            <button
                                onClick={() => {
                                    setActiveTab('creators halt');
                                    navigate('/creator'); // Navigate to /latest
                                }}
                                className={`px-3 py-2 rounded-md ${activeTab === 'latest' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Creators Halt
                            </button>

                            <button
                                onClick={() => {
                                    setActiveTab('verified');
                                    navigate('/verified'); // Navigate to /verified
                                }}
                                className={`px-3 py-2 rounded-md ${activeTab === 'verified' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Verified
                            </button>

                            <button
                                onClick={() => {
                                    setActiveTab('categories');
                                    navigate('/categories'); // Navigate to /categories
                                }}
                                className={`px-3 py-2 rounded-md ${activeTab === 'categories' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Categories
                            </button>
                            {/* {['trending', 'latest', 'verified', 'categories'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-md ${activeTab === tab
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))} */}
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for news or creators..."
                            className="border rounded-md px-4 py-2 w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Nav