import React from 'react'

const TopDeveloper = () => {
    return (
        <>
            <div className='bg-leetcode-dark-sidebar flex flex-col rounded-lg h-full'>
                {/* header */}
                <div className='text-white border-b border-stone-600 p-3 px-5'>
                    <h2 className='text-xl font-semibold'>Top Developers</h2>
                </div>

                <div className='p-1'>
                    <div className='flex flex-col'>
                        <div className='p-1 px-4 flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-leetcode-dark-muted font-bold'>1.</h1>
                                <p className='text-leetcode-dark-text text-sm'>Banti Kumar</p>
                            </div>
                            <p className='text-leetcode-dark-muted text-sm '>2345</p>
                        </div>
                        <div className=' mx-4 border-b border-stone-600 mt-1' />
                        <div className='p-1 px-4 flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-leetcode-dark-muted font-bold'>2.</h1>
                                <p className='text-leetcode-dark-text text-sm'>Sarah Johnson</p>
                            </div>
                            <p className='text-leetcode-dark-muted  text-sm'>2300</p>
                        </div>
                        <div className=' mx-4 border-b border-stone-600 mt-1' />
                        <div className='p-1 px-4 flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-leetcode-dark-muted font-bold'>3.</h1>
                                <p className='text-leetcode-dark-text text-sm'>Alex Chen</p>
                            </div>
                            <p className='text-leetcode-dark-muted  text-sm'>2145</p>
                        </div>
                        <div className=' mx-4 border-b border-stone-600 mt-1' />
                        <div className='p-1 px-4 flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-leetcode-dark-muted font-bold'>4.</h1>
                                <p className='text-leetcode-dark-text text-sm'>Maria Garcia</p>
                            </div>
                            <p className='text-leetcode-dark-muted  text-sm'>245</p>
                        </div>
                        <div className=' mx-4 border-b border-stone-600 mt-1' />
                        <div className='p-1 px-4 flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-leetcode-dark-muted font-bold'>5.</h1>
                                <p className='text-leetcode-dark-text text-sm'>David Wilson</p>
                            </div>
                            <p className='text-leetcode-dark-muted  text-sm'>235</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopDeveloper