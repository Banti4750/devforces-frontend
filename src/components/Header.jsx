import React from 'react'
import { useAuth } from '../provider/AuthProvider'
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';



const Header = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        toast.success("Logout Sucessfully !!!")
        logout();
    };

    const isProblemsActive =
        location.pathname === "/problem" ||
        location.pathname.startsWith("/problem/");

    console.log(user)
    return (
        <div className="bg-leetcode-dark-sidebar border-b border-stone-600 h-16 w-full">
            <div className='flex justify-between items-center h-full px-6'>
                {/* logo part */}
                <div className="flex-shrink-0">
                    <p className='text-leetcode-dark-text text-2xl font-bold'>Devforces</p>
                </div>

                {/* navigation */}
                <nav className='hidden md:flex gap-8'>
                    <a href="/problem" className={`transition-colors duration-200 ${isProblemsActive
                        ? "text-leetcode-dark-text "
                        : "text-leetcode-dark-muted hover:text-leetcode-dark-text"
                        }`}>
                        Problems
                    </a>
                    <a href="/contest" className='text-leetcode-dark-muted hover:text-leetcode-dark-text transition-colors duration-200'>
                        Contests
                    </a>
                    <a href="/leaderboard" className='text-leetcode-dark-muted hover:text-leetcode-dark-text transition-colors duration-200'>
                        Leaderboard
                    </a>
                    <a href="/tutorial" className='text-leetcode-dark-muted hover:text-leetcode-dark-text transition-colors duration-200'>
                        Tutorial
                    </a>
                    <a href="/practice" className='text-leetcode-dark-muted hover:text-leetcode-dark-text transition-colors duration-200'>
                        Practice
                    </a>
                </nav>

                {/* profile */}
                <div className='flex items-center gap-2 flex-shrink-0'>
                    {user && (
                        <>
                            <span className='text-leetcode-dark-text hidden sm:inline'>
                                Welcome,
                            </span>
                            <button
                                className='text-leetcode-dark-muted hover:text-leetcode-dark-text transition-colors duration-200 px-2 py-1 rounded hover:bg-stone-700'
                            >
                                {user.name || "User"}
                            </button>
                            <span className='text-leetcode-dark-muted hidden sm:inline'>|</span>
                            <button
                                onClick={handleLogout}
                                className='text-leetcode-dark-muted hover:text-leetcode-dark-text transition-colors duration-200 px-2 py-1 rounded hover:bg-stone-700'
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Header