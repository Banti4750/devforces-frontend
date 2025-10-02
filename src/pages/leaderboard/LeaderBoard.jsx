import { Crown, Medal, TrendingUp, Trophy, User } from 'lucide-react'
import React, { useState } from 'react'

const LeaderBoard = () => {
    const [activeTab, setActiveTab] = useState('global');

    const globalLeaders = [
        { rank: 1, username: 'tourist', rating: 3889, country: 'BY', maxRank: 'Legendary Grandmaster', solved: 3245, contests: 156 },
        { rank: 2, username: 'Benq', rating: 3779, country: 'US', maxRank: 'Legendary Grandmaster', solved: 2891, contests: 142 },
        { rank: 3, username: 'ksun48', rating: 3721, country: 'CA', maxRank: 'Legendary Grandmaster', solved: 2654, contests: 138 },
        { rank: 4, username: 'Petr', rating: 3695, country: 'RU', maxRank: 'Legendary Grandmaster', solved: 2987, contests: 165 },
        { rank: 5, username: 'Um_nik', rating: 3684, country: 'RU', maxRank: 'Legendary Grandmaster', solved: 2743, contests: 147 },
        { rank: 6, username: 'jiangly', rating: 3672, country: 'CN', maxRank: 'Legendary Grandmaster', solved: 3012, contests: 134 },
        { rank: 7, username: 'Radewoosh', rating: 3658, country: 'PL', maxRank: 'Legendary Grandmaster', solved: 2834, contests: 152 },
        { rank: 8, username: 'ecnerwala', rating: 3642, country: 'US', maxRank: 'Legendary Grandmaster', solved: 2567, contests: 129 },
    ];

    const contestLeaders = [
        { rank: 1, username: 'tourist', score: 8934, solved: 4, penalty: 0, time: '1:23:45' },
        { rank: 2, username: 'jiangly', score: 8765, solved: 4, penalty: 1, time: '1:28:12' },
        { rank: 3, username: 'Benq', score: 8521, solved: 4, penalty: 2, time: '1:35:23' },
        { rank: 4, username: 'ksun48', score: 7834, solved: 3, penalty: 0, time: '1:42:08' },
        { rank: 5, username: 'Um_nik', score: 7723, solved: 3, penalty: 1, time: '1:45:34' },
        { rank: 6, username: 'Petr', score: 7645, solved: 3, penalty: 1, time: '1:48:19' },
        { rank: 7, username: 'ecnerwala', score: 7512, solved: 3, penalty: 2, time: '1:52:43' },
        { rank: 8, username: 'Radewoosh', score: 7389, solved: 3, penalty: 3, time: '1:56:27' },
    ];

    const getRatingColor = (rating) => {
        if (rating >= 3000) return 'text-red-500';
        if (rating >= 2400) return 'text-red-400';
        if (rating >= 2100) return 'text-orange-400';
        if (rating >= 1900) return 'text-purple-400';
        if (rating >= 1600) return 'text-blue-400';
        if (rating >= 1400) return 'text-cyan-400';
        if (rating >= 1200) return 'text-green-400';
        return 'text-gray-400';
    };

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
        if (rank === 2) return <Medal className="h-5 w-5 text-gray-300" />;
        if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
        return null;
    };

    return (
        <>
            <div className='bg-leetcode-dark-background min-h-screen flex justify-center items-start pt-6'>
                {/* Main container */}
                <div className='w-3/4'>
                    <div className='px-4 py-6'>
                        <div className='flex items-center gap-2'>
                            <Trophy className='h-6 w-6 text-orange-400' />
                            <h1 className='text-leetcode-dark-text text-2xl font-semibold'>Leaderboard</h1>
                        </div>
                    </div>

                    <div className='bg-leetcode-dark-sidebar rounded-lg p-6 mt-4'>
                        {/* navigation buttons */}
                        <div className='border border-leetcode-dark-third rounded-xl mb-6'>
                            <button
                                onClick={() => setActiveTab('global')}
                                className={`px-4 py-2 m-1 w-50 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'global'
                                    ? 'bg-leetcode-dark-background text-leetcode-dark-text'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text'
                                    }`}
                            >
                                Global Rankings
                            </button>
                            <button
                                onClick={() => setActiveTab('contest')}
                                className={`px-4 py-2 m-1 w-50 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'contest'
                                    ? 'bg-leetcode-dark-background text-leetcode-dark-text'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text'
                                    }`}
                            >
                                Latest Contest
                            </button>
                        </div>

                        <div>
                            {activeTab === 'global' ? (
                                <div>
                                    <div className='mb-4 flex items-center justify-between'>
                                        <h2 className='text-xl font-semibold text-white'>Top Competitive Devlopers</h2>
                                        <span className='text-sm text-gray-400'>Updated daily</span>
                                    </div>

                                    <div className='overflow-x-auto'>
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b border-gray-700'>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Rank</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>User</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Rating</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Country</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Solved</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Contests</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {globalLeaders.map((leader) => (
                                                    <tr
                                                        key={leader.rank}
                                                        className='border-b border-gray-700 hover:bg-gray-750 transition-colors'
                                                    >
                                                        <td className='py-4 px-4'>
                                                            <div className='flex items-center gap-2'>
                                                                {getRankIcon(leader.rank)}
                                                                <span className='text-white font-bold'>{leader.rank}</span>
                                                            </div>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <div className='flex items-center gap-2'>
                                                                <User className='h-4 w-4 text-gray-500' />
                                                                <span className={`font-semibold ${getRatingColor(leader.rating)}`}>
                                                                    {leader.username}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <div className='flex items-center gap-1'>
                                                                <TrendingUp className='h-4 w-4 text-green-400' />
                                                                <span className={`font-bold ${getRatingColor(leader.rating)}`}>
                                                                    {leader.rating}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <span className='text-gray-300'>{leader.country}</span>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <span className='text-blue-400 font-semibold'>{leader.solved}</span>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <span className='text-gray-300'>{leader.contests}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className='mb-4 flex items-center justify-between'>
                                        <h2 className='text-xl font-semibold text-white'>Codeforces Round #912 (Div. 2)</h2>
                                        <span className='text-sm text-gray-400'>Ended 2 hours ago</span>
                                    </div>

                                    <div className='overflow-x-auto'>
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b border-gray-700'>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Rank</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Participant</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Score</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Solved</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Penalty</th>
                                                    <th className='text-left py-3 px-4 text-gray-400 font-semibold'>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contestLeaders.map((leader) => (
                                                    <tr
                                                        key={leader.rank}
                                                        className='border-b border-gray-700 hover:bg-gray-750 transition-colors'
                                                    >
                                                        <td className='py-4 px-4'>
                                                            <div className='flex items-center gap-2'>
                                                                {getRankIcon(leader.rank)}
                                                                <span className='text-white font-bold'>{leader.rank}</span>
                                                            </div>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <div className='flex items-center gap-2'>
                                                                <User className='h-4 w-4 text-gray-500' />
                                                                <span className='text-blue-400 font-semibold hover:text-blue-300 cursor-pointer'>
                                                                    {leader.username}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <span className='text-green-400 font-bold'>{leader.score}</span>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <span className='text-white font-semibold'>{leader.solved}/4</span>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <span className='text-red-400'>{leader.penalty}</span>
                                                        </td>
                                                        <td className='py-4 px-4'>
                                                            <span className='text-gray-300'>{leader.time}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaderBoard