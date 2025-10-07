import React, { useState } from 'react'
import { Github, Twitter, MessageSquare, HelpCircle, FileQuestion, X } from 'lucide-react'
import FeedbackForm from './FeedbackForm';
import QueryForm from './QueryForm';
import FaqForm from './FaqForm';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-leetcode-dark-sidebar rounded-lg w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

const Footer = () => {
    const [toggleFeedback, setToggleFeedback] = useState(false);
    const [toggleQuery, setToggleQuery] = useState(false);
    const [toggleFaq, setToggleFaq] = useState(false);

    return (
        <>
            <footer className="bg-leetcode-dark-background border-t border-stone-600 h-16 w-full">
                <div className='flex justify-between items-center h-full px-6'>
                    <div className='flex gap-6 items-center'>
                        <p className='text-sm text-gray-400'>All rights Reserved @Devforces</p>
                        <a href="https://github.com" className='text-gray-400 hover:text-white transition-colors' aria-label="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="https://twitter.com" className='text-gray-400 hover:text-white transition-colors' aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                    </div>
                    <div className='flex gap-6 items-center'>
                        <button className='flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors' onClick={() => setToggleFeedback(true)}>
                            <MessageSquare size={16} />
                            Feedback
                        </button>
                        <button className='flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors' onClick={() => setToggleQuery(true)}>
                            <HelpCircle size={16} />
                            Query
                        </button>
                        <button className='flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors' onClick={() => setToggleFaq(true)}>
                            <FileQuestion size={16} />
                            FAQ
                        </button>
                    </div>
                </div>
            </footer>

            <Modal isOpen={toggleFeedback} onClose={() => setToggleFeedback(false)} title="Share Your Feedback">
                <FeedbackForm onClose={() => setToggleFeedback(false)} />
            </Modal>

            <Modal isOpen={toggleQuery} onClose={() => setToggleQuery(false)} title="Submit a Query">
                <QueryForm onClose={() => setToggleQuery(false)} />
            </Modal>

            <Modal isOpen={toggleFaq} onClose={() => setToggleFaq(false)} title="Frequently Asked Questions">
                <FaqForm onClose={() => setToggleFaq(false)} />
            </Modal>
        </>
    )
}

export default Footer