import React from 'react'

const ContestInfo = () => {
    return (
        <>
            <div className='bg-leetcode-dark-sidebar  flex flex-col rounded-lg  h-full'>
                {/* header */}
                <div className=' text-white  border-b border-stone-600 p-1 px-4 '>
                    <h2 className='text-xl font-semibold text-center'>Codeforces Global Round 29 (Div. 1 + Div. 2)</h2>
                </div>
                <div className=' text-leetcode-dark-muted   p-1 px-4 '>
                    <h2 className='text-sm font-semibold text-center'>Running</h2>
                </div>
            </div>
        </>
    )
}

export default ContestInfo