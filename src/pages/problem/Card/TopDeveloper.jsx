import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

const TopDeveloper = () => {
    const developers = [
        { rank: 1, name: 'Banti Kumar', score: 2345, icon: '🥇' },
        { rank: 2, name: 'Sarah Johnson', score: 2300, icon: '🥈' },
        { rank: 3, name: 'Alex Chen', score: 2145, icon: '🥉' },
        { rank: 4, name: 'Maria Garcia', score: 2045, icon: null },
        { rank: 5, name: 'David Wilson', score: 1985, icon: null }
    ];

    return (
        <div className='bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg overflow-hidden'>
            <div className='px-6 py-4 border-b border-leetcode-dark-third flex items-center gap-2'>
                <Trophy className='h-5 w-5 text-yellow-400' />
                <h2 className='text-lg font-semibold text-leetcode-dark-text'>Top Developers</h2>
            </div>

            <div className='p-4'>
                <div className='space-y-3'>
                    {developers.map((dev, index) => (
                        <div
                            key={index}
                            className='flex justify-between items-center pb-3 border-b border-leetcode-dark-third last:border-0 last:pb-0'
                        >
                            <div className='flex items-center gap-3'>
                                {dev.icon ? (
                                    <span className='text-lg'>{dev.icon}</span>
                                ) : (
                                    <span className='text-leetcode-dark-muted font-bold text-sm w-5'>
                                        {dev.rank}.
                                    </span>
                                )}
                                <p className='text-leetcode-dark-text text-sm font-medium'>
                                    {dev.name}
                                </p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <TrendingUp className='h-3 w-3 text-green-400' />
                                <span className='text-blue-400 text-sm font-semibold'>
                                    {dev.score}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopDeveloper;