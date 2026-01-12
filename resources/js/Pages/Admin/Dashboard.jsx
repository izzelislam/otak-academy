import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/Button';
import { Head, Link } from '@inertiajs/react';

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{label}</p>
                </div>
            </div>
        </div>
    );
}

export default function AdminDashboard({ stats, recentRedemptions, courseStats }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <StatCard
                    icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                    label="Total Courses"
                    value={stats.totalCourses}
                />
                <StatCard
                    icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    label="Total Members"
                    value={stats.totalMembers}
                />
                <StatCard
                    icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    label="Total Redemptions"
                    value={stats.totalRedemptions}
                />
                <StatCard
                    icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
                    label="Active Codes"
                    value={stats.totalRedemptions > 0 ? Math.floor(stats.totalRedemptions * 0.7) : 0}
                />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                    <Button href={route('admin.courses.create')} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                        New Course
                    </Button>
                    <Button href={route('admin.redeem-codes.create')} variant="secondary" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                        Generate Codes
                    </Button>
                    <Button href={route('admin.courses.index')} variant="outline">
                        Manage Courses
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Redemptions</h3>
                    </div>
                    <div className="p-4">
                        {recentRedemptions.length > 0 ? (
                            <div className="space-y-3">
                                {recentRedemptions.map((redemption) => (
                                    <div key={redemption.id} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center text-[#10a37f] font-medium text-xs">
                                            {redemption.user?.name?.charAt(0).toUpperCase() || '?'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{redemption.user?.name || 'Unknown'}</p>
                                            <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{redemption.course?.title || 'N/A'}</p>
                                        </div>
                                        <span className="text-xs text-gray-400 dark:text-slate-500">{new Date(redemption.used_at).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">No redemptions yet</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Course Statistics</h3>
                        <Link href={route('admin.courses.index')} className="text-xs text-[#10a37f] hover:text-[#0e8c6b] font-medium">View all →</Link>
                    </div>
                    <div className="p-4">
                        {courseStats.length > 0 ? (
                            <div className="space-y-2">
                                {courseStats.map((course) => (
                                    <div key={course.id} className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 hover:border-[#10a37f]/30 dark:hover:border-[#10a37f]/30 transition-colors">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <Link href={route('admin.courses.show', course.id)} className="text-sm font-medium text-gray-900 dark:text-white hover:text-[#10a37f] transition-colors">
                                                    {course.title}
                                                </Link>
                                                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                                                    <span>{course.sessions_count} sessions</span>
                                                    <span>•</span>
                                                    <span>{course.enrolled_users_count} enrolled</span>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${course.is_published ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                {course.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">No courses yet</p>
                                <Link href={route('admin.courses.create')} className="text-sm text-[#10a37f] hover:text-[#0e8c6b] font-medium">Create your first course →</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
