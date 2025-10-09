import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'

const FaqForm = ({ onClose }) => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch FAQs from backend when component mounts
    const fetchFaqs = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/faq`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setFaqs(response.data.faqs || []);
            } else {
                toast.error("Failed to load FAQs!");
            }
        } catch (error) {
            console.error("Error fetching FAQs:", error);
            toast.error("Something went wrong while loading FAQs!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    return (
        <div className="space-y-4 relative">
            <button
                onClick={onClose}
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
            >
                <X size={20} />
            </button>

            {/* <h2 className="text-white text-lg font-semibold">Frequently Asked Questions</h2> */}

            {loading ? (
                <p className="text-gray-400">Loading FAQs...</p>
            ) : faqs.length === 0 ? (
                <p className="text-gray-400">No FAQs available right now.</p>
            ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-leetcode-dark-third rounded-lg p-4">
                            <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                            <p className="text-gray-300 text-sm">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FaqForm;
