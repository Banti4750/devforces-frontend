import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Progress = () => {

    const [progressData, setProgressData] = useState([]);

    async function fetchProgress() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/progress`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            console.log(response.data)
            if (response.data.success === true) {
                setProgressData(response.data)
            }

        } catch (error) {
            console.log("error while fetching your progress")
        }
    }

    useEffect(() => {
        fetchProgress()
    }, [])
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
                            <h1 className='text-leetcode-dark-text text-xl font-bold '>{progressData.easy}</h1>
                            <p className='text-leetcode-dark-muted text-sm'>Easy Problems</p>
                        </div>

                        <div className='bg-leetcode-dark-third rounded-lg p-4 flex-1 text-center'>
                            <h1 className='text-leetcode-dark-text text-xl font-bold '>{progressData.medium}</h1>
                            <p className='text-leetcode-dark-muted text-sm'>Medium Problems</p>
                        </div>
                    </div>

                    <div className='flex flex-row space-x-4'>
                        <div className='bg-leetcode-dark-third rounded-lg p-4 flex-1 text-center'>
                            <h1 className='text-leetcode-dark-text text-xl font-bold'>{progressData.hard}</h1>
                            <p className='text-leetcode-dark-muted text-sm'>Medium Problems</p>
                        </div>

                        <div className='bg-leetcode-dark-third rounded-lg p-4 flex-1 text-center'>
                            <h1 className='text-leetcode-dark-text text-xl font-bold'>{progressData.maxRank}</h1>
                            <p className='text-leetcode-dark-muted text-sm'>Max Rank</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progress