import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Progress = () => {
    const [progressData, setProgressData] = useState({});

    async function fetchProgress() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/progress`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            if (response.data.success === true) {
                setProgressData(response.data);
            }
        } catch (error) {
            console.log("error while fetching your progress");
        }
    }

    useEffect(() => {
        fetchProgress();
    }, []);

    return (
        <div className='bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg overflow-hidden'>
            <div className='px-6 py-4 border-b border-leetcode-dark-third'>
                <h2 className='text-lg font-semibold text-leetcode-dark-text'>Your Progress</h2>
            </div>

            <div className='p-6'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-leetcode-dark-background rounded-lg p-4 border border-leetcode-dark-third text-center'>
                        <h1 className='text-green-400 text-2xl font-bold'>{progressData.easy || 0}</h1>
                        <p className='text-leetcode-dark-muted text-xs mt-1'>Easy Problems</p>
                    </div>

                    <div className='bg-leetcode-dark-background rounded-lg p-4 border border-leetcode-dark-third text-center'>
                        <h1 className='text-yellow-400 text-2xl font-bold'>{progressData.medium || 0}</h1>
                        <p className='text-leetcode-dark-muted text-xs mt-1'>Medium Problems</p>
                    </div>

                    <div className='bg-leetcode-dark-background rounded-lg p-4 border border-leetcode-dark-third text-center'>
                        <h1 className='text-red-400 text-2xl font-bold'>{progressData.hard || 0}</h1>
                        <p className='text-leetcode-dark-muted text-xs mt-1'>Hard Problems</p>
                    </div>

                    <div className='bg-leetcode-dark-background rounded-lg p-4 border border-leetcode-dark-third text-center'>
                        <h1 className='text-blue-400 text-2xl font-bold'>{progressData.maxRank || 0}</h1>
                        <p className='text-leetcode-dark-muted text-xs mt-1'>Max Rank</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;