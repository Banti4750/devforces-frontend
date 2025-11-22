import { Crown, Medal, TrendingUp, Trophy, User, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const LeaderBoard = () => {
    const [activeTab, setActiveTab] = useState('global');
    const [globalLeaders, setGlobalLeaders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 10;

    async function fetchGlobalLeaders(page) {
        setIsLoading(true);
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leaderboard?start=${start}&end=${end}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setGlobalLeaders(data);

        } catch (error) {
            console.log('Error fetching globalLeaders: ' + error.message);
            toast.error('Failed to fetch globalLeaders');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (activeTab === 'global') {
            fetchGlobalLeaders(currentPage);
        }
    }, [currentPage, activeTab])

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (globalLeaders.length === itemsPerPage) {
            setCurrentPage(currentPage + 1);
        }
    };

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
        <div className='bg-leetcode-dark-background min-h-screen'>
            {/* Main container */}
            <div className='container mx-auto px-4 py-6 max-w-6xl'>
                <div className='flex items-center gap-2 mb-2'>
                    <Trophy className='h-7 w-7 text-orange-400' />
                    <h1 className='text-leetcode-dark-text text-3xl font-bold'>Leaderboard</h1>
                </div>
                <p className='text-leetcode-dark-muted mb-6 text-lg'>
                    Compete with developers worldwide and track your progress
                </p>

                <div className='bg-leetcode-dark-sidebar rounded-lg p-6 h-full border border-leetcode-dark-third'>
                    {/* Navigation tabs */}
                    <div className='border border-leetcode-dark-third rounded-xl inline-flex mb-6'>
                        <button
                            onClick={() => setActiveTab('global')}
                            className={`px-6 py-3 m-1 w-40 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'global'
                                    ? 'bg-leetcode-dark-background text-leetcode-dark-text shadow-lg'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text hover:bg-leetcode-dark-background/50'
                                }`}
                        >
                            Global Rankings
                        </button>
                        <button
                            onClick={() => setActiveTab('contest')}
                            className={`px-6 py-3 m-1 w-40 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'contest'
                                    ? 'bg-leetcode-dark-background text-leetcode-dark-text shadow-lg'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text hover:bg-leetcode-dark-background/50'
                                }`}
                        >
                            Latest Contest
                        </button>
                    </div>

                    <div>
                        {activeTab === 'global' ? (
                            <div>
                                <div className='mb-4 flex items-center justify-between'>
                                    <h2 className='text-xl font-semibold text-leetcode-dark-text'>Top Competitive Developers</h2>
                                    <span className='text-sm text-leetcode-dark-muted'>Updated daily</span>
                                </div>

                                {isLoading ? (
                                    <div className="p-8 text-center text-leetcode-dark-muted">
                                        <div className="animate-pulse">Loading leaderboard...</div>
                                    </div>
                                ) : (
                                    <div className='overflow-x-auto'>
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b border-leetcode-dark-third'>
                                                    <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Rank</th>
                                                    <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>User</th>
                                                    <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Rating</th>
                                                    <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Country</th>
                                                    <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Solved</th>
                                                    <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Contests</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {globalLeaders.map((leader) => (
                                                    <tr
                                                        key={leader.rank}
                                                        className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-background/50 transition-colors'
                                                    >
                                                        <td className='py-3 px-4'>
                                                            <div className='flex items-center gap-2'>
                                                                {getRankIcon(leader.rank)}
                                                                <span className='text-leetcode-dark-text font-bold'>{leader.rank}</span>
                                                            </div>
                                                        </td>
                                                        <td className='py-3 px-4'>
                                                            <div className='flex items-center gap-2'>
                                                                <User className='h-4 w-4 text-leetcode-dark-muted' />
                                                                <span className={`font-semibold ${getRatingColor(leader.rating)}`}>
                                                                    {leader.username}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className='py-3 px-4'>
                                                            <div className='flex items-center gap-1'>
                                                                <TrendingUp className='h-4 w-4 text-green-400' />
                                                                <span className={`font-bold ${getRatingColor(leader.rating)}`}>
                                                                    {leader.rating}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className='py-3 px-4'>
                                                            <span className='text-leetcode-dark-text'>{leader.country}</span>
                                                        </td>
                                                        <td className='py-3 px-4'>
                                                            <span className='text-blue-400 font-semibold'>{leader.solved}</span>
                                                        </td>
                                                        <td className='py-3 px-4'>
                                                            <span className='text-leetcode-dark-text'>{leader.contests}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <div className='mb-4 flex items-center justify-between'>
                                    <h2 className='text-xl font-semibold text-leetcode-dark-text'>Codeforces Round #912 (Div. 2)</h2>
                                    <span className='text-sm text-leetcode-dark-muted'>Ended 2 hours ago</span>
                                </div>

                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead>
                                            <tr className='border-b border-leetcode-dark-third'>
                                                <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Rank</th>
                                                <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Participant</th>
                                                <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Score</th>
                                                <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Solved</th>
                                                <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Penalty</th>
                                                <th className='text-left py-3 px-4 text-leetcode-dark-muted font-semibold'>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contestLeaders.map((leader) => (
                                                <tr
                                                    key={leader.rank}
                                                    className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-background/50 transition-colors'
                                                >
                                                    <td className='py-3 px-4'>
                                                        <div className='flex items-center gap-2'>
                                                            {getRankIcon(leader.rank)}
                                                            <span className='text-leetcode-dark-text font-bold'>{leader.rank}</span>
                                                        </div>
                                                    </td>
                                                    <td className='py-3 px-4'>
                                                        <div className='flex items-center gap-2'>
                                                            <User className='h-4 w-4 text-leetcode-dark-muted' />
                                                            <span className='text-blue-400 font-semibold hover:text-blue-300 cursor-pointer'>
                                                                {leader.username}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='py-3 px-4'>
                                                        <span className='text-green-400 font-bold'>{leader.score}</span>
                                                    </td>
                                                    <td className='py-3 px-4'>
                                                        <span className='text-leetcode-dark-text font-semibold'>{leader.solved}/4</span>
                                                    </td>
                                                    <td className='py-3 px-4'>
                                                        <span className='text-red-400'>{leader.penalty}</span>
                                                    </td>
                                                    <td className='py-3 px-4'>
                                                        <span className='text-leetcode-dark-text'>{leader.time}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {activeTab === 'global' && (
                        <div className='flex justify-between items-center mt-6 pt-4 border-t border-leetcode-dark-third'>
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1 || isLoading}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border ${currentPage === 1 || isLoading
                                        ? 'bg-leetcode-dark-background border-leetcode-dark-third text-leetcode-dark-muted cursor-not-allowed'
                                        : 'bg-leetcode-dark-background border-leetcode-dark-third text-leetcode-dark-text hover:border-blue-500/50'
                                    }`}
                            >
                                <ChevronLeft className='h-4 w-4' />
                                <span>Previous</span>
                            </button>

                            <div className='flex items-center gap-2'>
                                <span className='text-leetcode-dark-muted'>Page</span>
                                <span className='text-leetcode-dark-text font-semibold'>{currentPage}</span>
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={globalLeaders.length < itemsPerPage || isLoading}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border ${globalLeaders.length < itemsPerPage || isLoading
                                        ? 'bg-leetcode-dark-background border-leetcode-dark-third text-leetcode-dark-muted cursor-not-allowed'
                                        : 'bg-leetcode-dark-background border-leetcode-dark-third text-leetcode-dark-text hover:border-blue-500/50'
                                    }`}
                            >
                                <span>Next</span>
                                <ChevronRight className='h-4 w-4' />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard