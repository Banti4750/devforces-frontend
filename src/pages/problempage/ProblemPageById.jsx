import { useParams } from "react-router-dom";
import Progress from "../problem/Card/Progress";
import RecentActivity from "../problem/Card/RecentActivity";
import TopDeveloper from "../problem/Card/TopDeveloper";
import UpcomingContest from "../problem/Card/UpcomingContest";
import Problemcard from "./Problemcard";

const ProblemPageById = () => {
    const { id } = useParams(); // id from URL

    return (
        <div className='bg-leetcode-dark-background min-h-screen'>
            {/* Main container */}
            <div className='container mx-auto px-4 py-6 max-w-3/4'>
                {/* Grid layout */}
                <div className='grid grid-cols-1 lg:grid-cols-10 gap-6 h-full'>
                    {/* Problem section - takes 6/9 columns on large screens */}
                    <div className='lg:col-span-7'>
                        <div className='bg-leetcode-dark-sidebar rounded-lg p-6 h-full'>
                            <Problemcard id={id} />
                        </div>
                    </div>

                    {/* Progress section - takes 3/9 columns on large screens */}
                    <div className='lg:col-span-3'>
                        <div className='rounded-lg  h-full'>
                            <div className='flex flex-col gap-6'>
                                <Progress />
                                <RecentActivity />
                                <TopDeveloper />
                                <UpcomingContest />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemPageById;
