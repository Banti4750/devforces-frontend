import React from 'react'

const Progress = () => {
    return (
        <div className='bg-leetcode-dark-sidebar  flex flex-col rounded-lg  h-full'>
            {/* header */}
            <div className=' text-white  border-b border-stone-600 p-3 px-4 '>
                <h2 className='text-xl font-semibold'>Your Progress</h2>
            </div>

            <div className='p-4'>

                <div className='flex flex-col space-y-4'>
                    <div className='flex flex-row space-x-4'>
                        <div className='bg-leetcode-dark-third rounded-lg p-4 flex-1 text-center'>
                            <h1 className='text-leetcode-dark-text text-xl font-bold '>23</h1>
                            <p className='text-leetcode-dark-muted text-sm'>Easy Problems</p>
                        </div>

                        <div className='bg-leetcode-dark-third rounded-lg p-4 flex-1 text-center'>
                            <h1 className='text-leetcode-dark-text text-xl font-bold '>15</h1>
                            <p className='text-leetcode-dark-muted text-sm'>Attepmted</p>
                        </div>
                    </div>

                    <div className='flex flex-row space-x-4'>
                        <div className='bg-leetcode-dark-third rounded-lg p-4 flex-1 text-center'>
                            <h1 className='text-leetcode-dark-text text-xl font-bold'>8</h1>
                            <p className='text-leetcode-dark-muted text-sm'>Dev rating</p>
                        </div>

                        <div className='bg-leetcode-dark-third rounded-lg p-4 flex-1 text-center'>
                            <h1 className='text-leetcode-dark-text text-xl font-bold'>46</h1>
                            <p className='text-leetcode-dark-muted text-sm'>Total Solved</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progress