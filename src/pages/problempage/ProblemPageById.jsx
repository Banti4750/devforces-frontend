import { useParams } from "react-router-dom";
import Progress from "../problem/Card/Progress";
import RecentActivity from "../problem/Card/RecentActivity";
import TopDeveloper from "../problem/Card/TopDeveloper";
import UpcomingContest from "../problem/Card/UpcomingContest";
import Problemcard from "./Problemcard";

const ProblemPageById = () => {
    const { id } = useParams();

    return (
        <div className='bg-leetcode-dark-background min-h-screen'>
            <div className='container mx-auto px-4 py-6 max-w-7xl'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                    <div className='lg:col-span-8'>
                        <Problemcard id={id} />
                    </div>
                    <div className='lg:col-span-4'>
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
    );
};

export default ProblemPageById;