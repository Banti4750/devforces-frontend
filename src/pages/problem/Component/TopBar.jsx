import React, { useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const TopBar = ({ onFiltersChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedTags, setSelectedTags] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    const categories = ['All', 'Algorithms', 'Database', 'Shell', 'Concurrency'];
    const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
    const tags = ['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy', 'Depth-First Search', 'Binary Search', 'Tree', 'Breadth-First Search', 'Matrix', 'Two Pointers', 'Binary Tree', 'Bit Manipulation', 'Heap', 'Stack', 'Graph'];

    useEffect(() => {
        if (onFiltersChange) {
            onFiltersChange({
                category: selectedCategory,
                difficulty: selectedDifficulty,
                tags: selectedTags
            });
        }
    }, [selectedCategory, selectedDifficulty, selectedTags, onFiltersChange]);


    const handleDropdownToggle = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const handleSelection = (type, value) => {
        if (type === 'category') setSelectedCategory(value);
        else if (type === 'difficulty') setSelectedDifficulty(value);
        else if (type === 'tag') {
            if (!selectedTags.includes(value)) {
                setSelectedTags([...selectedTags, value]);
            }
        }
        setOpenDropdown(null);
    };

    const removeTag = (tagToRemove) => {
        setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    };

    const clearAllTags = () => {
        setSelectedTags([]);
    };

    const Dropdown = ({ label, selected, options, type, isOpen, onToggle }) => {
        const getDifficultyColor = (difficulty) => {
            switch (difficulty) {
                case 'EASY': return 'text-leetcode-dark-easy';
                case 'MEDIUM': return 'text-leetcode-dark-medium';
                case 'Hard': return 'text-leetcode-dark-hard';
                default: return 'text-leetcode-dark-text';
            }
        };

        const displayText = type === 'tag' ?
            (selectedTags.length === 0 ? 'Select Tags' : `${selectedTags.length} selected`) :
            selected;

        return (
            <div className="relative">
                <button
                    onClick={() => onToggle(type)}
                    className="flex items-center gap-2 px-3 py-2 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-md transition-colors min-w-32 justify-between"
                >
                    <span className={`text-sm ${type === 'difficulty' ? getDifficultyColor(selected) : 'text-leetcode-dark-text'}`}>
                        {displayText}
                    </span>
                    <ChevronDown
                        size={16}
                        className={`text-leetcode-dark-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-leetcode-dark-sidebar border border-leetcode-dark-third rounded-md shadow-lg z-50 max-h-64 overflow-y-scroll scrollbar-none min-w-full"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}>
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {type === 'tag' && selectedTags.length > 0 && (
                            <>
                                <button
                                    onClick={clearAllTags}
                                    className="block w-full text-left px-3 py-2 text-sm hover:bg-leetcode-dark-third transition-colors text-leetcode-dark-muted border-b border-leetcode-dark-third"
                                >
                                    Clear All Tags
                                </button>
                            </>
                        )}
                        {options.map((option) => {
                            const isSelected = type === 'tag' ? selectedTags.includes(option) : option === selected;
                            return (
                                <button
                                    key={option}
                                    onClick={() => handleSelection(type, option)}
                                    className={`block w-full text-left px-3 py-2 text-sm hover:bg-leetcode-dark-third transition-colors ${isSelected ? 'bg-leetcode-dark-third' : ''
                                        } ${type === 'difficulty' ? getDifficultyColor(option) : 'text-leetcode-dark-text'} ${type === 'tag' && isSelected ? 'opacity-50' : ''
                                        }`}
                                    disabled={type === 'tag' && isSelected}
                                >
                                    {option} {type === 'tag' && isSelected ? '✓' : ''}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown && !event.target.closest('.relative')) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdown]);

    return (
        <>
            <div className='p-4'>
                <div className='flex justify-center items-center'>
                    <div className='flex items-center gap-12'>
                        {/* Category dropdown */}
                        <div className='flex items-center gap-2'>
                            <p className='text-leetcode-dark-text text-sm font-medium'>Category:</p>
                            <Dropdown
                                label="Category"
                                selected={selectedCategory}
                                options={categories}
                                type="category"
                                isOpen={openDropdown === 'category'}
                                onToggle={handleDropdownToggle}
                            />
                        </div>

                        {/* Difficulty dropdown */}
                        <div className='flex items-center gap-2'>
                            <p className='text-leetcode-dark-text text-sm font-medium'>Difficulty:</p>
                            <Dropdown
                                label="Difficulty"
                                selected={selectedDifficulty}
                                options={difficulties}
                                type="difficulty"
                                isOpen={openDropdown === 'difficulty'}
                                onToggle={handleDropdownToggle}
                            />
                        </div>

                        {/* Tag dropdown */}
                        <div className='flex items-center gap-2'>
                            <p className='text-leetcode-dark-text text-sm font-medium'>Tag:</p>
                            <Dropdown
                                label="Tag"
                                selected=""
                                options={tags}
                                type="tag"
                                isOpen={openDropdown === 'tag'}
                                onToggle={handleDropdownToggle}
                            />
                        </div>
                    </div>
                </div>

                {/* Display selected tags */}
                {selectedTags.length > 0 && (
                    <div className='mt-6 flex '>
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
        </>
    );
};

export default TopBar;