import React from 'react'
import Problem from './Card/Problem'
import Progress from './Card/Progress'
import RecentActivity from './Card/RecentActivity'
import TopDeveloper from './Card/TopDeveloper'
import UpcomingContest from './Card/UpcomingContest'

const Problempage = () => {
    return (
        <div className='bg-leetcode-dark-background min-h-screen'>
            {/* Main container */}
            <div className='container mx-auto px-4 py-6 max-w-3/4'>
                {/* Grid layout */}
                <div className='grid grid-cols-1 lg:grid-cols-9 gap-6 h-full'>
                    {/* Problem section - takes 6/9 columns on large screens */}
                    <div className='lg:col-span-6'>
                        <div className='bg-leetcode-dark-sidebar rounded-lg p-6 h-full'>
                            <Problem />
                        </div>
                    </div>

                    {/* Progress section - takes 3/9 columns on large screens */}
                    <div className='lg:col-span-3'>
                        <div className='rounded-lg  h-full'>
                            <div className='flex flex-col gap-6'>
                                <Progress />
                                <RecentActivity />
                                <TopDeveloper />
                                <UpcomingContest />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Problempage