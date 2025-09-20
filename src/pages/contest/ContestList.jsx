import { Trophy, Calendar } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ContestList = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [allContests, setAllContest] = useState([]);

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
        }
    }

    useEffect(() => {
        fetchContests()
    }, [])


    const getStatusBadge = (status) => {
        if (status === 'upcoming') {
            return (
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-md border border-green-600/30">
                    Register
                </span>
            );
        } else {
            return (
                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-md border border-blue-600/30">
                    Results
                </span>
            );
        }
    };


    const currentContests = activeTab === 'upcoming'
        ? allContests.filter(contest => contest.status === 'upcoming')
        : allContests.filter(contest => contest.status === 'finished');

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
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentContests.map((contest, index) => (
                                        <tr
                                            key={`${contest.id}-${index}`}
                                            className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-third/30 transition-colors cursor-pointer'
                                        >
                                            <td className='p-3'>
                                                <span className='text-leetcode-dark-text hover:text-leetcode-dark-text/80 transition-colors'>
                                                    {contest.name}
                                                </span>
                                            </td>
                                            <td className='p-3 text-center'>
                                                <div className='flex flex-wrap gap-1 justify-center'>
                                                    {contest.writers.split(', ').map((writer, idx) => (
                                                        <span
                                                            key={idx}
                                                            className='text-blue-400 hover:text-blue-300 cursor-pointer text-sm'
                                                        >
                                                            {writer}{idx < contest.writers.split(', ').length - 1 ? ',' : ''}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                                {contest.start}
                                            </td>
                                            <td className='p-3 text-center'>
                                                <span className='text-leetcode-dark-text text-sm font-medium'>
                                                    {contest.length}
                                                </span>
                                            </td>
                                            <td className='p-3 text-center'>
                                                <span className='text-leetcode-dark-text text-sm'>
                                                    {contest.participants}
                                                </span>
                                            </td>
                                            <td className='p-3 text-center'>
                                                {getStatusBadge(contest.status)}
                                            </td>
                                        </tr>
                                    ))}
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