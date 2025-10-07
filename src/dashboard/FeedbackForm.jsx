import React, { useState } from 'react'
import { Github, Twitter, MessageSquare, HelpCircle, FileQuestion, X, Send, Star } from 'lucide-react'

const FeedbackForm = ({ onClose }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        console.log({ feedback, rating });
        onClose();
    }

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
                    className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    rows="4"
                    placeholder="Share your feedback..."
                />
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <Send size={18} />
                Submit Feedback
            </button>
        </div>
    )
}

export default FeedbackForm