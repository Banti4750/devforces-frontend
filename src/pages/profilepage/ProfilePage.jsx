import React, { useEffect, useState } from 'react';
import { MessageSquare, Mail, Users, Edit, X } from 'lucide-react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from "react-tooltip";

const activityData = (() => {
    const end = new Date();
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);

    const days = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push({
            date: d.toISOString().split("T")[0],
            count: Math.floor(Math.random() * 6),
        });
    }

    return days;
})();

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        profilePic: '',
        country: '',
        organization: ''
    });
    const [updating, setUpdating] = useState(false);

    async function fetchUserData() {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setUserData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData && userData.user) {
            setFormData({
                name: userData.user.name || '',
                profilePic: userData.user.profilePic || '',
                country: userData.user.country || '',
                organization: userData.user.organization || ''
            });
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            setUserData(data);
            setIsModalOpen(false);
            alert('Profile updated successfully!');
        } catch (err) {
            alert('Error updating profile: ' + err.message);
            console.error(err);
        } finally {
            setUpdating(false);
        }
    };

    const getRankColor = (rank) => {
        if (!rank) return 'text-gray-500';
        const rankLower = rank.toLowerCase();
        if (rankLower === 'newbie') return 'text-gray-600';
        if (rankLower === 'pupil') return 'text-green-600';
        if (rankLower === 'specialist') return 'text-cyan-600';
        if (rankLower === 'expert') return 'text-blue-600';
        if (rankLower.includes('master')) return 'text-orange-600';
        if (rankLower.includes('grandmaster')) return 'text-red-600';
        return 'text-gray-500';
    };

    const getRankBadgeColor = (rank) => {
        if (!rank) return 'bg-gray-100 text-gray-700';
        const rankLower = rank.toLowerCase();
        if (rankLower === 'newbie') return 'bg-gray-100 text-gray-700';
        if (rankLower === 'pupil') return 'bg-green-100 text-green-700';
        if (rankLower === 'specialist') return 'bg-cyan-100 text-cyan-700';
        if (rankLower === 'expert') return 'bg-blue-100 text-blue-700';
        return 'bg-gray-100 text-gray-700';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-gray-400">Loading profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-red-400">Error: {error}</div>
            </div>
        );
    }

    if (!userData || !userData.user) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-gray-400">No profile data available</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-leetcode-dark-background flex items-center justify-center">
                <div className="text-gray-400">Loading profile...</div>
            </div>
        );
    }

    if (error || !userData || !userData.user) {
        return (
            <div className="min-h-screen bg-leetcode-dark-background flex items-center justify-center">
                <div className="text-red-400">{error || 'No profile data available'}</div>
            </div>
        );
    }

    const user = userData.user;
    const username = user.name || user.email?.split('@')[0] || 'User';

    return (
        <div className="min-h-screen bg-leetcode-dark-background">
            <div className="max-w-6xl mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-leetcode-dark-sidebar border border-stone-600 rounded-lg shadow-sm">
                            {/* Header with rank badge */}
                            <div className="bg-leetcode-dark-sidebar flex items-center justify-between px-4 py-2 border-b border-stone-600">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getRankBadgeColor(user.currentRank)}`}>
                                    {user.currentRank ? user.currentRank.charAt(0).toUpperCase() + user.currentRank.slice(1) : 'Unrated'}
                                </span>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-leetcode-dark-sidebar hover:bg-leetcode-dark-third text-white text-sm rounded transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            </div>

                            {/* Profile content */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-xl font-bold text-gray-100">
                                        {username}
                                    </h1>

                                </div>

                                {/* Contest Rating */}
                                <div className="flex items-start mb-3">
                                    <div className="text-xl mr-2">🎖️</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-400 mb-1">Contest rating:</div>
                                        <div>
                                            <span className={`text-lg font-bold ${getRankColor(user.currentRank)}`}>
                                                {user.currentRating || 'Unrated'}
                                            </span>
                                            {user.maxRank && (
                                                <span className="text-xs text-gray-500 ml-1">
                                                    (max. <span className={`font-semibold ${getRankColor(user.maxRank)}`}>{user.maxRank}</span>, {user.maxRating})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Contribution */}
                                <div className="flex items-start mb-3">
                                    <div className="text-xl mr-2">⭐</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-400 mb-1">Contribution:</div>
                                        <div className="text-base font-semibold text-gray-100">{user.contribution || 0}</div>
                                    </div>
                                </div>

                                {/* Friend of */}
                                <div className="flex items-start mb-4">
                                    <div className="text-xl mr-2">👥</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-400 mb-1">Friend of:</div>
                                        <div className="text-base text-gray-100">
                                            <span className="font-semibold">{user.friendCount || 0}</span> users
                                        </div>
                                    </div>
                                </div>

                                {/* Last visit and Registered */}
                                <div className="space-y-1 mb-4 text-xs text-gray-300 border-t border-stone-600 pt-3">

                                    <div>
                                        <span className="font-semibold">Registered:</span> {userData.joinedAtFormatted}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Email:</span> {user.email}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Country:</span> {user.country}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Organization:</span> {user.organization}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-1 border-t border-stone-600 pt-2">
                                    <div className="flex items-center">
                                        <MessageSquare className="w-3 h-3 mr-1 text-blue-400" />
                                        <a href="#" className="text-xs text-blue-400 hover:text-blue-300 underline">Comments</a>
                                    </div>
                                    <div className="flex items-center text-xs">
                                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                                        <a href="#" className="text-blue-400 hover:text-blue-300 underline mr-1">Talks</a>
                                        <span className="text-gray-600 mx-1">|</span>
                                        <a href="#" className="text-blue-400 hover:text-blue-300 underline">Send message</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Profile Picture */}
                    <div className="lg:col-span-1">
                        <div className="bg-leetcode-dark-sidebar border border-stone-600 rounded shadow-sm p-6">
                            <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded">
                                {user.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt="Profile"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                ) : (
                                    <div className="text-gray-500">
                                        <Users className="w-32 h-32" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Calendar */}
                <div className="p-2 mt-4 bg-leetcode-dark-sidebar rounded-2xl border border-stone-600">
                    <CalendarHeatmap
                        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                        endDate={new Date()}
                        values={activityData}
                        classForValue={(value) => {
                            if (!value) return "color-empty";
                            return `color-scale-${value.count}`;
                        }}
                        tooltipDataAttrs={(value) => ({
                            "data-tip": `${value.date} - ${value.count} submissions`,
                        })}
                        showWeekdayLabels={true}
                    />

                    <Tooltip />
                    <style>{`
                        .color-empty {
                            fill: #2d2d2d;
                        }
                        .color-scale-0 {
                            fill: #2d2d2d;
                        }
                        .color-scale-1 {
                            fill: #0e4429;
                        }
                        .color-scale-2 {
                            fill: #006d32;
                        }
                        .color-scale-3 {
                            fill: #26a641;
                        }
                        .color-scale-4 {
                            fill: #39d353;
                        }
                        .color-scale-5 {
                            fill: #7ee787;
                        }
                    `}</style>
                </div>

                {/* Edit Profile Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-leetcode-dark-sidebar border border-stone-600 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b border-stone-600">
                                <h2 className="text-xl font-bold text-gray-100">Edit Profile</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleUpdateProfile} className="p-4 space-y-4">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-leetcode-dark-third border border-stone-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                {/* Profile Picture URL */}
                                <div>
                                    <label htmlFor="profilePic" className="block text-sm font-medium text-gray-300 mb-2">
                                        Profile Picture URL
                                    </label>
                                    <input
                                        type="url"
                                        id="profilePic"
                                        name="profilePic"
                                        value={formData.profilePic}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-leetcode-dark-third border border-stone-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                    {formData.profilePic && (
                                        <div className="mt-2 flex justify-center">
                                            <img
                                                src={formData.profilePic}
                                                alt="Preview"
                                                className="w-24 h-24 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Country */}
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-leetcode-dark-third border border-stone-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Enter your country"
                                    />
                                </div>

                                {/* Organization */}
                                <div>
                                    <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
                                        Organization
                                    </label>
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-leetcode-dark-third border border-stone-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Enter your organization"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2 bg-leetcode-dark-third  text-gray-200 rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="flex-1 px-4 py-2 bg-leetcode-dark-background  text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {updating ? 'Updating...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ProfilePage;