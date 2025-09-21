import React from 'react'
import { User, Trophy, Award, Medal } from 'lucide-react'

const StandingCard = () => {

    const standings = [
        {
            rank: 1,
            who: "alice",
            total: 7,
            problems: {
                A: { solved: true, attempts: 1, time: "00:05:23" },
                B: { solved: true, attempts: 2, time: "00:12:45" },
                C: { solved: true, attempts: 1, time: "00:18:30" },
                D: { solved: true, attempts: 3, time: "00:25:12" },
                E: { solved: true, attempts: 1, time: "00:32:08" },
                F: { solved: true, attempts: 2, time: "00:45:22" },
                G: { solved: true, attempts: 1, time: "00:52:15" }
            }
        },
        {
            rank: 2,
            who: "banti",
            total: 6,
            problems: {
                A: { solved: true, attempts: 1, time: "00:03:15" },
                B: { solved: true, attempts: 1, time: "00:08:30" },
                C: { solved: true, attempts: 2, time: "00:15:45" },
                D: { solved: true, attempts: 1, time: "00:22:18" },
                E: { solved: true, attempts: 4, time: "00:35:50" },
                F: { solved: true, attempts: 1, time: "00:41:33" },
                G: { solved: false, attempts: 3, time: "-" }
            }
        },
        {
            rank: 3,
            who: "john",
            total: 5,
            problems: {
                A: { solved: true, attempts: 2, time: "00:07:12" },
                B: { solved: true, attempts: 1, time: "00:14:28" },
                C: { solved: true, attempts: 1, time: "00:19:45" },
                D: { solved: true, attempts: 2, time: "00:28:33" },
                E: { solved: true, attempts: 1, time: "00:38:15" },
                F: { solved: false, attempts: 2, time: "-" },
                G: { solved: false, attempts: 1, time: "-" }
            }
        },
        {
            rank: 4,
            who: "sarah",
            total: 4,
            problems: {
                A: { solved: true, attempts: 1, time: "00:04:45" },
                B: { solved: true, attempts: 3, time: "00:16:20" },
                C: { solved: true, attempts: 1, time: "00:21:55" },
                D: { solved: true, attempts: 1, time: "00:29:40" },
                E: { solved: false, attempts: 2, time: "-" },
                F: { solved: false, attempts: 1, time: "-" },
                G: { solved: false, attempts: 0, time: "-" }
            }
        },
        {
            rank: 5,
            who: "mike",
            total: 3,
            problems: {
                A: { solved: true, attempts: 1, time: "00:06:30" },
                B: { solved: true, attempts: 2, time: "00:18:15" },
                C: { solved: true, attempts: 4, time: "00:35:22" },
                D: { solved: false, attempts: 3, time: "-" },
                E: { solved: false, attempts: 1, time: "-" },
                F: { solved: false, attempts: 0, time: "-" },
                G: { solved: false, attempts: 0, time: "-" }
            }
        }
    ]

    const problemKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Trophy className="w-4 h-4 text-yellow-400" />
            case 2: return <Award className="w-4 h-4 text-gray-400" />
            case 3: return <Medal className="w-4 h-4 text-orange-400" />
            default: return null
        }
    }

    const getProblemDisplay = (problem) => {
        if (problem.solved) {
            return (
                <div className="text-center">
                    <div className="text-leetcode-dark-muted text-xs">{problem.attempts}</div>
                    <div className="text-leetcode-dark-muted text-xs">{problem.time}</div>
                </div>
            )
        } else if (problem.attempts > 0) {
            return (
                <div className="text-center">
                    <div className="text-leetcode-dark-muted text-xs">{problem.attempts}</div>
                </div>
            )
        } else {
            return (
                <div className="text-center text-leetcode-dark-muted text-xs">
                    -
                </div>
            )
        }
    }

    return (
        <>
            <div className='border border-leetcode-dark-third mt-2 p-1 rounded-lg flex-1'>
                <div className='mt-4 overflow-x-auto'>
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr className='bg-leetcode-dark-third border border-leetcode-dark-third rounded-xl'>
                                <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                    #
                                </th>
                                <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                    Who
                                </th>
                                <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                    =
                                </th>
                                {problemKeys.map(key => (
                                    <th key={key} className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {standings.length > 0 ? (
                                standings.map((standing, index) => (
                                    <tr
                                        key={`${standing.rank}-${index}`}
                                        className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-third/30 transition-colors'
                                    >
                                        <td className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                            <div className='flex items-center justify-center gap-1'>
                                                {getRankIcon(standing.rank)}
                                                <span>{standing.rank}</span>
                                            </div>
                                        </td>
                                        <td className='p-3 text-center text-leetcode-dark-text text-sm'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <User width={14} height={14} />
                                                <span>{standing.who}</span>
                                            </div>
                                        </td>
                                        <td className='p-3 text-center text-leetcode-dark-text font-medium text-sm'>
                                            {standing.total}
                                        </td>
                                        {problemKeys.map(key => (
                                            <td key={key} className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                                {getProblemDisplay(standing.problems[key])}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3 + problemKeys.length} className="p-8 text-center text-leetcode-dark-muted">
                                        No standings found
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

export default StandingCard