import React from 'react'

const RecentActivity = () => {
    return (
        <div className='bg-leetcode-dark-sidebar flex flex-col rounded-lg h-full'>
            {/* header */}
            <div className='text-white border-b border-stone-600 p-3 px-5'>
                <h2 className='text-xl font-semibold'>Recent Activity</h2>
            </div>

            <div className='p-1'>
                <div className='flex flex-col'>
                    <div className='p-1 px-4 '>
                        <h1 className='text-leetcode-dark-text font-bold'>Two Sum Problem</h1>
                        <p className='text-leetcode-dark-muted text-xs '>Solved 2 hours ago</p>
                        <div className='border-b border-stone-600 mt-1' />
                    </div>
                    <div className='p-1 px-4 '>
                        <h1 className='text-leetcode-dark-text font-bold'>Binary Search Implementation</h1>
                        <p className='text-leetcode-dark-muted text-xs '>Solved 5 hours ago</p>
                        <div className='border-b border-stone-600 mt-1' />
                    </div>
                    <div className='p-1 px-4 '>
                        <h1 className='text-leetcode-dark-text font-bold'>Linked List Reversal</h1>
                        <p className='text-leetcode-dark-muted text-xs '>Solved 1 day ago</p>
                        <div className='border-b border-stone-600 mt-1' />
                    </div>
                    <div className='p-1 px-4'>
                        <h1 className='text-leetcode-dark-text font-bold'>Valid Parentheses</h1>
                        <p className='text-leetcode-dark-muted text-xs '>Solved 2 days ago</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentActivity