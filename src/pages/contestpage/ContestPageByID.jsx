import React from 'react'
import ContestInfo from './card/ContestInfo';
import Submission from './card/Submission';
import Standing from './card/Standing';
import ContestCard from './ContestCard';
import { useParams } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const ContestPageByID = () => {
    const { id } = useParams(); // id from URL
    return (
        <>
            <div className='bg-leetcode-dark-background min-h-screen'>
                <div className='container mx-auto px-4 py-6 max-w-3/4'>
                    <div className='flex items-center gap-2'>
                        <Trophy className='h-6 w-6 text-orange-400' />
                        <h1 className='text-leetcode-dark-text text-2xl font-semibold'>Contest</h1>
                    </div>
                    {/* Grid layout */}
                    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6 h-full mt-2'>
                        {/* Problem section - takes 6/9 columns on large screens */}
                        <div className='lg:col-span-7'>
                            <div className='bg-leetcode-dark-sidebar rounded-lg p-6 h-full'>
                                <ContestCard id={id} />
                            </div>
                        </div>

                        {/* Progress section - takes 3/9 columns on large screens */}
                        <div className='lg:col-span-3'>
                            <div className='rounded-lg  h-full'>
                                <div className='flex flex-col gap-6'>
                                    <ContestInfo />
                                    <Submission />
                                    <Standing />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContestPageByID