import React, { useState } from 'react'
import { Github, Twitter, MessageSquare, HelpCircle, FileQuestion, X, Send, Star } from 'lucide-react'
import { toast } from 'react-toastify';
import axios from 'axios';

const QueryForm = ({ onClose }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/query`,
                { subject, message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                toast.success("We’ll reach out to you shortly!");
                onClose();
            } else {
                toast.error("Error while submitting your query!");
                onClose();
            }
        } catch (error) {
            console.error("Query submission error:", error);
            toast.error("Something went wrong while submitting your query!");
        }
    };


    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full  bg-leetcode-dark-third text-white rounded-lg p-3 border border-leetcode-dark-sidebar focus:border-leetcode-dark-text focus:outline-none"
                    placeholder="Enter subject..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full  bg-leetcode-dark-third text-white rounded-lg p-3 border border-leetcode-dark-sidebar focus:border-leetcode-dark-text focus:outline-none resize-none"
                    rows="4"
                    placeholder="Describe your query..."
                />
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-leetcode-dark-background   text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <Send size={18} />
                Submit Query
            </button>
        </div>
    )
}

export default QueryForm