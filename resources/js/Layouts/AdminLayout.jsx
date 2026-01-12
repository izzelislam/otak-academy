import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import LogoutModal from '@/Components/LogoutModal';

const navigation = [
    { name: 'Dashboard', href: 'admin.dashboard', icon: HomeIcon },
    { name: 'Courses', href: 'admin.courses.index', icon: BookIcon },
    { name: 'Members', href: 'admin.members.index', icon: UsersIcon },
    { name: 'Redeem Codes', href: 'admin.redeem-codes.index', icon: TicketIcon },
    { name: 'Blog', href: 'admin.blogs.index', icon: DocumentIcon },
    { name: 'Assets', href: 'admin.assets.index', icon: DownloadIcon },
    { name: 'Calendar', href: 'admin.content-calendars.index', icon: CalendarIcon },
    { name: 'Audit Logs', href: 'admin.audit-logs.index', icon: ShieldIcon },
];

function CalendarIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
    );
}

function HomeIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    );
}

function BookIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
    );
}

function UsersIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
    );
}

function TicketIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
    );
}

function DocumentIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    );
}

function DownloadIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
    );
}

function ShieldIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
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

function LogoutIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
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

export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const isActive = (routeName) => {
        return route().current(routeName) || route().current(routeName + '.*');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
                        onClick={() => setSidebarOpen(false)} 
                    />
                    <div className="fixed inset-y-0 left-0 flex w-[280px] flex-col bg-slate-900">
                        <div className="flex h-14 items-center justify-between px-4 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <img src="/favicon/favicon-96x96.png" alt="Logo" className="w-8 h-8" />
                                <span className="text-[15px] font-semibold text-white">OtakAtikin</span>
                            </div>
                            <button 
                                onClick={() => setSidebarOpen(false)} 
                                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                            >
                                <XIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={route(item.href)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-[#10a37f]/20 text-[#10a37f]'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-3 border-t border-slate-800">
                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#10a37f] to-emerald-600 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-medium text-white">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-medium text-white truncate">{auth.user.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[260px] lg:flex-col">
                <div className="flex flex-col flex-grow bg-slate-900">
                    <div className="flex h-14 items-center px-4 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <img src="/favicon/favicon-96x96.png" alt="Logo" className="w-8 h-8" />
                            <span className="text-[15px] font-semibold text-white">OtakAtikin</span>
                        </div>
                    </div>
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={route(item.href)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] transition-colors ${
                                    isActive(item.href)
                                        ? 'bg-[#10a37f]/20 text-[#10a37f]'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="p-3 border-t border-slate-800">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#10a37f] to-emerald-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-medium text-white">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-white truncate">{auth.user.name}</p>
                                <p className="text-[11px] text-slate-400 truncate">{auth.user.email}</p>
                            </div>
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                                title="Logout"
                            >
                                <LogoutIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-[260px]">
                {/* Top navbar */}
                <header className="sticky top-0 z-30 bg-gray-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
                    <div className="flex h-14 items-center justify-between px-4 sm:px-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <MenuIcon className="h-5 w-5" />
                            </button>
                            {title && (
                                <h1 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                                    {title}
                                </h1>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                            </button>
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setShowLogoutModal(true)}
                                    className="p-2 text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <LogoutIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8 max-w-7xl m-auto">
                    {children}
                </main>
            </div>

            {/* Logout Modal */}
            <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
        </div>
    );
}
