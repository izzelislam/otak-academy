import MemberLayout from '@/Layouts/MemberLayout';
import { Head, Link } from '@inertiajs/react';
import ProgressBar from '@/Components/ProgressBar';

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

export default function MemberDashboard({ courses, stats }) {
    const totalCourses = courses?.length || 0;
    const completedCourses = courses?.filter(course => course.progress === 100).length || 0;
    const inProgressCourses = courses?.filter(course => course.progress > 0 && course.progress < 100).length || 0;
    const averageProgress = totalCourses > 0 
        ? Math.round(courses.reduce((sum, course) => sum + (course.progress || 0), 0) / totalCourses)
        : 0;

    return (
        <MemberLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <StatCard
                        icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                        label="Total Courses"
                        value={totalCourses}
                    />
                    <StatCard
                        icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        label="In Progress"
                        value={inProgressCourses}
                    />
                    <StatCard
                        icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label="Completed"
                        value={completedCourses}
                    />
                    <StatCard
                        icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        label="Avg Progress"
                        value={`${averageProgress}%`}
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={route('member.redeem.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Redeem Code
                        </Link>
                        <Link
                            href={route('member.courses.index')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
                        >
                            My Courses
                        </Link>
                        <Link
                            href={route('member.classes.index')}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
                        >
                            Browse Classes
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Continue Learning */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Continue Learning</h3>
                            <Link href={route('member.courses.index')} className="text-xs text-[#10a37f] hover:text-[#0e8c6b] font-medium">View all →</Link>
                        </div>
                        <div className="p-4">
                            {inProgressCourses > 0 ? (
                                <div className="space-y-3">
                                    {courses.filter(course => course.progress > 0 && course.progress < 100).slice(0, 3).map((course) => (
                                        <Link
                                            key={course.id}
                                            href={route('member.courses.show', course.id)}
                                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-slate-800 hover:border-[#10a37f]/30 dark:hover:border-[#10a37f]/30 transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center text-[#10a37f] font-medium text-xs">
                                                {course.title?.charAt(0).toUpperCase() || 'C'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex-1">
                                                        <ProgressBar percentage={course.progress || 0} showLabel={false} className="h-1.5" />
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-slate-400">{course.progress || 0}%</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">No courses in progress</p>
                                    <Link href={route('member.redeem.create')} className="text-sm text-[#10a37f] hover:text-[#0e8c6b] font-medium">Redeem your first course →</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Your Courses */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Your Courses</h3>
                            <Link href={route('member.courses.index')} className="text-xs text-[#10a37f] hover:text-[#0e8c6b] font-medium">View all →</Link>
                        </div>
                        <div className="p-4">
                            {courses && courses.length > 0 ? (
                                <div className="space-y-2">
                                    {courses.slice(0, 4).map((course) => (
                                        <div key={course.id} className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 hover:border-[#10a37f]/30 dark:hover:border-[#10a37f]/30 transition-colors">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <Link href={route('member.courses.show', course.id)} className="text-sm font-medium text-gray-900 dark:text-white hover:text-[#10a37f] transition-colors">
                                                        {course.title}
                                                    </Link>
                                                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                                                        <span>{course.sessions_count || 0} sessions</span>
                                                        <span>•</span>
                                                        <span>{course.progress || 0}% complete</span>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${course.progress === 100 ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' : course.progress > 0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                                    {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">No courses yet</p>
                                    <Link href={route('member.redeem.create')} className="text-sm text-[#10a37f] hover:text-[#0e8c6b] font-medium">Redeem your first course →</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MemberLayout>
    );
}
