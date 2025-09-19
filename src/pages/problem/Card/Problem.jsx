import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { ChevronDown, X, CheckCircle, XCircle, Clock } from 'lucide-react';

const ProblemList = () => {
    // State for filters and problems
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
    const [selectedTags, setSelectedTags] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const dropdownRefs = useRef({});

    //fetch tag
    async function fetchTags() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tags`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            const data = await response.json();

            if (data.success) {
                setTags(data.tags);
            } else {
                setError('Failed to fetch tags');
            }

        } catch (err) {
            setError('Error fetching tags: ' + err.message);
        }
    }

    // fetch categories
    async function fetchCategories() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tags/category`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setCategories(data.category);
            } else {
                setError('Failed to fetch category');
            }

        } catch (err) {
            setError('Error fetching category: ' + err.message);
        }
    }

    useEffect(() => {
        fetchTags();
        fetchCategories()
    }, [])

    // Filter options
    // const categories = ['ALL', 'Algorithms', 'Database', 'Shell', 'Concurrency'];
    const difficulties = ['ALL', 'EASY', 'MEDIUM', 'HARD'];
    // const tags = ['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy', 'Depth-First Search', 'Binary Search', 'Tree', 'Breadth-First Search', 'Matrix', 'Two Pointers', 'Binary Tree', 'Bit Manipulation', 'Heap', 'Stack', 'Graph'];

    // Fetch problems from API
    const fetchProblems = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/problems`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: selectedCategory !== 'ALL' ? selectedCategory : '',
                    difficulty: selectedDifficulty !== 'ALL' ? selectedDifficulty : '',
                    tags: selectedTags
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setProblems(data.problems);
            } else {
                setError('Failed to fetch problems');
            }

        } catch (err) {
            setError('Error fetching problems: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, selectedDifficulty, selectedTags]);

    useEffect(() => {
        fetchProblems();
    }, [fetchProblems]);

    // Filter problems based on selected filters
    const filteredProblems = useMemo(() => {
        return problems.filter(problem => {
            // Category filter
            if (selectedCategory !== 'ALL' && problem.category !== selectedCategory) {
                return false;
            }

            // Difficulty filter
            if (selectedDifficulty !== 'ALL' && problem.difficulty !== selectedDifficulty) {
                return false;
            }

            // Tags filter
            if (selectedTags.length > 0) {
                const hasAllTags = selectedTags.every(tag => problem.tags.includes(tag));
                if (!hasAllTags) {
                    return false;
                }
            }

            return true;
        });
    }, [problems, selectedCategory, selectedDifficulty, selectedTags]);

    // Helper functions
    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toUpperCase()) {
            case 'EASY': return 'text-leetcode-dark-easy';
            case 'MEDIUM': return 'text-leetcode-dark-medium';
            case 'HARD': return 'text-leetcode-dark-hard';
            default: return 'text-leetcode-dark-text';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'solved':
                return <CheckCircle size={16} className="text-leetcode-dark-easy" />;
            case 'attempted':
                return <Clock size={16} className="text-leetcode-dark-medium" />;
            case 'unsolved':
                return <XCircle size={16} className="text-leetcode-dark-muted" />;
            default:
                return null;
        }
    };

    // Dropdown handlers
    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(prev => prev === dropdownName ? null : dropdownName);
    };

    const handleSelection = (type, value) => {
        if (type === 'category') {
            setSelectedCategory(value);
        } else if (type === 'difficulty') {
            setSelectedDifficulty(value);
        } else if (type === 'tag') {
            if (!selectedTags.includes(value)) {
                setSelectedTags([...selectedTags, value]);
            }
        }
        setOpenDropdown(null);
    };

    const removeTag = (tagToRemove) => {
        setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
    };

    const clearAllTags = () => {
        setSelectedTags([]);
        setOpenDropdown(null);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown) {
                const currentRef = dropdownRefs.current[openDropdown];
                if (currentRef && !currentRef.contains(event.target)) {
                    setOpenDropdown(null);
                }
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    // Dropdown components
    const CategoryDropdown = () => (
        <div className="relative" ref={el => dropdownRefs.current.category = el}>
            <div className='flex items-center gap-2'>
                <p className='text-leetcode-dark-text text-sm font-medium'>Category:</p>
                <button
                    onClick={() => toggleDropdown('category')}
                    className="flex items-center gap-2 px-3 py-2 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-md transition-colors min-w-32 justify-between hover:bg-leetcode-dark-third/50"
                >
                    <span className="text-sm text-leetcode-dark-text">
                        {selectedCategory}
                    </span>
                    <ChevronDown
                        size={16}
                        className={`text-leetcode-dark-muted transition-transform duration-200 ${openDropdown === 'category' ? 'rotate-180' : ''
                            }`}
                    />
                </button>
            </div>

            {openDropdown === 'category' && (
                <div className="absolute top-full left-16 mt-1 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-md shadow-lg z-50 min-w-32">
                    {categories.map((category) => (
                        <button
                            key={category.category}
                            onClick={() => handleSelection('category', category.category)}
                            className={`block w-full text-left px-3 py-2 text-sm hover:bg-leetcode-dark-third transition-colors text-leetcode-dark-text ${category === selectedCategory ? 'bg-leetcode-dark-third' : ''
                                }`}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    const DifficultyDropdown = () => (
        <div className="relative" ref={el => dropdownRefs.current.difficulty = el}>
            <div className='flex items-center gap-2'>
                <p className='text-leetcode-dark-text text-sm font-medium'>Difficulty:</p>
                <button
                    onClick={() => toggleDropdown('difficulty')}
                    className="flex items-center gap-2 px-3 py-2 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-md transition-colors min-w-32 justify-between hover:bg-leetcode-dark-third/50"
                >
                    <span className={`text-sm ${getDifficultyColor(selectedDifficulty)}`}>
                        {selectedDifficulty}
                    </span>
                    <ChevronDown
                        size={16}
                        className={`text-leetcode-dark-muted transition-transform duration-200 ${openDropdown === 'difficulty' ? 'rotate-180' : ''
                            }`}
                    />
                </button>
            </div>

            {openDropdown === 'difficulty' && (
                <div className="absolute top-full left-16 mt-1 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-md shadow-lg z-50 min-w-32">
                    {difficulties.map((difficulty) => (
                        <button
                            key={difficulty}
                            onClick={() => handleSelection('difficulty', difficulty)}
                            className={`block w-full text-left px-3 py-2 text-sm hover:bg-leetcode-dark-third transition-colors ${getDifficultyColor(difficulty)} ${difficulty === selectedDifficulty ? 'bg-leetcode-dark-third' : ''
                                }`}
                        >
                            {difficulty}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    const TagDropdown = () => (
        <div className="relative" ref={el => dropdownRefs.current.tag = el}>
            <div className='flex items-center gap-2'>
                <p className='text-leetcode-dark-text text-sm font-medium'>Tag:</p>
                <button
                    onClick={() => toggleDropdown('tag')}
                    className="flex items-center gap-2 px-3 py-2 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-md transition-colors min-w-32 justify-between hover:bg-leetcode-dark-third/50"
                >
                    <span className="text-sm text-leetcode-dark-text">
                        {selectedTags.length === 0 ? 'Select Tags' : `${selectedTags.length} selected`}
                    </span>
                    <ChevronDown
                        size={16}
                        className={`text-leetcode-dark-muted transition-transform duration-200 ${openDropdown === 'tag' ? 'rotate-180' : ''
                            }`}
                    />
                </button>
            </div>

            {openDropdown === 'tag' && (
                <div className="absolute top-full left-16 mt-1 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-md shadow-lg z-50 max-h-64 overflow-y-auto min-w-48">
                    {selectedTags.length > 0 && (
                        <button
                            onClick={clearAllTags}
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-leetcode-dark-third transition-colors text-leetcode-dark-muted border-b border-leetcode-dark-third"
                        >
                            Clear All Tags
                        </button>
                    )}
                    {tags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <button
                                key={tag.name}
                                onClick={() => !isSelected && handleSelection('tag', tag.name)}
                                disabled={isSelected}
                                className={`block w-full text-left px-3 py-2 text-sm hover:bg-leetcode-dark-third transition-colors text-leetcode-dark-text ${isSelected ? 'bg-leetcode-dark-third opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                            >
                                {tag.name} {isSelected ? '✓' : ''}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );

    return (
        <div className='rounded-2xl'>
            {/* Top Filter Bar */}
            <div className='p-4'>
                <div className='flex justify-center items-center'>
                    <div className='flex items-center gap-12'>
                        <CategoryDropdown />
                        <DifficultyDropdown />
                        <TagDropdown />
                    </div>
                </div>

                {/* Display selected tags */}
                {selectedTags.length > 0 && (
                    <div className='mt-6 flex'>
                        <div className='flex flex-wrap gap-2'>
                            {selectedTags.map((tag) => (
                                <div key={tag} className='flex justify-center items-center gap-2 bg-leetcode-dark-third rounded-xl px-3 py-1'>
                                    <span className='text-xs text-leetcode-dark-muted'>{tag}</span>
                                    <button
                                        onClick={() => removeTag(tag)}
                                        className='hover:bg-leetcode-dark-hover rounded-full p-0.5 transition-colors'
                                        title={`Remove ${tag}`}
                                    >
                                        <X size={12} className='text-leetcode-dark-muted hover:text-leetcode-dark-text' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='border-b border-leetcode-dark-third mt-1' />

            {/* Problems Table */}
            <div className='mt-4 overflow-x-auto'>
                {loading && <div className="p-4 text-center text-leetcode-dark-text">Loading problems...</div>}
                {error && <div className="p-4 text-center text-leetcode-dark-hard">{error}</div>}

                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-leetcode-dark-third rounded-lg'>
                            <th className='p-3 text-leetcode-dark-text font-medium text-sm text-left rounded-tl-lg'>
                                Problem
                            </th>
                            <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                Category
                            </th>
                            <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center'>
                                Difficulty
                            </th>
                            <th className='p-3 text-leetcode-dark-text font-medium text-sm text-center rounded-tr-lg'>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProblems.map((problem, index) => (
                            <tr
                                key={`${problem.id}-${index}`}
                                className='border-b border-leetcode-dark-third hover:bg-leetcode-dark-third/30 transition-colors cursor-pointer'
                            >
                                <td className='p-3 '>
                                    <div className='flex items-start gap-3'>
                                        <span className='text-leetcode-dark-muted text-sm mt-0.5'>
                                            {problem.id}.
                                        </span>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-leetcode-dark-text hover:text-leetcode-dark-text/80 transition-colors'>
                                                {problem.title}
                                            </span>
                                            <div className='flex flex-wrap gap-1'>
                                                {problem.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className='px-1.5 py-0.5 bg-leetcode-dark-third text-leetcode-dark-muted text-xs rounded-sm border border-leetcode-dark-third'
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {problem.tags.length > 2 && (
                                                    <span className='px-1.5 py-0.5 bg-leetcode-dark-third text-leetcode-dark-muted text-xs rounded-sm border border-leetcode-dark-third'>
                                                        +{problem.tags.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-3 text-center text-leetcode-dark-muted text-sm'>
                                    {problem.category}
                                </td>
                                <td className='p-3 text-center'>
                                    <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                </td>
                                <td className='p-3 text-center'>
                                    {getStatusIcon(problem.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProblems.length === 0 && !loading && !error && (
                    <div className="p-4 text-center text-leetcode-dark-muted">
                        No problems found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemList;