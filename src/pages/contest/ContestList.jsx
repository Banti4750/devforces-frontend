import { Trophy, Calendar, Clock, Users, Award } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContestList = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [allContests, setAllContest] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});
    const [timers, setTimers] = useState({});
    const navigate = useNavigate()

    // Calculate time remaining until contest start
    const calculateTimeRemaining = (startTime) => {
        const now = new Date();
        const contestStart = new Date(startTime);
        const diff = contestStart - now;

        if (diff <= 0) {
            return { expired: true, display: 'Started' };
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
            return { expired: false, display: `${days}d ${hours}h ${minutes}m ${seconds}s` };
        } else if (hours > 0) {
            return { expired: false, display: `${hours}h ${minutes}m ${seconds}s` };
        } else {
            return { expired: false, display: `${minutes}m ${seconds}s` };
        }
    };

    // Update timers every second
    useEffect(() => {
        const updateTimers = () => {
            const newTimers = {};
            allContests.forEach(contest => {
                if (contest.status === 'upcoming' && contest.start) {
                    newTimers[contest.id] = calculateTimeRemaining(contest.start);
                }
            });
            setTimers(newTimers);
        };

        updateTimers();
        const interval = setInterval(updateTimers, 1000);

        return () => clearInterval(interval);
    }, [allContests]);

    // fetch all contests
    async function fetchContests() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contests`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAllContest(data);

        } catch (err) {
            console.log('Error fetching contests: ' + err.message);
            toast.error('Failed to fetch contests');
        }
    }

    // register for contest
    async function handleRegister(contestId) {
        setLoadingStates(prev => ({ ...prev, [contestId]: true }));
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contest-registration`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contestId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                fetchContests();
                toast.success('Successfully registered for contest!');
            } else {
                toast.error(data.message || 'Registration failed');
            }

        } catch (err) {
            console.log('Error registering for contest: ' + err.message);
            toast.error('Registration failed. Please try again.');
        } finally {
            setLoadingStates(prev => ({ ...prev, [contestId]: false }));
        }
    }

    // unregister from contest
    async function handleUnregister(contestId, registrationId) {
        if (!registrationId) {
            toast.error('Registration ID not found');
            return;
        }

        setLoadingStates(prev => ({ ...prev, [contestId]: true }));
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contest-registration`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: registrationId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                fetchContests();
                toast.success('Successfully unregistered from contest!');
            } else {
                toast.error(data.message || 'Unregistration failed');
            }

        } catch (err) {
            console.log('Error unregistering from contest: ' + err.message);
            toast.error('Unregistration failed. Please try again.');
        } finally {
            setLoadingStates(prev => ({ ...prev, [contestId]: false }));
        }
    }

    useEffect(() => {
        fetchContests();
    }, [])

    const getStatusBadge = (contest) => {
        const isLoading = loadingStates[contest.id];
        if (contest.status === "upcoming") {
            return (
                <button
                    onClick={() => handleRegister(contest.id)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-green-600/20 text-green-400 text-xs rounded-md border border-green-600/30 hover:bg-green-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {isLoading ? "Loading..." : "Register"}
                </button>
            );
        }

        if (contest.status === "running") {
            return (
                <span className="px-3 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-md border border-orange-600/30 font-medium">
                    Running
                </span>
            );
        }

        if (contest.status === "finished") {
            return (
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-md border border-blue-600/30 font-medium">
                    Results
                </span>
            );
        }

        return (
            <span className="px-3 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-md border border-gray-600/30 font-medium">
                Unknown
            </span>
        );
    };

    const getActionButton = (contest) => {
        const isRegistered = contest.isRegistered;
        const isLoading = loadingStates[contest.id];

        if (!isRegistered) {
            return getStatusBadge(contest);
        }

        if (contest.status === "upcoming") {
            return (
                <button
                    onClick={() => handleUnregister(contest.id, contest.registrationId)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-red-600/20 text-red-400 text-xs rounded-md border border-red-600/30 hover:bg-red-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {isLoading ? "Loading..." : "Unregister"}
                </button>
            );
        }

        if (contest.status === "running") {
            return (
                <button className="px-3 py-1 bg-green-600/20 text-green-400 text-xs rounded-md border border-green-600/30 hover:bg-green-600/30 transition-colors font-medium">
                    View Contest
                </button>
            );
        }

        if (contest.status === "finished") {
            return (
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-md border border-blue-600/30 font-medium">
                    View Results
                </span>
            );
        }

        return getStatusBadge(contest);
    };

    // Timer component
    const ContestTimer = ({ contest }) => {
        const timer = timers[contest.id];

        if (contest.status !== 'upcoming' || !timer) {
            return <span className="text-leetcode-dark-muted text-xs">-</span>;
        }

        if (timer.expired) {
            return (
                <span className="text-red-400 text-xs flex items-center gap-1 justify-center font-medium">
                    <Clock className="h-3 w-3" />
                    {timer.display}
                </span>
            );
        }

        return (
            <span className="text-blue-400 text-xs flex items-center gap-1 justify-center font-medium">
                <Clock className="h-3 w-3" />
                {timer.display}
            </span>
        );
    };

    const getFilteredContests = () => {
        switch (activeTab) {
            case 'upcoming':
                return allContests.filter(contest => contest.status === 'upcoming');
            case 'past':
                return allContests.filter(contest => contest.status === 'completed');
            case 'running':
                return allContests.filter(contest => contest.status === 'live');
            default:
                return [];
        }
    };

    const currentContests = getFilteredContests();

    return (
        <div className='bg-leetcode-dark-background min-h-screen'>
            {/* Main container */}
            <div className='container mx-auto px-4 py-6 max-w-6xl'>
                <div className='flex items-center gap-2 mb-2'>
                    <Trophy className='h-7 w-7 text-orange-400' />
                    <h1 className='text-leetcode-dark-text text-3xl font-bold'>Contests</h1>
                </div>
                <p className='text-leetcode-dark-muted mb-6 text-lg'>
                    Compete in coding challenges and climb the leaderboard
                </p>

                <div className='bg-leetcode-dark-sidebar rounded-lg p-6 border border-leetcode-dark-third mb-6'>
                    {/* Navigation tabs */}
                    <div className='border border-leetcode-dark-third rounded-xl inline-flex mb-6'>
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-6 py-3 m-1 w-32 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'upcoming'
                                    ? 'bg-leetcode-dark-background text-leetcode-dark-text shadow-lg'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text hover:bg-leetcode-dark-background/50'
                                }`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setActiveTab('running')}
                            className={`px-6 py-3 m-1 w-32 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'running'
                                    ? 'bg-leetcode-dark-background text-leetcode-dark-text shadow-lg'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text hover:bg-leetcode-dark-background/50'
                                }`}
                        >
                            Running
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-6 py-3 m-1 w-32 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'past'
                                    ? 'bg-leetcode-dark-background text-leetcode-dark-text shadow-lg'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text hover:bg-leetcode-dark-background/50'
                                }`}
                        >
                            Past
                        </button>
                    </div>

                    {/* Contest table */}
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-leetcode-dark-third'>
                                    <th className='py-3 px-4 text-leetcode-dark-muted font-semibold text-left text-sm'>
                                        Name
                                    </th>
                                    <th className='py-3 px-4 text-leetcode-dark-muted font-semibold text-left text-sm'>
                                        Writers
                                    </th>
                                    <th className='py-3 px-4 text-leetcode-dark-muted font-semibold text-center text-sm'>
                                        Start
                                    </th>
                                    <th className='py-3 px-4 text-leetcode-dark-muted font-semibold text-center text-sm'>
                                        Length
                                    </th>
                                    <th className='py-3 px-4 text-leetcode-dark-muted font-semibold text-center text-sm'>
                                        Participants
                                    </th>
                                    <th className='py-3 px-4 text-leetcode-dark-muted font-semibold text-center text-sm'>
                                        Timer
                                    </th>
                                    <th className='py-3 px-4 text-leetcode-dark-muted font-semibold text-center text-sm'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentContests.length > 0 ? (
                                    currentContests.map((contest, index) => (
                                        <tr
                                            key={`${contest.id}-${index}`}
                                            className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-background/50 transition-colors'
                                        >
                                            <td className='py-3 px-4'>
                                                <span
                                                    className='text-leetcode-dark-text hover:text-blue-400 transition-colors cursor-pointer font-medium'
                                                    onClick={() => {
                                                        if (contest.status === 'live') {
                                                            navigate(`/contest/${contest.id}`);
                                                        }
                                                    }}
                                                >
                                                    {contest.name}
                                                </span>
                                            </td>
                                            <td className='py-3 px-4'>
                                                <div className='flex flex-wrap gap-1'>
                                                    {contest.writers?.split(', ').map((writer, idx) => (
                                                        <span
                                                            key={idx}
                                                            className='text-blue-400 hover:text-blue-300 cursor-pointer text-sm'
                                                        >
                                                            {writer}{idx < contest.writers.split(', ').length - 1 ? ',' : ''}
                                                        </span>
                                                    )) || <span className='text-leetcode-dark-muted text-sm'>N/A</span>}
                                                </div>
                                            </td>
                                            <td className='py-3 px-4 text-center text-leetcode-dark-text text-sm'>
                                                {contest.start || 'N/A'}
                                            </td>
                                            <td className='py-3 px-4 text-center'>
                                                <span className='text-leetcode-dark-text text-sm font-medium'>
                                                    {contest.length || 'N/A'}
                                                </span>
                                            </td>
                                            <td className='py-3 px-4 text-center'>
                                                <div className='flex items-center justify-center gap-1'>
                                                    <Users className='h-3 w-3 text-leetcode-dark-muted' />
                                                    <span className='text-leetcode-dark-text text-sm font-medium'>
                                                        {contest.participants || '0'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4 text-center'>
                                                <ContestTimer contest={contest} />
                                            </td>
                                            <td className='py-3 px-4 text-center'>
                                                {getActionButton(contest)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-8 text-center text-leetcode-dark-muted">
                                            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <div className="text-lg mb-2">No {activeTab} contests found</div>
                                            <div className="text-sm">Check back later for new contests</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6 hover:border-orange-500/50 transition-colors'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-orange-600/20 rounded-lg'>
                                <Trophy className='h-6 w-6 text-orange-400' />
                            </div>
                            <h3 className='text-leetcode-dark-text font-semibold text-lg'>Contest Rules</h3>
                        </div>
                        <ul className='text-leetcode-dark-text text-sm space-y-2'>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-orange-400 rounded-full'></div>
                                Contests are typically 2-3 hours long
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-orange-400 rounded-full'></div>
                                Rating changes are applied after system testing
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-orange-400 rounded-full'></div>
                                Div. 1 contests are for experienced participants
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-orange-400 rounded-full'></div>
                                Educational rounds focus on learning
                            </li>
                        </ul>
                    </div>

                    <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6 hover:border-blue-500/50 transition-colors'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-blue-600/20 rounded-lg'>
                                <Calendar className='h-6 w-6 text-blue-400' />
                            </div>
                            <h3 className='text-leetcode-dark-text font-semibold text-lg'>Contest Schedule</h3>
                        </div>
                        <ul className='text-leetcode-dark-text text-sm space-y-2'>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                                Regular rounds: 2-3 times per week
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                                Educational rounds: Weekly
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                                Global rounds: Monthly
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                                All contests start at 17:35 MSK
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestList;