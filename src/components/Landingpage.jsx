import React, { useState, useEffect } from 'react';
import {
    Code2, Zap, Shield, ArrowRight, Github, Twitter, Menu, X, Trophy, Users,
    Clock, Star, Eye, EyeOff, Mail, Lock, User, CheckCircle, Award, Target,
    Rocket, Brain, Crown, Flame, Globe, MessageSquare, Calendar,
    TrendingUp, ChevronRight, Play, Download, ExternalLink, HelpCircle,
    ChevronDown, ChevronUp, Award as AwardIcon, Code, DollarSign, BookOpen,
    Shield as ShieldIcon, Gift, Coins, BarChart3, Cpu, Database, Server
} from 'lucide-react';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState({});
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [activeFaq, setActiveFaq] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[id]').forEach(el => {
            if (el.id) observer.observe(el);
        });

        // Auto-rotate testimonials
        const testimonialInterval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);

        return () => {
            observer.disconnect();
            clearInterval(testimonialInterval);
        };
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuthSubmit = (e) => {
        e.preventDefault();
        console.log('Auth submission:', { mode: authMode, data: formData });
        setShowAuthModal(false);
    };

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const contests = [
        {
            title: "AI Revolution Challenge",
            description: "Build an innovative AI-powered application using modern ML frameworks. Create something that can change the world.",
            prize: "$10,000",
            participants: 2847,
            timeLeft: "18 days",
            difficulty: "Expert",
            tags: ["Python", "TensorFlow", "OpenAI", "FastAPI"],
            category: "Artificial Intelligence",
            featured: true,
            submissions: 245
        },
        {
            title: "Blockchain DeFi Protocol",
            description: "Develop a decentralized finance protocol with smart contracts, yield farming, and governance features.",
            prize: "$7,500",
            participants: 1456,
            timeLeft: "12 days",
            difficulty: "Advanced",
            tags: ["Solidity", "Web3", "React", "Hardhat"],
            category: "Blockchain",
            featured: false,
            submissions: 189
        },
        {
            title: "Mobile Gaming Experience",
            description: "Create an engaging mobile game with multiplayer capabilities, real-time chat, and in-app purchases.",
            prize: "$5,000",
            participants: 3201,
            timeLeft: "25 days",
            difficulty: "Intermediate",
            tags: ["Unity", "C#", "Firebase", "Photon"],
            category: "Game Development",
            featured: false,
            submissions: 412
        }
    ];

    const leaderboard = [
        { rank: 1, name: "Alex Chen", points: 15420, contests: 23, wins: 8, country: "🇺🇸", streak: 7 },
        { rank: 2, name: "Maria García", points: 14880, contests: 19, wins: 7, country: "🇪🇸", streak: 5 },
        { rank: 3, name: "Raj Patel", points: 14200, contests: 21, wins: 6, country: "🇮🇳", streak: 12 },
        { rank: 4, name: "Sophie Martin", points: 13950, contests: 17, wins: 9, country: "🇫🇷", streak: 3 },
        { rank: 5, name: "David Kim", points: 13750, contests: 25, wins: 5, country: "🇰🇷", streak: 8 }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Senior Full-Stack Developer",
            company: "Google",
            image: "👩‍💻",
            quote: "DevContest transformed my career. The challenges pushed me beyond my comfort zone and landed me my dream job.",
            rating: 5
        },
        {
            name: "Miguel Rodriguez",
            role: "Lead Frontend Engineer",
            company: "Meta",
            image: "👨‍💻",
            quote: "The quality of contests here is unmatched. Real-world problems with substantial rewards - exactly what developers need.",
            rating: 5
        },
        {
            name: "Priya Sharma",
            role: "AI/ML Engineer",
            company: "OpenAI",
            image: "👩‍🔬",
            quote: "Won $15K in my first month! The AI challenges helped me showcase skills that traditional interviews couldn't capture.",
            rating: 5
        }
    ];

    const achievements = [
        { icon: "🏆", title: "Contest Winner", description: "Win your first contest" },
        { icon: "🔥", title: "Hot Streak", description: "Win 3 contests in a row" },
        { icon: "💎", title: "Diamond Coder", description: "Reach 10,000 points" },
        { icon: "🚀", title: "Rocket Builder", description: "Submit 50 solutions" },
        { icon: "👑", title: "Code Royalty", description: "Top 10 global ranking" },
        { icon: "⚡", title: "Speed Demon", description: "Submit within 1 hour" }
    ];

    const stats = [
        { number: "125K+", label: "Active Developers", subtext: "Growing daily" },
        { number: "2,847", label: "Live Contests", subtext: "Right now" },
        { number: "$5.2M+", label: "Total Prizes", subtext: "Awarded this year" },
        { number: "99.99%", label: "Platform Uptime", subtext: "Always available" }
    ];

    const features = [
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Epic Prize Pool",
            description: "Compete for substantial cash prizes, job opportunities, and exclusive developer perks from top tech companies.",
            highlight: "$50K+ monthly prizes"
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Real-World Skills",
            description: "Tackle actual business problems used by Fortune 500 companies. Build your portfolio with meaningful projects.",
            highlight: "Industry-relevant challenges"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Global Community",
            description: "Connect with 125K+ developers worldwide. Network, learn, and grow with the best minds in technology.",
            highlight: "125K+ active members"
        }
    ];

    const upcomingEvents = [
        {
            title: "Global Hackathon 2024",
            date: "Dec 15-17, 2024",
            prize: "$100,000",
            participants: "5K+ expected",
            type: "48-hour sprint"
        },
        {
            title: "AI Innovation Summit",
            date: "Jan 20, 2025",
            prize: "Exclusive networking",
            participants: "1K+ attendees",
            type: "Virtual conference"
        },
        {
            title: "Blockchain Challenge Week",
            date: "Feb 1-7, 2025",
            prize: "$75,000",
            participants: "3K+ developers",
            type: "7-day challenge"
        }
    ];

    const technologyStack = [
        { name: "React", logo: "⚛️", users: "45K+" },
        { name: "Python", logo: "🐍", users: "52K+" },
        { name: "Node.js", logo: "💚", users: "38K+" },
        { name: "Go", logo: "🐹", users: "12K+" },
        { name: "Rust", logo: "🦀", users: "8K+" },
        { name: "TypeScript", logo: "📘", users: "41K+" },
        { name: "AWS", logo: "☁️", users: "29K+" },
        { name: "Docker", logo: "🐳", users: "33K+" }
    ];

    const faqs = [
        {
            question: "How do I participate in contests?",
            answer: "Simply create an account, browse the available contests, and click 'Join Contest' to participate. You'll have access to the problem statement, submission guidelines, and timeline."
        },
        {
            question: "How are winners selected?",
            answer: "Winners are selected based on multiple criteria including code quality, efficiency, creativity, and adherence to requirements. Our judging panel consists of industry experts who review all qualified submissions."
        },
        {
            question: "When and how do I get paid?",
            answer: "Prize payments are processed within 14 business days after a contest ends. We support multiple payment methods including bank transfer, PayPal, and cryptocurrency."
        },
        {
            question: "Can I participate as a team?",
            answer: "Yes, many contests allow team participation. You can form a team of up to 4 members. Each team member must have an individual account."
        },
        {
            question: "What languages and frameworks are supported?",
            answer: "We support all major programming languages and frameworks. Each contest specifies the allowed technologies in its requirements."
        },
        {
            question: "Is there a fee to participate?",
            answer: "Basic participation is free. We also offer premium contests with higher prizes for a small entry fee. All contest fees are clearly displayed before you join."
        },
        {
            question: "How do I improve my ranking?",
            answer: "Your ranking is based on your performance in contests. Consistently submitting high-quality solutions, winning contests, and maintaining a streak will improve your ranking."
        },
        {
            question: "What if I encounter technical issues?",
            answer: "We provide 24/7 technical support. If you encounter any issues during a contest, contact our support team immediately through the help center in your dashboard."
        }
    ];

    // Enhanced Creative Art Component
    const EnhancedGeometricArt = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated gradient orbs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Floating geometric shapes with enhanced animations */}
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-500/30 rotate-45 animate-spin-slow"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full animate-float" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-cyan-400/40 rotate-12 animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/5 w-28 h-28 border border-purple-400/30 rounded-full animate-spin-slow" style={{ animationDuration: '15s' }}></div>

            {/* Floating code elements with more variety */}
            <div className="absolute top-24 left-1/3 text-blue-400/30 font-mono text-lg animate-float font-bold">{"{ code }"}</div>
            <div className="absolute top-1/2 right-1/4 text-cyan-400/30 font-mono text-base animate-float" style={{ animationDelay: '1s' }}>{"npm run dev"}</div>
            <div className="absolute bottom-1/3 left-1/5 text-purple-400/30 font-mono text-sm animate-float" style={{ animationDelay: '2s' }}>{"git commit -m"}</div>
            <div className="absolute top-1/4 right-1/6 text-blue-300/30 font-mono text-lg animate-float" style={{ animationDelay: '3s' }}>{"function()"}</div>
            <div className="absolute bottom-1/2 left-1/6 text-cyan-300/30 font-mono text-base animate-float" style={{ animationDelay: '4s' }}>{"<Component />"}</div>

            {/* Enhanced grid pattern with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 25%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.2) 0%, transparent 25%),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '200px 200px, 200px 200px, 50px 50px, 50px 50px'
                }}
            ></div>

            {/* Particle effect */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Enhanced Custom CSS */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-gradient { animation: gradient-shift 3s ease infinite; background-size: 200% 200%; }
        .glass-effect { backdrop-filter: blur(20px); background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); }
      `}</style>

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-effect rounded-2xl p-8 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                {authMode === 'login' ? 'Welcome Back, Coder' : 'Join the Elite'}
                            </h2>
                            <button
                                onClick={() => setShowAuthModal(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAuthSubmit} className="space-y-4">
                            {authMode === 'register' && (
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:border-blue-500 focus:outline-none focus:bg-black/70 transition-all"
                                        required
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:border-blue-500 focus:outline-none focus:bg-black/70 transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg pl-12 pr-12 py-3 focus:border-blue-500 focus:outline-none focus:bg-black/70 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {authMode === 'register' && (
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:border-blue-500 focus:outline-none focus:bg-black/70 transition-all"
                                        required
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                            >
                                {authMode === 'login' ? 'Enter Arena' : 'Join Competition'}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <span className="text-gray-400">
                                {authMode === 'login' ? "New to the arena?" : "Already competing?"}
                            </span>
                            <button
                                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                                className="text-blue-400 hover:text-blue-300 ml-2 font-semibold transition-colors"
                            >
                                {authMode === 'login' ? 'Join Now' : 'Sign In'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Header */}
            <header className="fixed w-full top-0 z-40 glass-effect">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            DevContest
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#contests" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                            Contests
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#leaderboard" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                            Leaderboard
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#community" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                            Community
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#events" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                            Events
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                        </a>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => {
                                setAuthMode('login');
                                setShowAuthModal(true);
                            }}
                            className="text-gray-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/5"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => {
                                setAuthMode('register');
                                setShowAuthModal(true);
                            }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
                        >
                            Start Competing
                        </button>
                    </div>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Enhanced Hero Section */}
            <section id="hero" className="relative pt-32 pb-20 px-6 bg-black overflow-hidden min-h-screen flex items-center">
                <EnhancedGeometricArt />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 glass-effect rounded-full px-6 py-3 mb-8">
                            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                            <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                🔥 125K+ Developers Competing Live
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                                Code.
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                                Compete.
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                                Conquer.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join the world's most elite developer arena. Compete in real-world challenges,
                            <span className="text-blue-400 font-semibold"> win substantial prizes</span>, and
                            <span className="text-purple-400 font-semibold"> accelerate your career</span> with code that matters.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                            <div className="flex items-center gap-2 text-green-400">
                                <CheckCircle className="w-5 h-5" />
                                <span>$5.2M+ in prizes awarded</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span>4.9/5 developer rating</span>
                            </div>
                            <div className="flex items-center gap-2 text-purple-400">
                                <Globe className="w-5 h-5" />
                                <span>195+ countries participating</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button
                                onClick={() => {
                                    setAuthMode('register');
                                    setShowAuthModal(true);
                                }}
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/25"
                            >
                                <Trophy className="w-6 h-6" />
                                Join Elite Competition
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="group glass-effect px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 hover:bg-white/10">
                                <Play className="w-5 h-5" />
                                Watch Demo
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Stats Section */}
            <section id="stats" className="py-20 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-white font-semibold mb-1">{stat.label}</div>
                                    <div className="text-gray-400 text-sm">{stat.subtext}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack Section */}
            <section id="tech-stack" className="py-20 px-6 bg-zinc-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible['tech-stack'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Master Every Stack
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Compete across all major technologies and frameworks. From web to mobile, AI to blockchain.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                        {technologyStack.map((tech, index) => (
                            <div
                                key={index}
                                className={`glass-effect rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group transform ${isVisible['tech-stack'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tech.logo}</div>
                                <div className="font-semibold text-white mb-1">{tech.name}</div>
                                <div className="text-xs text-gray-400">{tech.users} users</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Contests Section */}
            <section id="contests" className="py-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.contests ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Live Contests
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Choose your battlefield. Every challenge is designed by industry experts and validated by top companies.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <div className="glass-effect rounded-full px-6 py-2 text-sm">
                                <span className="text-green-400">●</span> 42 Active Now
                            </div>
                            <div className="glass-effect rounded-full px-6 py-2 text-sm">
                                <span className="text-blue-400">●</span> $847K Total Prize Pool
                            </div>
                            <div className="glass-effect rounded-full px-6 py-2 text-sm">
                                <span className="text-purple-400">●</span> 12,450 Participants
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {contests.map((contest, index) => (
                            <div
                                key={index}
                                className={`group relative glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-[1.02] ${isVisible.contests ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${contest.featured ? 'ring-2 ring-blue-500/30' : ''}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {contest.featured && (
                                    <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        🔥 FEATURED
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-semibold">
                                            {contest.category}
                                        </span>
                                        <span className={`ml-2 text-xs px-3 py-1 rounded-full font-semibold ${contest.difficulty === 'Expert' ? 'bg-red-500/20 text-red-400' :
                                            contest.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                                                'bg-green-500/20 text-green-400'
                                            }`}>
                                            {contest.difficulty}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                            {contest.prize}
                                        </div>
                                        <div className="text-xs text-gray-400">Prize Pool</div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                                    {contest.title}
                                </h3>
                                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                                    {contest.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {contest.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="bg-gray-800/50 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                                            <Users className="w-3 h-3" />
                                            Participants
                                        </div>
                                        <div className="font-semibold text-white">{contest.participants.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                                            <Target className="w-3 h-3" />
                                            Submissions
                                        </div>
                                        <div className="font-semibold text-white">{contest.submissions}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                                            <Clock className="w-3 h-3" />
                                            Time Left
                                        </div>
                                        <div className="font-semibold text-orange-400">{contest.timeLeft}</div>
                                    </div>
                                </div>

                                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                                    <Trophy className="w-4 h-4" />
                                    Enter Contest
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="glass-effect hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
                            View All Contests
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Leaderboard Section */}
            <section id="leaderboard" className="py-24 px-6 bg-zinc-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.leaderboard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Global Champions
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Meet the coding legends who've mastered the art of competitive programming and won big.
                        </p>
                    </div>

                    <div className="glass-effect rounded-2xl p-8">
                        <div className="grid gap-4">
                            {leaderboard.map((player, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-6 rounded-xl transition-all duration-300 hover:bg-white/5 ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20' :
                                        index === 1 ? 'bg-gradient-to-r from-gray-400/10 to-gray-500/10 border border-gray-400/20' :
                                            index === 2 ? 'bg-gradient-to-r from-amber-600/10 to-yellow-600/10 border border-amber-600/20' :
                                                'bg-gray-800/20 hover:bg-gray-700/30'
                                        } transform ${isVisible.leaderboard ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' :
                                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                                                index === 2 ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white' :
                                                    'bg-gray-700 text-white'
                                            }`}>
                                            {index < 3 ? (
                                                index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'
                                            ) : (
                                                player.rank
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-white text-lg">{player.name}</span>
                                                <span className="text-lg">{player.country}</span>
                                                {player.streak > 5 && <Flame className="w-4 h-4 text-orange-500" />}
                                            </div>
                                            <div className="text-gray-400 text-sm">
                                                {player.contests} contests • {player.wins} wins • {player.streak} win streak
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            {player.points.toLocaleString()}
                                        </div>
                                        <div className="text-gray-400 text-sm">points</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 px-6 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Success Stories
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Real developers. Real results. Real career transformations.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="glass-effect rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
                            <div className="text-6xl mb-6">{testimonials[activeTestimonial].image}</div>
                            <blockquote className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                                "{testimonials[activeTestimonial].quote}"
                            </blockquote>
                            <div className="mb-6">
                                <div className="font-bold text-white text-lg">{testimonials[activeTestimonial].name}</div>
                                <div className="text-gray-400">{testimonials[activeTestimonial].role}</div>
                                <div className="text-blue-400 font-semibold">{testimonials[activeTestimonial].company}</div>
                            </div>
                            <div className="flex justify-center gap-1">
                                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                                        }`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section id="achievements" className="py-24 px-6 bg-zinc-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Unlock Achievements
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Build your reputation and showcase your skills with verified achievements and badges.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className={`glass-effect rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group transform ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{achievement.icon}</div>
                                <h3 className="font-bold text-white mb-2">{achievement.title}</h3>
                                <p className="text-gray-400 text-sm">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section id="events" className="py-24 px-6 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Upcoming Events
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Mark your calendar for these exclusive high-stakes competitions and networking events.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {upcomingEvents.map((event, index) => (
                            <div
                                key={index}
                                className={`glass-effect rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 group transform ${isVisible.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="flex items-center gap-2 text-blue-400 mb-4">
                                    <Calendar className="w-5 h-5" />
                                    <span className="text-sm font-semibold">{event.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {event.title}
                                </h3>
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Prize Pool:</span>
                                        <span className="text-green-400 font-semibold">{event.prize}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Expected:</span>
                                        <span className="text-white">{event.participants}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Format:</span>
                                        <span className="text-purple-400">{event.type}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                                    Register Interest
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section id="features" className="py-24 px-6 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Why Elite Developers Choose Us
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            More than just coding challenges. We're building the future of developer recognition and career advancement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-105 group ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                                <div className="text-sm font-semibold text-blue-400 bg-blue-500/10 rounded-full px-4 py-2 inline-block">
                                    {feature.highlight}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 px-6 bg-black">
                <div className="max-w-4xl mx-auto">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Frequently Asked Questions
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to know about competing on our platform.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`glass-effect rounded-xl overflow-hidden transition-all duration-300 ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <button
                                    className="flex items-center justify-between w-full p-6 text-left"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                                    {activeFaq === index ? (
                                        <ChevronUp className="w-5 h-5 text-blue-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                                {activeFaq === index && (
                                    <div className="px-6 pb-6 text-gray-300">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <div className="glass-effect rounded-xl p-8">
                            <HelpCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
                            <p className="text-gray-400 mb-6">Can't find the answer you're looking for? Please reach out to our support team.</p>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section id="cta" className="py-24 px-6 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        ></div>
                    ))}
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className={`transform transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-5xl md:text-6xl font-bold mb-8">
                            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                                Your Breakthrough
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                Awaits
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join 125,000+ elite developers who've transformed their careers through competitive coding.
                            <span className="text-blue-400 font-semibold"> Your next opportunity is just one contest away.</span>
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 mb-12">
                            <div className="glass-effect rounded-xl p-4">
                                <div className="text-2xl font-bold text-green-400">$50K+</div>
                                <div className="text-sm text-gray-400">Monthly Prizes</div>
                            </div>
                            <div className="glass-effect rounded-xl p-4">
                                <div className="text-2xl font-bold text-blue-400">24/7</div>
                                <div className="text-sm text-gray-400">Active Contests</div>
                            </div>
                            <div className="glass-effect rounded-xl p-4">
                                <div className="text-2xl font-bold text-purple-400">195+</div>
                                <div className="text-sm text-gray-400">Countries</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button
                                onClick={() => {
                                    setAuthMode('register');
                                    setShowAuthModal(true);
                                }}
                                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 px-12 py-5 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-2xl shadow-blue-500/25 animate-gradient"
                            >
                                <Rocket className="w-6 h-6" />
                                Start Your Journey
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="group glass-effect px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 hover:bg-white/10">
                                <Download className="w-5 h-5" />
                                Download Mobile App
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>

                        <div className="mt-12 text-sm text-gray-400">
                            🚀 Join now and get <span className="text-blue-400 font-semibold">3 free premium contest entries</span> +
                            <span className="text-purple-400 font-semibold"> exclusive welcome bonus!</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="py-20 px-6 bg-black border-t border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-12 mb-16">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    DevContest
                                </span>
                            </div>
                            <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                                The world's premier competitive programming platform. Where elite developers compete,
                                learn, and accelerate their careers through real-world challenges.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 glass-effect rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-12 h-12 glass-effect rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-12 h-12 glass-effect rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <MessageSquare className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-white text-lg">Platform</h4>
                            <div className="space-y-3">
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Live Contests</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Global Leaderboard</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Prize Pool</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Mobile App</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">API Access</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-white text-lg">Community</h4>
                            <div className="space-y-3">
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Discord Server</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Developer Blog</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Success Stories</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Mentorship</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Code Reviews</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-white text-lg">Resources</h4>
                            <div className="space-y-3">
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Tutorials</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Best Practices</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Career Guide</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                            </div>
                        </div>
                    </div>

                    <div className="glass-effect rounded-xl p-8 mb-12">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
                            <p className="text-gray-400 mb-6">Get notified about new contests, prizes, and exclusive developer opportunities.</p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                />
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-gray-800">
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 lg:mb-0">
                            <p className="text-gray-400 text-sm">
                                © 2024 DevContest. All rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-400">Made with 💙 for developers worldwide</div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-green-400">All systems operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;