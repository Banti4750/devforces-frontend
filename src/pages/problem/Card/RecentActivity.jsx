import axios from "axios";
import React, { useEffect, useState } from "react";

const RecentActivity = () => {
    const [recentActivity, setRecentActivity] = useState([]);

    async function fetchrecentActivity() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/dashboard/activity`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            if (response.data.success === true) {
                setRecentActivity(response.data.recentActivity);
            }
        } catch (error) {
            console.log("error while fetching your recentActivity");
        }
    }

    useEffect(() => {
        fetchrecentActivity();
    }, []);

    return (
        <div className="bg-leetcode-dark-sidebar flex flex-col rounded-lg h-full">
            {/* header */}
            <div className="text-white border-b border-stone-600 p-3 px-5">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>

            <div className="p-1">
                <div className="flex flex-col">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((activity, index) => (
                            <div key={index} className="p-1 px-4">
                                <h1 className="text-leetcode-dark-text font-bold text-sm">
                                    {activity.title}
                                </h1>
                                <p className="text-leetcode-dark-muted text-xs">
                                    Solved on {activity.submittedAt}
                                </p>
                                {index !== recentActivity.length - 1 && (
                                    <div className="border-b border-stone-600 mt-1" />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-leetcode-dark-muted text-center text-sm p-4">
                            No recent activity found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
