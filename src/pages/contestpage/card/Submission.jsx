import React from 'react'

const Submission = () => {
    return (
        <>
            <div className='bg-leetcode-dark-sidebar flex flex-col rounded-lg h-full'>
                {/* header */}
                <div className='text-white border-b border-stone-600 p-3 px-5'>
                    <h2 className='text-xl font-semibold'>Submission</h2>
                </div>

                <div className='p-1'>
                    <div className='flex flex-col'>
                        <div className='p-1 px-4 '>
                            <h1 className='text-leetcode-dark-text font-bold text-sm'>Two Sum Problem</h1>
                            <p className='text-leetcode-dark-muted text-xs '>Solved 2 hours ago</p>
                            <div className='border-b border-stone-600 mt-1' />
                        </div>
                        <div className='p-1 px-4 '>
                            <h1 className='text-leetcode-dark-text font-bold text-sm'>Binary Search Implementation</h1>
                            <p className='text-leetcode-dark-muted text-xs '>Solved 5 hours ago</p>
                            <div className='border-b border-stone-600 mt-1' />
                        </div>
                        <div className='p-1 px-4 '>
                            <h1 className='text-leetcode-dark-text font-bold text-sm'>Linked List Reversal</h1>
                            <p className='text-leetcode-dark-muted text-xs '>Solved 1 day ago</p>
                            <div className='border-b border-stone-600 mt-1' />
                        </div>
                        <div className='p-1 px-4'>
                            <h1 className='text-leetcode-dark-text font-bold text-sm'>Valid Parentheses</h1>
                            <p className='text-leetcode-dark-muted text-xs '>Solved 2 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Submission