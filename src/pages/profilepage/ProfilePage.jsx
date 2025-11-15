import React from 'react';
import { MessageSquare, Mail, Star, Users } from 'lucide-react';

const ProfilePage = () => {
    const userData = {
        user: {
            id: "68ce58d6c7ef7c7e48539051",
            email: "bantikumar6203818460@gmail.com",
            name: "Banti Kumar",
            username: "banti__4750",
            maxRank: "newbie",
            maxRating: 1052,
            currentRank: "newbie",
            currentRating: 757,
            contribution: 0,
            friendCount: 0,
            lastVisit: "23 hours ago",
            profilePic: null,
            isVerified: false,
            country: null,
            organization: null,
            joinedAt: "2025-09-20T07:33:42.181Z"
        },
        joinedAtFormatted: "2 years ago"
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

    return (
        <div className="min-h-screen bg-leetcode-dark-background">
            <div className="max-w-6xl mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-leetcode-dark-sidebar border border-stone-600 rounded-lg shadow-sm">
                            {/* Header with rank badge */}
                            <div className="bg-leetcode-dark-sidebar px-4 py-2 border-b border-stone-600">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getRankBadgeColor(userData.user.currentRank)}`}>
                                    {userData.user.currentRank ? userData.user.currentRank.charAt(0).toUpperCase() + userData.user.currentRank.slice(1) : 'Unrated'}
                                </span>
                            </div>

                            {/* Profile content */}
                            <div className="p-4">
                                <h1 className="text-xl font-bold text-gray-100 mb-4">
                                    {userData.user.username}
                                </h1>

                                {/* Contest Rating */}
                                <div className="flex items-start mb-3">
                                    <div className="text-xl mr-2">🎖️</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-400 mb-1">Contest rating:</div>
                                        <div>
                                            <span className={`text-lg font-bold ${getRankColor(userData.user.currentRank)}`}>
                                                {userData.user.currentRating}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-1">
                                                (max. <span className={`font-semibold ${getRankColor(userData.user.maxRank)}`}>{userData.user.maxRank}</span>, {userData.user.maxRating})
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contribution */}
                                <div className="flex items-start mb-3">
                                    <div className="text-xl mr-2">⭐</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-400 mb-1">Contribution:</div>
                                        <div className="text-base font-semibold text-gray-100">{userData.user.contribution}</div>
                                    </div>
                                </div>

                                {/* Friend of */}
                                <div className="flex items-start mb-4">
                                    <div className="text-xl mr-2">👥</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-400 mb-1">Friend of:</div>
                                        <div className="text-base text-gray-100">
                                            <span className="font-semibold">{userData.user.friendCount}</span> users
                                        </div>
                                    </div>
                                </div>

                                {/* Last visit and Registered */}
                                <div className="space-y-1 mb-4 text-xs text-gray-300 border-t border-stone-600 pt-3">
                                    <div>
                                        <span className="font-semibold">Last visit:</span> {userData.user.lastVisit}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Registered:</span> {userData.joinedAtFormatted}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-1 border-t border-stone-600 pt-3">
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
                                {userData.user.profilePic ? (
                                    <img
                                        src={userData.user.profilePic}
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
            </div>
        </div>
    );
}

export default ProfilePage;