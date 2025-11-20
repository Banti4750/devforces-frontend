import { Book, Video, Calendar, Code, User, Eye, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TutorialPage = () => {
    const [activeTab, setActiveTab] = useState('recent');
    const [allTutorials, setAllTutorials] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    // Fetch all tutorials
    async function fetchTutorials() {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tutorials`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAllTutorials(data.data || []);

        } catch (err) {
            console.log('Error fetching tutorials: ' + err.message);
            toast.error('Failed to fetch tutorials');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTutorials();
    }, [])

    // Filter tutorials based on active tab
    const getFilteredTutorials = () => {
        const now = new Date();

        switch (activeTab) {
            case 'recent':
                return allTutorials.filter(tutorial => {
                    const tutorialDate = new Date(tutorial.createdAt);
                    const diffTime = now - tutorialDate;
                    const diffDays = diffTime / (1000 * 60 * 60 * 24);
                    return diffDays <= 30; // Last 30 days
                });
            case 'popular':
                return [...allTutorials].sort((a, b) => b.views - a.views).slice(0, 20);
            case 'all':
                return allTutorials;
            default:
                return allTutorials;
        }
    };

    const currentTutorials = getFilteredTutorials();

    const getDifficultyBadge = (difficulty) => {
        const colors = {
            EASY: 'bg-green-600/20 text-green-400 border-green-600/30',
            MEDIUM: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
            HARD: 'bg-red-600/20 text-red-400 border-red-600/30',
            EXPERT: 'bg-purple-600/20 text-purple-400 border-purple-600/30'
        };

        return (
            <span className={`px-2 py-1 text-xs rounded-md border ${colors[difficulty] || colors.EASY}`}>
                {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1).toLowerCase()}
            </span>
        );
    };

    const getTypeIcon = (type) => {
        if (type === 'VIDEO') {
            return <Video className="h-4 w-4 text-red-400" />;
        } else if (type === 'INTERACTIVE') {
            return <Code className="h-4 w-4 text-green-400" />;
        }
        return <Book className="h-4 w-4 text-blue-400" />;
    };

    const getTypeText = (type) => {
        const typeMap = {
            'WRITTEN': 'Written',
            'VIDEO': 'Video',
            'INTERACTIVE': 'Interactive'
        };
        return typeMap[type] || type;
    };

    return (
        <div className='bg-leetcode-dark-background min-h-screen'>
            {/* Main container */}
            <div className='container mx-auto px-4 py-6 max-w-6xl'>
                <div className='flex items-center gap-2 mb-2'>
                    <Book className='h-7 w-7 text-blue-400' />
                    <h1 className='text-leetcode-dark-text text-3xl font-bold'>Development Tutorials</h1>
                </div>
                <p className='text-leetcode-dark-muted mb-6 text-lg'>
                    Master development concepts with comprehensive tutorials and hands-on exercises
                </p>

                <div className='bg-leetcode-dark-sidebar rounded-lg p-6 h-full mb-6 border border-leetcode-dark-third'>
                    {/* Navigation tabs */}
                    <div className='border border-leetcode-dark-third rounded-xl inline-flex mb-6'>
                        <button
                            onClick={() => setActiveTab('recent')}
                            className={`px-6 py-3 m-1 w-32 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'recent'
                                ? 'bg-leetcode-dark-background text-leetcode-dark-text shadow-lg'
                                : 'bg-leetcode-dark-sidebar text-leetcode-dark-text hover:bg-leetcode-dark-background/50'
                                }`}
                        >
                            Recent
                        </button>
                        <button
                            onClick={() => setActiveTab('popular')}
                            className={`px-6 py-3 w-32 m-1 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'popular'
                                ? 'bg-leetcode-dark-background text-leetcode-dark-text shadow-lg'
                                : 'bg-leetcode-dark-sidebar text-leetcode-dark-text hover:bg-leetcode-dark-background/50'
                                }`}
                        >
                            Popular
                        </button>
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 py-3 w-32 m-1 rounded-lg border border-leetcode-dark-third font-medium transition-colors ${activeTab === 'all'
                                ? 'bg-leetcode-dark-background text-leetcode-dark-text shadow-lg'
                                : 'bg-leetcode-dark-sidebar text-leetcode-dark-text hover:bg-leetcode-dark-background/50'
                                }`}
                        >
                            All
                        </button>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
                        <div className='bg-leetcode-dark-background rounded-lg p-4 border border-leetcode-dark-third'>
                            <div className='text-2xl font-bold text-leetcode-dark-text'>{allTutorials.length}</div>
                            <div className='text-leetcode-dark-muted text-sm'>Total Tutorials</div>
                        </div>
                        <div className='bg-leetcode-dark-background rounded-lg p-4 border border-leetcode-dark-third'>
                            <div className='text-2xl font-bold text-leetcode-dark-text'>
                                {allTutorials.filter(t => t.type === 'VIDEO').length}
                            </div>
                            <div className='text-leetcode-dark-muted text-sm'>Video Tutorials</div>
                        </div>
                        <div className='bg-leetcode-dark-background rounded-lg p-4 border border-leetcode-dark-third'>
                            <div className='text-2xl font-bold text-leetcode-dark-text'>
                                {allTutorials.reduce((acc, t) => acc + t.views, 0)}
                            </div>
                            <div className='text-leetcode-dark-muted text-sm'>Total Views</div>
                        </div>
                        <div className='bg-leetcode-dark-background rounded-lg p-4 border border-leetcode-dark-third'>
                            <div className='text-2xl font-bold text-leetcode-dark-text'>
                                {new Set(allTutorials.map(t => t.authorId)).size}
                            </div>
                            <div className='text-leetcode-dark-muted text-sm'>Active Authors</div>
                        </div>
                    </div>

                    {/* Tutorials grid */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {loading ? (
                            <div className="col-span-3 p-8 text-center text-leetcode-dark-muted">
                                <div className="animate-pulse">Loading tutorials...</div>
                            </div>
                        ) : currentTutorials.length > 0 ? (
                            currentTutorials.map((tutorial) => (
                                <div
                                    key={tutorial.id}
                                    className='bg-leetcode-dark-background rounded-lg border border-leetcode-dark-third hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer group'
                                    onClick={() => navigate(`/tutorial/${tutorial.id}`)}
                                >
                                    <div className='p-5'>
                                        {/* Header */}
                                        <div className='flex items-start justify-between mb-3'>
                                            <div className='flex items-center gap-2'>
                                                {getTypeIcon(tutorial.type)}
                                                <span className='text-leetcode-dark-muted text-sm'>
                                                    {getTypeText(tutorial.type)}
                                                </span>
                                            </div>
                                            {getDifficultyBadge(tutorial.difficulty)}
                                        </div>

                                        {/* Title and Description */}
                                        <h3 className='text-lg font-bold text-leetcode-dark-text mb-2 group-hover:text-blue-400 transition-colors line-clamp-2'>
                                            {tutorial.title}
                                        </h3>
                                        <p className='text-leetcode-dark-muted text-sm mb-4 line-clamp-3'>
                                            {tutorial.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className='flex flex-wrap gap-1 mb-4'>
                                            {tutorial.technologies?.slice(0, 3).map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className='px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded border border-blue-600/30'
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {tutorial.technologies?.length > 3 && (
                                                <span className='px-2 py-1 bg-leetcode-dark-third text-leetcode-dark-muted text-xs rounded'>
                                                    +{tutorial.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center gap-2'>
                                                    <img
                                                        src={tutorial.author.profilePic}
                                                        alt={tutorial.author.name}
                                                        className='w-6 h-6 rounded-full'
                                                    />
                                                    <span className='text-leetcode-dark-text text-sm'>
                                                        {tutorial.author.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3 text-leetcode-dark-muted text-sm'>
                                                {tutorial.duration && (
                                                    <div className='flex items-center gap-1'>
                                                        <Clock className='h-3 w-3' />
                                                        <span>{tutorial.duration}m</span>
                                                    </div>
                                                )}
                                                <div className='flex items-center gap-1'>
                                                    <Eye className='h-3 w-3' />
                                                    <span>{tutorial.views}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className='mt-3 pt-3 border-t border-leetcode-dark-third'>
                                            <div className='flex items-center gap-1 text-leetcode-dark-muted text-xs'>
                                                <Calendar className='h-3 w-3' />
                                                <span>
                                                    {new Date(tutorial.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 p-8 text-center text-leetcode-dark-muted">
                                <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <div className="text-lg mb-2">No tutorials found</div>
                                <div className="text-sm">Check back later for new tutorials</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Features Section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6 hover:border-blue-500/50 transition-colors'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-red-600/20 rounded-lg'>
                                <Video className='h-6 w-6 text-red-400' />
                            </div>
                            <h3 className='text-leetcode-dark-text font-semibold text-lg'>Video Tutorials</h3>
                        </div>
                        <ul className='text-leetcode-dark-text text-sm space-y-2'>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-red-400 rounded-full'></div>
                                Step-by-step video explanations
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-red-400 rounded-full'></div>
                                Real-time coding demonstrations
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-red-400 rounded-full'></div>
                                Best practices and patterns
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-red-400 rounded-full'></div>
                                Industry expert insights
                            </li>
                        </ul>
                    </div>

                    <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6 hover:border-green-500/50 transition-colors'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-green-600/20 rounded-lg'>
                                <Code className='h-6 w-6 text-green-400' />
                            </div>
                            <h3 className='text-leetcode-dark-text font-semibold text-lg'>Written Solutions</h3>
                        </div>
                        <ul className='text-leetcode-dark-text text-sm space-y-2'>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                                Detailed code explanations
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                                Multiple solution approaches
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                                Complexity analysis
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                                Code snippets with syntax highlighting
                            </li>
                        </ul>
                    </div>

                    <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6 hover:border-purple-500/50 transition-colors'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-purple-600/20 rounded-lg'>
                                <User className='h-6 w-6 text-purple-400' />
                            </div>
                            <h3 className='text-leetcode-dark-text font-semibold text-lg'>Expert Authors</h3>
                        </div>
                        <ul className='text-leetcode-dark-text text-sm space-y-2'>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-purple-400 rounded-full'></div>
                                Industry professionals
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-purple-400 rounded-full'></div>
                                Experienced developers
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-purple-400 rounded-full'></div>
                                Active community contributors
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='w-1.5 h-1.5 bg-purple-400 rounded-full'></div>
                                Regular content updates
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialPage;