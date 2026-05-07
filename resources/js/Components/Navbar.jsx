import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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

// ... (imports remain the same)
function MenuIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );
}

function XMarkIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}

function EnvelopeIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
    );
}

function SparklesIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18l-.813-2.096a4.5 4.5 0 0 0-2.291-2.291L3.75 12l2.146-.813a4.5 4.5 0 0 0 2.291-2.291L9 6.75l.813 2.146a4.5 4.5 0 0 0 2.291 2.291L14.25 12l-2.146.813a4.5 4.5 0 0 0-2.291 2.291ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 0 0 2.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
    );
}

export default function Navbar({ auth = {} }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }

        const previousOverflow = document.body.style.overflow;

        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = previousOverflow || '';
        }

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [mobileMenuOpen]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const user = auth?.user || auth?.props?.auth?.user || null;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
            isScrolled || mobileMenuOpen ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10' : 'bg-transparent'
        }`}>
            <div className="public-container">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="z-50 flex min-w-0 items-center gap-2">
                        <img src="/favicon/favicon-96x96.png" alt="OtakAtikin" className="h-8 w-8 flex-shrink-0" />
                        <span className="truncate text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white">OtakAtikin</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <Link
                            href={route('blog.index')}
                            className="px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href={route('member.classes.index')}
                            className="px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Kelas
                        </Link>
                        <Link
                            href={route('assets.index')}
                            className="px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Produk Digital
                        </Link>
                        <Link
                            href={route('ebook-generator')}
                            className="flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <SparklesIcon className="w-4 h-4" />
                            Ebook Generator AI
                        </Link>
                        <Link
                            href={route('contact')}
                            className="flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <EnvelopeIcon className="w-4 h-4" />
                            Kontak
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
                                    className="rounded-lg bg-black px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                >
                                    Mulai Gratis
                                </Link>
                            </>
                        )}
                    </nav>
                    
                    {/* Mobile Menu Button - Visible on Mobile Only */}
                    <div className="flex items-center gap-1.5 lg:hidden">
                        <button
                            onClick={toggleTheme}
                            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                            aria-label="Toggle theme"
                        >
                             {theme === 'dark' ? (
                                <SunIcon className="w-5 h-5" />
                            ) : (
                                <MoonIcon className="w-5 h-5" />
                            )}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <MenuIcon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="border-t border-gray-200 bg-white dark:border-white/10 dark:bg-black lg:hidden">
                    <div className="public-container min-h-[calc(100svh-4rem)] overflow-y-auto py-5">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href={route('blog.index')}
                                className="text-base font-medium text-gray-900 dark:text-white hover:text-[#10a37f] dark:hover:text-[#10a37f]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href={route('member.classes.index')}
                                className="text-base font-medium text-gray-900 dark:text-white hover:text-[#10a37f] dark:hover:text-[#10a37f]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Kelas
                            </Link>
                            <Link
                                href={route('assets.index')}
                                className="text-base font-medium text-gray-900 dark:text-white hover:text-[#10a37f] dark:hover:text-[#10a37f]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Produk Digital
                            </Link>
                            <Link
                                href={route('ebook-generator')}
                                className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-white hover:text-[#10a37f] dark:hover:text-[#10a37f]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <SparklesIcon className="w-5 h-5" />
                                Ebook Generator AI
                            </Link>
                            <Link
                                href={route('contact')}
                                className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-white hover:text-[#10a37f] dark:hover:text-[#10a37f]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <EnvelopeIcon className="w-5 h-5" />
                                Kontak
                            </Link>

                            <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col space-y-3">
                                {user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white bg-black dark:bg-white/10 rounded-lg"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-gray-600 dark:bg-white/20 flex items-center justify-center text-[10px] font-bold uppercase text-white">
                                                {user.name.charAt(0)}
                                            </div>
                                        )}
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="w-full text-center py-2.5 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="w-full text-center py-2.5 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-white/90"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Mulai Gratis
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
