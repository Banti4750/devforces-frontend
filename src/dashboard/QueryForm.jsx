import React, { useState } from 'react'
import { Github, Twitter, MessageSquare, HelpCircle, FileQuestion, X, Send, Star } from 'lucide-react'

const QueryForm = ({ onClose }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        console.log({ subject, message });
        onClose();
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter subject..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    rows="4"
                    placeholder="Describe your query..."
                />
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <Send size={18} />
                Submit Query
            </button>
        </div>
    )
}

export default QueryForm