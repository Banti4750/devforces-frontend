import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProblemCard = ({ id }) => {
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/problems/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust token retrieval as needed
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch problem');
                }

                const data = await response.json();
                setProblem(data.problem);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'EASY':
                return 'text-[#00AF9B]';
            case 'MEDIUM':
                return 'text-[#FFB800]';
            case 'HARD':
                return 'text-[#FF375F]';
            default:
                return 'text-[#A0AEC0]';
        }
    };

    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'cpp', label: 'C++' },
        { value: 'sql', label: 'SQL' },
        { value: 'prisma', label: 'Prisma Schema' }
    ];

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        // Read the file as text
        const fileText = await selectedFile.text();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/submission`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    problemId: problem.id,
                    code: fileText, // send code as string
                    language: selectedLanguage
                })
            });

            if (!response.ok) {
                toast.error("Failed to submit solution");
            } else {
                toast.success("Solution submitted");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };



    if (loading) {
        return (
            <div className="bg-[#262626] border border-[#404040] rounded-lg p-6">
                <div className="text-[#A0AEC0]">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#262626] border border-[#404040] rounded-lg p-6">
                <div className="text-[#FF375F]">Error: {error}</div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="bg-[#262626] border border-[#404040] rounded-lg p-6">
                <div className="text-[#A0AEC0]">Problem not found</div>
            </div>
        );
    }

    return (
        <div className=" min-h-screen p-2">
            <div className="max-w-4xl mx-auto bg-[#262626] border border-[#404040] rounded-lg overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#404040]">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-[#FFFFFF]">{problem.title}</h1>
                        <span className={`px-3 py-1 rounded text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                        </span>
                    </div>
                    <div className=" flex items-center justify-between">
                        {problem.tags && problem.tags.length > 0 && (
                            <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {problem.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-[#404040] text-[#FFA116] rounded-full text-xs font-medium"
                                        >
                                            # {tag.tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Author Info */}
                        <div className="flex items-center text-sm text-[#A0AEC0]">
                            <span>By: </span>
                            <span className="ml-1 text-[#FFFFFF]">
                                {problem.author?.name || 'Anonymous'}
                            </span>
                            {problem.author?.isVerified && (
                                <span className="ml-1 text-[#00AF9B]">✓</span>
                            )}
                            {problem.author?.country && (
                                <span className="ml-2 text-[#A0AEC0]">({problem.author.country})</span>
                            )}
                        </div>
                    </div>

                    {/* Tags */}

                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-[#FFFFFF] mb-3">Problem Statement</h2>
                        <p className="text-[#FFFFFF] leading-relaxed">{problem.description}</p>
                    </div>

                    {/* Technologies */}
                    {problem.technologies && problem.technologies.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-md font-semibold text-[#FFFFFF] mb-2">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {problem.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[#404040] text-[#FFFFFF] rounded text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Starter Code */}
                    {problem.starterCode && (
                        <div className="mb-6">
                            <h3 className="text-md font-semibold text-[#FFFFFF] mb-2">Starter Code</h3>
                            <div className="bg-[#1A1A1A] border border-[#404040] rounded p-4">
                                <pre className="text-[#FFFFFF] text-sm overflow-x-auto">
                                    <code>{problem.starterCode}</code>
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Test Cases */}
                    {problem.testCases && problem.testCases.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-md font-semibold text-[#FFFFFF] mb-3">Sample Test Cases</h3>
                            {problem.testCases.map((testCase, index) => (
                                <div key={testCase.id} className="mb-4 bg-[#1A1A1A] border border-[#404040] rounded p-4">
                                    <div className="text-[#FFA116] font-medium mb-2">Example {index + 1}</div>
                                    <div className="mb-2">
                                        <span className="text-[#A0AEC0] text-sm font-medium">Input: </span>
                                        <span className="text-[#FFFFFF] font-mono text-sm">{testCase.input}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-[#A0AEC0] text-sm font-medium">Expected Output: </span>
                                        <span className="text-[#FFFFFF] font-mono text-sm">{testCase.expectedOutput}</span>
                                    </div>
                                    {testCase.explanation && (
                                        <div>
                                            <span className="text-[#A0AEC0] text-sm font-medium">Explanation: </span>
                                            <span className="text-[#FFFFFF] text-sm">{testCase.explanation}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Meta Information */}
                    <div className="border-t border-[#404040] pt-4 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-[#A0AEC0]">Task Type: </span>
                                <span className="text-[#FFFFFF]">{problem.taskType}</span>
                            </div>
                            <div>
                                <span className="text-[#A0AEC0]">Created: </span>
                                <span className="text-[#FFFFFF]">
                                    {new Date(problem.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            {problem.author?.organization && (
                                <div>
                                    <span className="text-[#A0AEC0]">Organization: </span>
                                    <span className="text-[#FFFFFF]">{problem.author.organization}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submission Section */}
                <div className="px-6 py-4 border-t border-[#404040] ">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">Submit Solution</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Language Selection */}
                        <div>
                            <label className="block text-sm font-medium text-[#A0AEC0] mb-2">
                                Programming Language
                            </label>
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="w-full px-3 py-2 bg-[#262626] border border-leetcode-dark-text rounded text-[#FFFFFF] focus:outline-none focus:leetcode-dark-text"
                            >
                                {languages.map(lang => (
                                    <option key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-[#A0AEC0] mb-2">
                                Upload Solution File
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".js,.py,.java,.cpp,.sql,.prisma,.txt"
                                className="w-full px-3 py-2 bg-[#262626] border border-[#404040] rounded text-[#FFFFFF] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-leetcode-dark-third file:text-white  focus:outline-none "
                            />
                        </div>
                    </div>

                    {selectedFile && (
                        <div className="mb-4 p-3 bg-[#262626] border border-[#404040] rounded">
                            <div className="flex items-center text-sm">
                                <span className="text-[#A0AEC0]">Selected file: </span>
                                <span className="ml-2 text-[#FFFFFF] font-medium">{selectedFile.name}</span>
                                <span className="ml-2 text-[#A0AEC0]">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-leetcode-dark-third hover:bg-leetcode-dark-background text-leetcode-dark-text rounded font-medium transition-colors"
                        >
                            Submit Solution
                        </button>

                        <button className="px-4 py-2 border border-[#404040] text-[#FFFFFF]  hover:bg-leetcode-dark-background rounded transition-colors">
                            View Solutions
                        </button> *
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemCard