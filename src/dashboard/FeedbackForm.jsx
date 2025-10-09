import React, { useState } from 'react'
import { Github, Twitter, MessageSquare, HelpCircle, FileQuestion, X, Send, Star } from 'lucide-react'
import axios from 'axios';
import { toast } from 'react-toastify';

const FeedbackForm = ({ onClose }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/feedback`,
                { feedback, rating },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success === true) {
                toast.success("Thanks for your feedback !!");
                onClose();
            } else {
                toast.error("Error while submitting feedback!");
                onClose();
            }
        } catch (error) {
            console.error("Feedback submission error:", error);
            toast.error("Something went wrong while sending feedback!");
        }
    };


    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="transition-colors"
                        >
                            <Star
                                size={24}
                                className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}
                            />
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Feedback</label>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-leetcode-dark-third text-white rounded-lg p-3 border border-leetcode-dark-sidebar focus:border-leetcode-dark-text focus:outline-none resize-none"
                    rows="4"
                    placeholder="Share your feedback..."
                />
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-leetcode-dark-background  text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <Send size={18} />
                Submit Feedback
            </button>
        </div>
    )
}

export default FeedbackForm