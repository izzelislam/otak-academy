import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

function AcademicCapIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
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

export default function Navbar({ auth = {} }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState(
        () => {
            if (typeof window !== 'undefined') {
                return localStorage.getItem('theme') || 'dark';
            }
            return 'dark';
        }
    );

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const user = auth?.user || auth?.props?.auth?.user || null;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
            isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10' : 'bg-transparent'
        }`}>
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/favicon/favicon-96x96.png" alt="OtakAtikin" className="h-8 w-8" />
                        <span className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white">OtakAtikin</span>
                    </Link>
                    <nav className="flex items-center gap-1">
                        <Link
                            href={route('blog.index')}
                            className="px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href={route('assets.index')}
                            className="px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Produk Digital
                        </Link>

                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-white/60 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10 mr-1"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <SunIcon className="w-5 h-5" />
                            ) : (
                                <MoonIcon className="w-5 h-5" />
                            )}
                        </button>

                        {user ? (
                            <Link
                                href={route('dashboard')}
                                className="flex items-center gap-2 pl-2 pr-4 py-1.5 text-[14px] font-medium text-white bg-black hover:bg-gray-800 dark:bg-white/10 dark:hover:bg-white/15 rounded-full transition-colors"
                            >
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-gray-600 dark:bg-white/20 flex items-center justify-center text-[10px] font-bold uppercase text-white">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 text-[14px] font-medium text-white bg-black hover:bg-gray-800 dark:text-black dark:bg-white dark:hover:bg-white/90 rounded-lg transition-colors"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
