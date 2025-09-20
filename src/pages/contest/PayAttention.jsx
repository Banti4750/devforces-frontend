import React from 'react'

const PayAttention = () => {
    return (
        <>
            <div className='bg-leetcode-dark-sidebar  flex flex-col rounded-lg  h-full'>
                {/* header */}
                <div className=' text-white  border-b border-stone-600 p-3 px-4 '>
                    <h2 className='text-xl font-semibold'>Pay attention</h2>
                </div>

                <div className='p-4'>

                    <div className='flex flex-col space-y-4'>
                        <div className='flex justify-center items-center'>
                            <h1>Before contest</h1>
                            <h1>Codeforces</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PayAttention