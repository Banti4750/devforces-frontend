import React, { useState } from 'react'
import { Github, Twitter, MessageSquare, HelpCircle, FileQuestion, X, Send, Star } from 'lucide-react'

const FaqForm = ({ onClose }) => {

    const [question, setQuestion] = useState('');

    const handleSubmit = () => {
        console.log({ question });
        onClose();
    }

    const faqs = [
        { q: "How do I reset my password?", a: "Go to settings and click 'Forgot Password' to reset." },
        { q: "How do I contact support?", a: "Use the Query form or email us at support@devforces.com" },
        { q: "What are the submission guidelines?", a: "Check our documentation for detailed submission guidelines." }
    ];

    return (
        <div className="space-y-4">
            <div className="space-y-3 max-h-64 overflow-y-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                        <p className="text-gray-300 text-sm">{faq.a}</p>
                    </div>
                ))}
            </div>
            <div className="space-y-3 border-t border-gray-600 pt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ask a Question</label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                        rows="3"
                        placeholder="Type your question..."
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Send size={18} />
                    Submit Question
                </button>
            </div>
        </div>
    )
}
export default FaqForm