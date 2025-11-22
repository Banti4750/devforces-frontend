import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Code, Upload, FileText, Tag, Calendar, User, CheckCircle } from 'lucide-react';

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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                return 'text-green-400';
            case 'MEDIUM':
                return 'text-yellow-400';
            case 'HARD':
                return 'text-red-400';
            default:
                return 'text-leetcode-dark-muted';
        }
    };

    const getDifficultyBadge = (difficulty) => {
        const colors = {
            EASY: 'bg-green-600/20 text-green-400 border-green-600/30',
            MEDIUM: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
            HARD: 'bg-red-600/20 text-red-400 border-red-600/30',
        };

        return (
            <span className={`px-3 py-1 rounded-md text-sm font-medium border ${colors[difficulty] || 'bg-gray-600/20 text-gray-400 border-gray-600/30'}`}>
                {difficulty}
            </span>
        );
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
            toast.error('Please select a file');
            return;
        }

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
                    code: fileText,
                    language: selectedLanguage
                })
            });

            if (!response.ok) {
                toast.error("Failed to submit solution");
            } else {
                toast.success("Solution submitted successfully");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    if (loading) {
        return (
            <div className="bg-leetcode-dark-background min-h-screen">
                <div className="container mx-auto px-4 py-6 max-w-5xl">
                    <div className="bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg p-8 text-center">
                        <div className="animate-pulse text-leetcode-dark-muted">Loading problem...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-leetcode-dark-background min-h-screen">
                <div className="container mx-auto px-4 py-6 max-w-5xl">
                    <div className="bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg p-8">
                        <div className="text-red-400">Error: {error}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="bg-leetcode-dark-background min-h-screen">
                <div className="container mx-auto px-4 py-6 max-w-5xl">
                    <div className="bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg p-8 text-center">
                        <Code className="h-12 w-12 mx-auto mb-4 text-leetcode-dark-muted opacity-50" />
                        <div className="text-leetcode-dark-muted">Problem not found</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-leetcode-dark-background min-h-screen">
            <div className="container mx-auto px-4 py-6 max-w-5xl">
                <div className="bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-leetcode-dark-third">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                                <Code className="h-6 w-6 text-blue-400 flex-shrink-0" />
                                <h1 className="text-2xl font-bold text-leetcode-dark-text">{problem.title}</h1>
                            </div>
                            {getDifficultyBadge(problem.difficulty)}
                        </div>

                        {/* Tags */}
                        {problem.tags && problem.tags.length > 0 && (
                            <div className="mb-3">
                                <div className="flex flex-wrap gap-2">
                                    {problem.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded text-xs font-medium flex items-center gap-1"
                                        >
                                            <Tag className="h-3 w-3" />
                                            {tag.tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Author Info */}
                        <div className="flex items-center gap-2 text-sm text-leetcode-dark-muted">
                            <User className="h-4 w-4" />
                            <span>By: </span>
                            <span className="text-leetcode-dark-text font-medium">
                                {problem.author?.name || 'Anonymous'}
                            </span>
                            {problem.author?.isVerified && (
                                <CheckCircle className="h-4 w-4 text-green-400" />
                            )}
                            {problem.author?.country && (
                                <span className="text-leetcode-dark-muted">• {problem.author.country}</span>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-5">
                        {/* Problem Statement */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-leetcode-dark-text mb-3 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-400" />
                                Problem Statement
                            </h2>
                            <p className="text-leetcode-dark-text leading-relaxed">{problem.description}</p>
                        </div>

                        {/* Technologies */}
                        {problem.technologies && problem.technologies.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-md font-semibold text-leetcode-dark-text mb-3">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {problem.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-600/30 rounded text-sm"
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
                                <h3 className="text-md font-semibold text-leetcode-dark-text mb-3">Starter Code</h3>
                                <div className="bg-leetcode-dark-background border border-leetcode-dark-third rounded-lg p-4">
                                    <pre className="text-leetcode-dark-text text-sm overflow-x-auto">
                                        <code>{problem.starterCode}</code>
                                    </pre>
                                </div>
                            </div>
                        )}

                        {/* Test Cases */}
                        {problem.testCases && problem.testCases.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-md font-semibold text-leetcode-dark-text mb-3">Sample Test Cases</h3>
                                <div className="space-y-4">
                                    {problem.testCases.map((testCase, index) => (
                                        <div key={testCase.id} className="bg-leetcode-dark-background border border-leetcode-dark-third rounded-lg p-4">
                                            <div className="text-yellow-400 font-medium mb-3">Example {index + 1}</div>
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-leetcode-dark-muted text-sm font-medium">Input: </span>
                                                    <span className="text-leetcode-dark-text font-mono text-sm">{testCase.input}</span>
                                                </div>
                                                <div>
                                                    <span className="text-leetcode-dark-muted text-sm font-medium">Expected Output: </span>
                                                    <span className="text-leetcode-dark-text font-mono text-sm">{testCase.expectedOutput}</span>
                                                </div>
                                                {testCase.explanation && (
                                                    <div>
                                                        <span className="text-leetcode-dark-muted text-sm font-medium">Explanation: </span>
                                                        <span className="text-leetcode-dark-text text-sm">{testCase.explanation}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Meta Information */}
                        <div className="border-t border-leetcode-dark-third pt-4 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-leetcode-dark-muted">Task Type: </span>
                                    <span className="text-leetcode-dark-text font-medium">{problem.taskType}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-leetcode-dark-muted" />
                                    <span className="text-leetcode-dark-muted">Created: </span>
                                    <span className="text-leetcode-dark-text">
                                        {new Date(problem.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {problem.author?.organization && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-leetcode-dark-muted">Organization: </span>
                                        <span className="text-leetcode-dark-text">{problem.author.organization}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submission Section */}
                    <div className="px-6 py-5 border-t border-leetcode-dark-third bg-leetcode-dark-background">
                        <h3 className="text-lg font-semibold text-leetcode-dark-text mb-4 flex items-center gap-2">
                            <Upload className="h-5 w-5 text-green-400" />
                            Submit Solution
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {/* Language Selection */}
                            <div>
                                <label className="block text-sm font-medium text-leetcode-dark-muted mb-2">
                                    Programming Language
                                </label>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="w-full px-3 py-2 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg text-leetcode-dark-text focus:outline-none focus:border-blue-500/50 transition-colors"
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
                                <label className="block text-sm font-medium text-leetcode-dark-muted mb-2">
                                    Upload Solution File
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".js,.py,.java,.cpp,.sql,.prisma,.txt"
                                    className="w-full px-3 py-2 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg text-leetcode-dark-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600/20 file:text-blue-400 file:cursor-pointer hover:file:bg-blue-600/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>
                        </div>

                        {selectedFile && (
                            <div className="mb-4 p-3 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-lg">
                                <div className="flex items-center text-sm gap-2">
                                    <FileText className="h-4 w-4 text-green-400" />
                                    <span className="text-leetcode-dark-muted">Selected file: </span>
                                    <span className="text-leetcode-dark-text font-medium">{selectedFile.name}</span>
                                    <span className="text-leetcode-dark-muted">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-green-600/20 border border-green-600/30 text-green-400 rounded-lg font-medium hover:bg-green-600/30 transition-colors"
                            >
                                Submit Solution
                            </button>

                            <button className="px-6 py-2 border border-leetcode-dark-third text-leetcode-dark-text bg-leetcode-dark-sidebar rounded-lg font-medium hover:bg-leetcode-dark-third transition-colors">
                                View Solutions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemCard;