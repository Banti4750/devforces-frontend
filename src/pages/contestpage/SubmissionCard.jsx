import React from 'react'
import { User, Clock, Code } from 'lucide-react'

const SubmissionCard = () => {

    const submissions = [
        {
            id: "21",
            timeOfSubmission: new Date().toLocaleString(),
            who: "banti",
            problem: "auth setup",
            lang: "Nodejs",
        },
        {
            id: "22",
            timeOfSubmission: new Date(Date.now() - 300000).toLocaleString(), // 5 minutes ago
            who: "alice",
            problem: "jwt base login",
            lang: "Python",
        },
        {
            id: "23",
            timeOfSubmission: new Date(Date.now() - 600000).toLocaleString(), // 10 minutes ago
            who: "john",
            problem: "setup middleware",
            lang: "Java",
        },
        {
            id: "24",
            timeOfSubmission: new Date(Date.now() - 900000).toLocaleString(), // 15 minutes ago
            who: "sarah",
            problem: "write schema for user",
            lang: "JavaScript",
        },
        {
            id: "22",
            timeOfSubmission: new Date(Date.now() - 300000).toLocaleString(), // 5 minutes ago
            who: "alice",
            problem: "jwt base login",
            lang: "Python",
        },
        {
            id: "23",
            timeOfSubmission: new Date(Date.now() - 600000).toLocaleString(), // 10 minutes ago
            who: "john",
            problem: "setup middleware",
            lang: "Java",
        },
        {
            id: "24",
            timeOfSubmission: new Date(Date.now() - 900000).toLocaleString(), // 15 minutes ago
            who: "sarah",
            problem: "write schema for user",
            lang: "JavaScript",
        },
        {
            id: "22",
            timeOfSubmission: new Date(Date.now() - 300000).toLocaleString(), // 5 minutes ago
            who: "alice",
            problem: "jwt base login",
            lang: "Python",
        },
        {
            id: "23",
            timeOfSubmission: new Date(Date.now() - 600000).toLocaleString(), // 10 minutes ago
            who: "john",
            problem: "setup middleware",
            lang: "Java",
        },
        {
            id: "24",
            timeOfSubmission: new Date(Date.now() - 900000).toLocaleString(), // 15 minutes ago
            who: "sarah",
            problem: "write schema for user",
            lang: "JavaScript",
        },
    ]

    return (
        <>
            <div className='border border-leetcode-dark-third mt-2 p-1 rounded-lg flex-1'>
                <div className='mt-4 overflow-x-auto'>
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr className='bg-leetcode-dark-third border border-leetcode-dark-third rounded-xl'>
                                <th className='p-3 text-leetcode-dark-text font-medium text-sm text-left'>
                                    #
                                </th>
                                <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                    Problem
                                </th>
                                <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                    When
                                </th>
                                <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                    Who
                                </th>
                                <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                    Lang
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.length > 0 ? (
                                submissions.map((submission, index) => (
                                    <tr
                                        key={`${submission.id}-${index}`}
                                        className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-third/30 transition-colors cursor-pointer'
                                    >
                                        <td className='p-3 text-left text-leetcode-dark-muted text-sm'>
                                            {submission.id || 'N/A'}
                                        </td>
                                        <td className='p-3' >
                                            <span className='text-leetcode-dark-text text-left hover:text-leetcode-dark-text/80 transition-colors'>
                                                {submission.problem}
                                            </span>
                                        </td>
                                        <td className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <Clock width={14} height={14} />
                                                <p>{submission.timeOfSubmission || 'N/A'}</p>
                                            </div>
                                        </td>
                                        <td className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <User width={14} height={14} />
                                                <p>{submission.who || 'N/A'}</p>
                                            </div>
                                        </td>
                                        <td className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <Code width={14} height={14} />
                                                <p>{submission.lang || 'N/A'}</p>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-leetcode-dark-muted">
                                        No submissions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default SubmissionCard