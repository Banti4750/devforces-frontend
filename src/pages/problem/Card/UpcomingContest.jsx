import React from 'react'

const UpcomingContest = () => {
    return (
        <>
            <div className='bg-leetcode-dark-sidebar flex flex-col rounded-lg h-full'>
                {/* header */}
                <div className='text-white border-b border-stone-600 p-3 px-5'>
                    <h2 className='text-xl font-semibold'>Upcoming Contest</h2>
                </div>

                <div className='p-1'>
                    <div className='flex flex-col'>
                        <div className='p-1 px-4 '>
                            <h1 className='text-leetcode-dark-text font-bold text-sm'>Devforces round 403</h1>
                            <p className='text-leetcode-dark-muted text-xs '>Tommarow 14:00 UTC</p>
                            <div className='border-b border-stone-600 mt-1' />
                        </div>
                        <div className='p-1 px-4 '>
                            <h1 className='text-leetcode-dark-text font-bold text-sm'>Devforces round 403</h1>
                            <p className='text-leetcode-dark-muted text-xs '>Tommarow 14:00 UTC</p>
                            <div className='border-b border-stone-600 mt-1' />
                        </div>
                        <div className='p-1 px-4 '>
                            <h1 className='text-leetcode-dark-text font-bold text-sm'>Devforces round 403</h1>
                            <p className='text-leetcode-dark-muted text-xs '>Tommarow 14:00 UTC</p>
                            <div className='border-b border-stone-600 mt-1' />
                        </div>
                        <div className='p-1 px-4'>
                            <h1 className='text-leetcode-dark-text font-bold text-sm'>Devforces round 403</h1>
                            <p className='text-leetcode-dark-muted text-xs '>Tommarow 14:00 UTC</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpcomingContest