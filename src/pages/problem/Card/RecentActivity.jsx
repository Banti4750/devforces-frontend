import axios from "axios";
import React, { useEffect, useState } from "react";
import { Activity } from 'lucide-react';

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
        <div className="bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-leetcode-dark-third flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-leetcode-dark-text">Recent Activity</h2>
            </div>

            <div className="p-4">
                {recentActivity.length > 0 ? (
                    <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                            <div
                                key={index}
                                className="pb-3 border-b border-leetcode-dark-third last:border-0 last:pb-0"
                            >
                                <h3 className="text-leetcode-dark-text font-medium text-sm mb-1">
                                    {activity.title}
                                </h3>
                                <p className="text-leetcode-dark-muted text-xs">
                                    Solved on {activity.submittedAt}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Activity className="h-12 w-12 mx-auto mb-3 text-leetcode-dark-muted opacity-50" />
                        <p className="text-leetcode-dark-muted text-sm">No recent activity found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;