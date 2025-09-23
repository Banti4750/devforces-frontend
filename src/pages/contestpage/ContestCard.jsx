import { Trophy, User, Clock, FileText, Award } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SubmissionCard from './SubmissionCard';
import StandingCard from './StandingCard';
import { useNavigate } from 'react-router-dom';

const ContestCard = ({ id }) => {
    const [activeTab, setActiveTab] = useState('problems');
    const [problems, setproblems] = useState([]);
    const navigate = useNavigate();

    async function fetchProblems() {
        const token = await localStorage.getItem('token')
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contests/${id}`, {
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
            setproblems(data.problems)

        } catch (error) {
            console.log('Error fetching contest problems: ' + err.message);
            toast.error('Failed to fetch contests problems');
        }
    }

    useEffect(() => {
        fetchProblems()
    }, [])

    console.log(problems)

    const guidelines = [
        {
            icon: <Clock className="w-4 h-4" />,
            title: "Time Management",
            description: "Each problem has a specific time limit. Plan your approach before coding."
        },
        {
            icon: <FileText className="w-4 h-4" />,
            title: "Code Quality",
            description: "Write clean, well-commented code. Consider edge cases and error handling."
        },
        {
            icon: <Award className="w-4 h-4" />,
            title: "Submission Rules",
            description: "You can submit multiple times. Only your best submission will be considered."
        }
    ];

    return (
        <>
            <div className='bg-leetcode-dark-sidebar rounded-lg h-full flex flex-col'>
                {/* navigation of past and latest */}
                <div className='border border-leetcode-dark-third rounded-xl'>
                    <button
                        onClick={() => setActiveTab('problems')}
                        className={`px-4 py-2 m-1 w-28 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'problems'
                            ? ' bg-leetcode-dark-background text-leetcode-dark-text'
                            : 'bg-leetcode-dark-sidebar text-leetcode-dark-text '
                            }`}
                    >
                        Problems
                    </button>
                    <button
                        onClick={() => setActiveTab('submission')}
                        className={`px-4 py-2 w-28 m-1 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'submission'
                            ? ' bg-leetcode-dark-background text-leetcode-dark-text'
                            : 'bg-leetcode-dark-sidebar text-leetcode-dark-text '
                            }`}
                    >
                        Submission
                    </button>
                    <button
                        onClick={() => setActiveTab('standing')}
                        className={`px-4 py-2 w-28 m-1 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'standing'
                            ? ' bg-leetcode-dark-background text-leetcode-dark-text'
                            : 'bg-leetcode-dark-sidebar text-leetcode-dark-text '
                            }`}
                    >
                        Standing
                    </button>
                </div>

                {/* Main content area */}

                {activeTab === "problems" &&
                    <div>
                        <div className='border border-leetcode-dark-third mt-2 p-1 rounded-lg flex-1'>
                            <div className='mt-4 overflow-x-auto'>
                                <table className='w-full border-collapse'>
                                    <thead>
                                        <tr className='bg-leetcode-dark-third border border-leetcode-dark-third rounded-xl'>
                                            <th className='p-3 text-leetcode-dark-text font-medium text-sm text-left'>
                                                #
                                            </th>
                                            <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                                Name
                                            </th>
                                            <th className='p-3 text-leetcode-dark-text font-medium text-sm text-right'>
                                                Time Limit
                                            </th>
                                            <th className='p-3 text-leetcode-dark-text font-medium text-sm text-right'>
                                                Total Submission
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {problems.length > 0 ? (
                                            problems.map((problem, index) => (
                                                <tr
                                                    key={`${problem.id}-${index}`}
                                                    className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-third/30 transition-colors cursor-pointer'
                                                    onClick={() => navigate(`/problem/${problem.problem.id}`)}
                                                >
                                                    <td className='p-3 text-left text-leetcode-dark-muted text-sm'>
                                                        {problem.index || 'N/A'}
                                                    </td>
                                                    <td className='p-3' >
                                                        <span className='text-leetcode-dark-text text-left hover:text-leetcode-dark-text/80 transition-colors'>
                                                            {problem.problem.title}
                                                        </span>
                                                    </td>
                                                    <td className='p-3 text-center text-leetcode-dark-muted  text-sm'>
                                                        {problem.problem.timeLimit || 'N/A'}
                                                    </td>
                                                    <td className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <User width={14} height={14} />
                                                            <p> {problem.totalSubmission || 'N/A'}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="p-8 text-center text-leetcode-dark-muted">
                                                    No {activeTab} contests found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Guidelines Footer */}
                        <div className='border border-leetcode-dark-third mt-2 p-4 rounded-lg bg-leetcode-dark-sidebar'>
                            <div className='flex items-center gap-2 mb-3'>
                                <Trophy className="w-5 h-5 text-leetcode-dark-text" />
                                <h3 className='text-leetcode-dark-text font-medium text-sm'>Contest Guidelines</h3>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                {guidelines.map((guideline, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <div className='flex-shrink-0 text-leetcode-dark-muted mt-0.5'>
                                            {guideline.icon}
                                        </div>
                                        <div className='flex-1'>
                                            <h4 className='text-leetcode-dark-text font-medium text-xs mb-1'>
                                                {guideline.title}
                                            </h4>
                                            <p className='text-leetcode-dark-muted text-xs leading-relaxed'>
                                                {guideline.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='mt-4 pt-3 border-t border-leetcode-dark-third'>
                                <p className='text-leetcode-dark-muted text-xs text-center'>
                                    Good luck with the contest! Remember to read problem statements carefully and test your solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                }

                {activeTab === "submission" &&
                    <div>
                        <SubmissionCard />
                    </div>
                }

                {activeTab === "standing" &&
                    <div>
                        <StandingCard />
                    </div>
                }
            </div>
        </>
    )
}

export default ContestCard