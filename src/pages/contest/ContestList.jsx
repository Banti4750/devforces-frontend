import { Trophy, Calendar, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContestList = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [allContests, setAllContest] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});
    const [timers, setTimers] = useState({}); // Store timer values for each contest
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

        updateTimers(); // Initial calculation
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

    // register for contest    fix that api
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
                // Refresh contest to get updated data
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

    // unregister from contest fix that api
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
                // Refresh registrations to get updated data
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
                    className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-md border border-green-600/30 hover:bg-green-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Loading..." : "Register"}
                </button>
            );
        }

        if (contest.status === "running") {
            return (
                <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-md border border-orange-600/30">
                    Running
                </span>
            );
        }

        if (contest.status === "finished") {
            return (
                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-md border border-blue-600/30">
                    Results
                </span>
            );
        }

        // fallback for unexpected status
        return (
            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-md border border-gray-600/30">
                Unknown
            </span>
        );
    };

    const getActionButton = (contest) => {
        const isRegistered = contest.isRegistered;
        const isLoading = loadingStates[contest.id];

        // Not registered → show status badge
        if (!isRegistered) {
            return getStatusBadge(contest);
        }

        // Registered & upcoming → allow unregister
        if (contest.status === "upcoming") {
            return (
                <button
                    onClick={() => handleUnregister(contest.id, contest.registrationId)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-red-600/20 text-red-400 text-xs rounded-md border border-red-600/30 hover:bg-red-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Loading..." : "Unregister"}
                </button>
            );
        }

        // Registered & running → View Contest
        if (contest.status === "running") {
            return (
                <button className="px-3 py-1 bg-green-600/20 text-green-400 text-xs rounded-md border border-green-600/30 hover:bg-green-600/30 transition-colors">
                    View Contest
                </button>
            );
        }

        // Registered & finished → View Results
        if (contest.status === "finished") {
            return (
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-md border border-blue-600/30">
                    View Results
                </span>
            );
        }

        // fallback
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
                <span className="text-red-400 text-xs flex items-center gap-1 justify-center">
                    <Clock className="h-3 w-3" />
                    {timer.display}
                </span>
            );
        }

        return (
            <span className="text-blue-400 text-xs flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" />
                {timer.display}
            </span>
        );
    };

    // Fixed filtering logic to handle all three tabs
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
        <>
            <div className='bg-leetcode-dark-background min-h-screen'>
                {/* Main container */}
                <div className='container mx-auto px-4 py-6 max-w-3/4'>
                    <div className='flex items-center gap-2'>
                        <Trophy className='h-6 w-6 text-orange-400' />
                        <h1 className='text-leetcode-dark-text text-2xl font-semibold'>Contest</h1>
                    </div>

                    <div className='bg-leetcode-dark-sidebar rounded-lg p-6 h-full mt-4'>
                        {/* navigation of past and latest */}
                        <div className='border border-leetcode-dark-third rounded-xl'>
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`px-4 py-2 m-1 w-24 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'upcoming'
                                    ? ' bg-leetcode-dark-background text-leetcode-dark-text'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text '
                                    }`}
                            >
                                Upcoming
                            </button>
                            <button
                                onClick={() => setActiveTab('past')}
                                className={`px-4 py-2 w-24 m-1 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'past'
                                    ? ' bg-leetcode-dark-background text-leetcode-dark-text'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text '
                                    }`}
                            >
                                Past
                            </button>
                            <button
                                onClick={() => setActiveTab('running')}
                                className={`px-4 py-2 w-24 m-1 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'running'
                                    ? ' bg-leetcode-dark-background text-leetcode-dark-text'
                                    : 'bg-leetcode-dark-sidebar text-leetcode-dark-text '
                                    }`}
                            >
                                Running
                            </button>
                        </div>

                        {/* contest table */}
                        <div className='mt-4 overflow-x-auto'>
                            <table className='w-full border-collapse'>
                                <thead>
                                    <tr className='bg-leetcode-dark-third border border-leetcode-dark-third rounded-xl'>
                                        <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                            Name
                                        </th>
                                        <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                            Writers
                                        </th>
                                        <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                            Start
                                        </th>
                                        <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                            Length
                                        </th>
                                        <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                            Participants
                                        </th>
                                        <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                            Timer
                                        </th>
                                        <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {currentContests.length > 0 ? (
                                        currentContests.map((contest, index) => (
                                            <tr
                                                key={`${contest.id}-${index}`}
                                                className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-third/30 transition-colors cursor-pointer'
                                            >
                                                <td className='p-3' onClick={() => {
                                                    if (contest.status === 'live') {
                                                        navigate(`/contest/${contest.id}`);
                                                    }
                                                }}>
                                                    <span className='text-leetcode-dark-text hover:text-leetcode-dark-text/80 transition-colors'>
                                                        {contest.name}
                                                    </span>
                                                </td>
                                                <td className='p-3 text-center'>
                                                    <div className='flex flex-wrap gap-1 justify-center'>
                                                        {contest.writers?.split(', ').map((writer, idx) => (
                                                            <span
                                                                key={idx}
                                                                className='text-blue-400 hover:text-blue-300 cursor-pointer text-sm'
                                                            >
                                                                {writer}{idx < contest.writers.split(', ').length - 1 ? ',' : ''}
                                                            </span>
                                                        )) || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                                    {contest.start || 'N/A'}
                                                </td>
                                                <td className='p-3 text-center'>
                                                    <span className='text-leetcode-dark-text text-sm font-medium'>
                                                        {contest.length || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className='p-3 text-center'>
                                                    <span className='text-leetcode-dark-text text-sm'>
                                                        {contest.participants || '0'}
                                                    </span>
                                                </td>
                                                <td className='p-3 text-center'>
                                                    <ContestTimer contest={contest} />
                                                </td>
                                                <td className='p-3 text-center'>
                                                    {getActionButton(contest)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="p-8 text-center text-leetcode-dark-muted">
                                                No {activeTab} contests found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6'>
                            <h3 className='text-leetcode-dark-text font-semibold mb-3 flex items-center gap-2'>
                                <Trophy className='h-5 w-5 text-orange-400' />
                                Contest Rules
                            </h3>
                            <ul className='text-leetcode-dark-text text-sm space-y-2'>
                                <li>• Contests are typically 2-3 hours long</li>
                                <li>• Rating changes are applied after system testing</li>
                                <li>• Div. 1 contests are for experienced participants</li>
                                <li>• Educational rounds focus on learning</li>
                            </ul>
                        </div>

                        <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6'>
                            <h3 className='text-leetcode-dark-text font-semibold mb-3 flex items-center gap-2'>
                                <Calendar className='h-5 w-5 text-blue-400' />
                                Contest Schedule
                            </h3>
                            <ul className='text-leetcode-dark-text text-sm space-y-2'>
                                <li>• Regular rounds: 2-3 times per week</li>
                                <li>• Educational rounds: Weekly</li>
                                <li>• Global rounds: Monthly</li>
                                <li>• All contests start at 17:35 MSK</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ContestList;