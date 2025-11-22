import React from 'react';
import { Calendar } from 'lucide-react';

const UpcomingContest = () => {
    const contests = [
        { title: 'Devforces Round 403', time: 'Tomorrow 14:00 UTC' },
        { title: 'Weekly Contest 375', time: 'Nov 23, 18:00 UTC' },
        { title: 'Educational Round 160', time: 'Nov 25, 15:00 UTC' },
        { title: 'Global Round 28', time: 'Nov 27, 17:35 UTC' }
    ];

    return (
        <div className='bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg overflow-hidden'>
            <div className='px-6 py-4 border-b border-leetcode-dark-third flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-purple-400' />
                <h2 className='text-lg font-semibold text-leetcode-dark-text'>Upcoming Contests</h2>
            </div>

            <div className='p-4'>
                <div className='space-y-3'>
                    {contests.map((contest, index) => (
                        <div
                            key={index}
                            className='pb-3 border-b border-leetcode-dark-third last:border-0 last:pb-0 hover:bg-leetcode-dark-background/30 -mx-2 px-2 py-2 rounded transition-colors cursor-pointer'
                        >
                            <h3 className='text-leetcode-dark-text font-medium text-sm mb-1'>
                                {contest.title}
                            </h3>
                            <div className='flex items-center gap-2'>
                                <Calendar className='h-3 w-3 text-leetcode-dark-muted' />
                                <p className='text-leetcode-dark-muted text-xs'>
                                    {contest.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingContest;