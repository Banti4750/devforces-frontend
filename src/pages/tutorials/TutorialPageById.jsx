import { ArrowLeft, Video, Book, Code, ExternalLink, Calendar, Eye, Clock, User, Star, Share2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const TutorialPageById = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [tutorial, setTutorial] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('content')
    const [relatedTutorials, setRelatedTutorials] = useState([])

    // Fetch tutorial details
    async function fetchTutorial() {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tutorials/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setTutorial(data.data)

            // Fetch related tutorials based on technologies
            if (data.data?.technologies?.length > 0) {
                fetchRelatedTutorials(data.data.technologies, data.data.id)
            }

        } catch (err) {
            console.log('Error fetching tutorial: ' + err.message)
            toast.error('Failed to fetch tutorial details')
        } finally {
            setLoading(false)
        }
    }

    // Fetch related tutorials
    async function fetchRelatedTutorials(technologies, currentTutorialId) {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tutorials?technology=${technologies[0]}&limit=4`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            )

            if (response.ok) {
                const data = await response.json()
                // Filter out current tutorial and limit to 3
                const related = data.data
                    .filter(t => t.id !== currentTutorialId)
                    .slice(0, 3)
                setRelatedTutorials(related)
            }
        } catch (err) {
            console.log('Error fetching related tutorials: ' + err.message)
        }
    }

    // Function to parse and render content with proper code formatting
    const renderContent = (content) => {
        if (!content) return null;

        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Process code blocks
        const codeBlocks = tempDiv.querySelectorAll('pre code');
        codeBlocks.forEach((codeBlock, index) => {
            const code = codeBlock.textContent;
            const language = codeBlock.className.replace('language-', '') || 'javascript';

            // Replace the code block with our SyntaxHighlighter component
            const highlighter = document.createElement('div');
            highlighter.className = 'code-block-wrapper';
            highlighter.innerHTML = `
                <div class="code-header">
                    <span class="language-label">${language}</span>
                    <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                </div>
            `;

            // We'll handle the actual code highlighting in the render
            const preElement = codeBlock.closest('pre');
            if (preElement) {
                preElement.replaceWith(highlighter);
            }
        });

        return { __html: tempDiv.innerHTML };
    };

    // Copy code function
    const copyCode = (button) => {
        const codeBlock = button.closest('.code-block-wrapper').nextElementSibling;
        if (codeBlock) {
            const code = codeBlock.textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        }
    };

    // Add copy function to window for HTML buttons
    useEffect(() => {
        window.copyCode = copyCode;
    }, []);

    // Function to extract and render code blocks properly
    const renderCodeBlocks = (content) => {
        if (!content) return null;

        // First, unescape the HTML content
        const unescapedContent = content
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\\\/g, '\\');

        const elements = [];
        let currentIndex = 0;

        // Regular expression to find code blocks with optional class attribute
        const codeBlockRegex = /<pre><code(?:\s+class=["']language-([^"']*)["'])?>([\s\S]*?)<\/code><\/pre>/g;
        let match;
        let lastIndex = 0;

        while ((match = codeBlockRegex.exec(unescapedContent)) !== null) {
            // Add content before the code block
            if (match.index > lastIndex) {
                elements.push(
                    <div
                        key={`text-${currentIndex}`}
                        dangerouslySetInnerHTML={{
                            __html: unescapedContent.slice(lastIndex, match.index)
                        }}
                    />
                );
                currentIndex++;
            }

            // Add the code block with syntax highlighting
            const language = match[1] || 'javascript';
            const code = match[2]
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&#x27;/g, "'")
                .replace(/&#x2F;/g, '/')
                .trim();

            elements.push(
                <div key={`code-${currentIndex}`} className="mb-6">
                    <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-t-lg border-b border-gray-700">
                        <span className="text-gray-300 text-sm font-medium">{language}</span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(code).then(() => {
                                    toast.success('Code copied to clipboard!');
                                });
                            }}
                            className="text-gray-400 hover:text-white text-sm px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                        >
                            Copy
                        </button>
                    </div>
                    <SyntaxHighlighter
                        language={language}
                        style={atomOneDark}
                        customStyle={{
                            margin: 0,
                            borderRadius: '0 0 0.5rem 0.5rem',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }}
                        showLineNumbers={true}
                        wrapLongLines={true}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            );
            currentIndex++;

            lastIndex = match.index + match[0].length;
        }

        // Add remaining content after the last code block
        if (lastIndex < unescapedContent.length) {
            elements.push(
                <div
                    key={`text-${currentIndex}`}
                    dangerouslySetInnerHTML={{
                        __html: unescapedContent.slice(lastIndex)
                    }}
                />
            );
        }

        return elements.length > 0 ? elements : (
            <div dangerouslySetInnerHTML={{ __html: unescapedContent }} />
        );
    };

    useEffect(() => {
        if (id) {
            fetchTutorial()
        }
    }, [id])

    const getDifficultyColor = (difficulty) => {
        const colors = {
            EASY: 'text-green-400 bg-green-600/20 border-green-600/30',
            MEDIUM: 'text-yellow-400 bg-yellow-600/20 border-yellow-600/30',
            HARD: 'text-red-400 bg-red-600/20 border-red-600/30',
            EXPERT: 'text-purple-400 bg-purple-600/20 border-purple-600/30'
        };
        return colors[difficulty] || colors.MEDIUM;
    };

    const getTypeIcon = (type) => {
        if (type === 'VIDEO') {
            return <Video className="h-5 w-5 text-red-400" />;
        } else if (type === 'INTERACTIVE') {
            return <Code className="h-5 w-5 text-green-400" />;
        }
        return <Book className="h-5 w-5 text-blue-400" />;
    };

    const shareTutorial = () => {
        if (navigator.share) {
            navigator.share({
                title: tutorial.title,
                text: tutorial.description,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="bg-leetcode-dark-background min-h-screen flex items-center justify-center">
                <div className="text-leetcode-dark-text animate-pulse">Loading tutorial...</div>
            </div>
        )
    }

    if (!tutorial) {
        return (
            <div className="bg-leetcode-dark-background min-h-screen flex items-center justify-center">
                <div className="text-leetcode-dark-text">Tutorial not found</div>
            </div>
        )
    }

    return (
        <div className='bg-leetcode-dark-background min-h-screen'>
            <div className='container mx-auto px-4 py-6 max-w-6xl'>
                {/* Back button and header */}
                <div className='flex items-center justify-between mb-6'>
                    <button
                        onClick={() => navigate('/tutorial')}
                        className="flex items-center gap-2 text-leetcode-dark-text hover:text-leetcode-dark-text/80 transition-colors px-4 py-2 rounded-lg border border-leetcode-dark-third hover:border-leetcode-dark-text/50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Tutorials
                    </button>

                    <button
                        onClick={shareTutorial}
                        className="flex items-center gap-2 text-leetcode-dark-text hover:text-blue-400 transition-colors px-4 py-2 rounded-lg border border-leetcode-dark-third hover:border-blue-400/50"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>
                </div>

                {/* Tutorial header */}
                <div className='bg-leetcode-dark-sidebar rounded-lg p-8 border border-leetcode-dark-third mb-6'>
                    <div className='flex items-start justify-between mb-6'>
                        <div className='flex-1'>
                            {/* Badges */}
                            <div className='flex items-center gap-3 mb-4'>
                                <span className={`px-3 py-1 rounded-full border ${getDifficultyColor(tutorial.difficulty)} text-sm font-medium`}>
                                    {tutorial.difficulty?.charAt(0) + tutorial.difficulty?.slice(1).toLowerCase()}
                                </span>
                                <div className='flex items-center gap-2 text-leetcode-dark-muted'>
                                    {getTypeIcon(tutorial.type)}
                                    <span className='text-sm'>
                                        {tutorial.type?.charAt(0) + tutorial.type?.slice(1).toLowerCase()} Tutorial
                                    </span>
                                </div>
                                {tutorial.isFeatured && (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 rounded-full text-sm">
                                        <Star className="h-3 w-3" />
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Title and Description */}
                            <h1 className='text-4xl font-bold text-leetcode-dark-text mb-4'>
                                {tutorial.title}
                            </h1>
                            <p className='text-leetcode-dark-muted text-lg mb-6 leading-relaxed'>
                                {tutorial.description}
                            </p>

                            {/* Technologies */}
                            <div className='flex flex-wrap gap-2 mb-6'>
                                {tutorial.technologies?.map((tech, index) => (
                                    <span
                                        key={index}
                                        className='px-3 py-2 bg-blue-600/20 text-blue-400 text-sm rounded-lg border border-blue-600/30'
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Stats and Author */}
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-6 text-leetcode-dark-muted text-sm'>
                                    <div className='flex items-center gap-2'>
                                        <Calendar className='h-4 w-4' />
                                        <span>
                                            {new Date(tutorial.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Eye className='h-4 w-4' />
                                        <span>{tutorial.views} views</span>
                                    </div>
                                    {tutorial.duration && (
                                        <div className='flex items-center gap-2'>
                                            <Clock className='h-4 w-4' />
                                            <span>{tutorial.duration} min read</span>
                                        </div>
                                    )}
                                </div>

                                {/* Author */}
                                <div className='flex items-center gap-3 bg-leetcode-dark-background px-4 py-3 rounded-lg border border-leetcode-dark-third'>
                                    <img
                                        src={tutorial.author.profilePic}
                                        alt={tutorial.author.name}
                                        className='w-10 h-10 rounded-full'
                                    />
                                    <div>
                                        <div className='text-leetcode-dark-text font-medium'>
                                            {tutorial.author.name}
                                        </div>
                                        {tutorial.author.currentRank && (
                                            <div className='text-leetcode-dark-muted text-sm'>
                                                {tutorial.author.currentRank}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* YouTube Link if Video Tutorial */}
                    {tutorial.type === 'VIDEO' && tutorial.youtubeUrl && (
                        <div className='mt-6 p-4 bg-red-600/10 border border-red-600/20 rounded-lg'>
                            <a
                                href={tutorial.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors"
                            >
                                <Video className="h-5 w-5" />
                                <span className='font-medium'>Watch full video on YouTube</span>
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                    {/* Content */}
                    <div className='lg:col-span-3'>
                        <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third'>
                            {/* Tab navigation */}
                            <div className='border-b border-leetcode-dark-third'>
                                <div className='flex'>
                                    <button
                                        onClick={() => setActiveTab('content')}
                                        className={`px-6 py-4 border-b-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'content'
                                            ? 'border-blue-400 text-blue-400'
                                            : 'border-transparent text-leetcode-dark-text hover:text-leetcode-dark-text/80'
                                            }`}
                                    >
                                        <Book className="h-4 w-4" />
                                        Content
                                    </button>
                                    {tutorial.type === 'VIDEO' && tutorial.youtubeUrl && (
                                        <button
                                            onClick={() => setActiveTab('video')}
                                            className={`px-6 py-4 border-b-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'video'
                                                ? 'border-blue-400 text-blue-400'
                                                : 'border-transparent text-leetcode-dark-text hover:text-leetcode-dark-text/80'
                                                }`}
                                        >
                                            <Video className="h-4 w-4" />
                                            Video
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Tab content */}
                            <div className='p-8'>
                                {activeTab === 'content' && (
                                    <div className="tutorial-content">
                                        <style jsx>{`
                                            .tutorial-content {
                                                color: #e5e7eb;
                                                line-height: 1.7;
                                            }
                                            .tutorial-content h1 {
                                                font-size: 2.5rem;
                                                font-weight: bold;
                                                margin-bottom: 1.5rem;
                                                color: #f3f4f6;
                                            }
                                            .tutorial-content h2 {
                                                font-size: 1.875rem;
                                                font-weight: bold;
                                                margin: 2rem 0 1rem 0;
                                                color: #f3f4f6;
                                                padding-bottom: 0.5rem;
                                                border-bottom: 2px solid #374151;
                                            }
                                            .tutorial-content h3 {
                                                font-size: 1.5rem;
                                                font-weight: bold;
                                                margin: 1.5rem 0 1rem 0;
                                                color: #f3f4f6;
                                            }
                                            .tutorial-content h4 {
                                                font-size: 1.25rem;
                                                font-weight: bold;
                                                margin: 1.25rem 0 0.75rem 0;
                                                color: #f3f4f6;
                                            }
                                            .tutorial-content p {
                                                margin-bottom: 1rem;
                                                color: #d1d5db;
                                            }
                                            .tutorial-content ul, .tutorial-content ol {
                                                margin: 1rem 0;
                                                padding-left: 2rem;
                                            }
                                            .tutorial-content li {
                                                margin-bottom: 0.5rem;
                                                color: #d1d5db;
                                            }
                                            .tutorial-content pre {
                                                margin: 1.5rem 0;
                                            }
                                            .tutorial-content code:not(pre code) {
                                                background: #374151;
                                                color: #f3f4f6;
                                                padding: 0.2rem 0.4rem;
                                                border-radius: 0.25rem;
                                                font-size: 0.875rem;
                                            }
                                            .tutorial-content blockquote {
                                                border-left: 4px solid #3b82f6;
                                                padding-left: 1rem;
                                                margin: 1.5rem 0;
                                                color: #9ca3af;
                                                font-style: italic;
                                            }
                                        `}</style>
                                        {renderCodeBlocks(tutorial.content)}
                                    </div>
                                )}

                                {activeTab === 'video' && tutorial.youtubeUrl && (
                                    <div>
                                        <div className="aspect-w-16 aspect-h-9 mb-6">
                                            <iframe
                                                src={tutorial.youtubeUrl.replace('watch?v=', 'embed/')}
                                                className="w-full h-96 rounded-lg"
                                                allowFullScreen
                                                title="YouTube video player"
                                            />
                                        </div>
                                        <div className='text-center'>
                                            <a
                                                href={tutorial.youtubeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                            >
                                                <Video className="h-4 w-4" />
                                                Watch on YouTube
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className='space-y-6'>
                        {/* Author Details */}
                        <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6'>
                            <h3 className='text-leetcode-dark-text font-semibold mb-4 flex items-center gap-2'>
                                <User className="h-4 w-4" />
                                About the Author
                            </h3>
                            <div className='flex items-center gap-3 mb-4'>
                                <img
                                    src={tutorial.author.profilePic}
                                    alt={tutorial.author.name}
                                    className='w-12 h-12 rounded-full'
                                />
                                <div>
                                    <div className='text-leetcode-dark-text font-semibold'>
                                        {tutorial.author.name}
                                    </div>
                                    {tutorial.author.currentRank && (
                                        <div className='text-leetcode-dark-muted text-sm'>
                                            {tutorial.author.currentRank}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/profile/${tutorial.author.id}`)}
                                className="w-full px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-600/30 hover:bg-blue-600/30 transition-colors text-sm"
                            >
                                View Profile
                            </button>
                        </div>

                        {/* Tutorial Info */}
                        <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6'>
                            <h3 className='text-leetcode-dark-text font-semibold mb-4'>Tutorial Info</h3>
                            <div className='space-y-3 text-sm'>
                                <div className='flex justify-between'>
                                    <span className='text-leetcode-dark-muted'>Type:</span>
                                    <span className='text-leetcode-dark-text capitalize'>
                                        {tutorial.type.toLowerCase()}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-leetcode-dark-muted'>Difficulty:</span>
                                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                                        {tutorial.difficulty}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-leetcode-dark-muted'>Duration:</span>
                                    <span className='text-leetcode-dark-text'>
                                        {tutorial.duration ? `${tutorial.duration} minutes` : 'Self-paced'}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-leetcode-dark-muted'>Views:</span>
                                    <span className='text-leetcode-dark-text'>{tutorial.views}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-leetcode-dark-muted'>Published:</span>
                                    <span className='text-leetcode-dark-text'>
                                        {new Date(tutorial.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Related Tutorials */}
                        {relatedTutorials.length > 0 && (
                            <div className='bg-leetcode-dark-sidebar rounded-lg border border-leetcode-dark-third p-6'>
                                <h3 className='text-leetcode-dark-text font-semibold mb-4'>Related Tutorials</h3>
                                <div className='space-y-3'>
                                    {relatedTutorials.map((related) => (
                                        <div
                                            key={related.id}
                                            className='p-3 border border-leetcode-dark-third rounded-lg hover:border-blue-500/50 hover:bg-leetcode-dark-third/30 transition-colors cursor-pointer'
                                            onClick={() => navigate(`/tutorial/${related.id}`)}
                                        >
                                            <div className='flex items-center justify-between mb-2'>
                                                <span className='text-leetcode-dark-text font-medium text-sm line-clamp-2'>
                                                    {related.title}
                                                </span>
                                            </div>
                                            <div className='flex items-center justify-between text-xs'>
                                                <span className='text-leetcode-dark-muted capitalize'>
                                                    {related.difficulty.toLowerCase()}
                                                </span>
                                                <span className='text-leetcode-dark-muted'>
                                                    {related.views} views
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorialPageById