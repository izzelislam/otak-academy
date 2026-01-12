import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

function HomeIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    );
}

function ArrowLeftIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
    );
}

function SunIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
    );
}

function MoonIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
    );
}

function MenuIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );
}

function XIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}

export default function LearningLayout({ 
    children, 
    course, 
    material, 
    sidebar 
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode.toString());
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
                        onClick={() => setSidebarOpen(false)} 
                    />
                    <div className="fixed inset-y-0 left-0 flex w-[280px] flex-col bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800">
                        <div className="flex h-14 items-center justify-between px-4 border-b border-gray-200 dark:border-slate-800">
                            <span className="text-[15px] font-semibold text-gray-900 dark:text-white">Course Content</span>
                            <button 
                                onClick={() => setSidebarOpen(false)} 
                                className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <XIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {sidebar}
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[280px] lg:flex-col">
                <div className="flex flex-col flex-grow bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800">
                    <div className="flex h-14 items-center px-4 border-b border-gray-200 dark:border-slate-800">
                        <span className="text-[15px] font-semibold text-gray-900 dark:text-white">Course Content</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {sidebar}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-[280px] flex flex-col min-h-screen">
                {/* Top header */}
                <header className="sticky top-0 z-30 bg-gray-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
                    <div className="flex h-14 items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <MenuIcon className="h-5 w-5" />
                            </button>
                            
                            <Link
                                href={route('member.courses.show', course?.id)}
                                className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                title="Back to course"
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </Link>

                            <div className="flex flex-col">
                                <h1 className="text-[15px] font-semibold text-gray-900 dark:text-white truncate max-w-[300px]">
                                    {course?.title}
                                </h1>
                                {material && (
                                    <p className="text-[12px] text-gray-500 dark:text-slate-400 truncate max-w-[300px]">
                                        {material.title}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                            </button>

                            <Link
                                href={route('member.dashboard')}
                                className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                title="Back to dashboard"
                            >
                                <HomeIcon className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content area */}
                <main className="flex-1 bg-gray-50 dark:bg-slate-950">
                    {children}
                </main>
            </div>
        </div>
    );
}
