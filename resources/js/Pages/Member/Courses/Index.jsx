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

export default function CoursesIndex({ courses }) {
    const totalCourses = courses?.length || 0;
    const completedCourses = courses?.filter(course => course.progress === 100).length || 0;
    const inProgressCourses = courses?.filter(course => course.progress > 0 && course.progress < 100).length || 0;

    return (
        <MemberLayout title="My Courses">
            <Head title="My Courses" />

            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
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
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Add New Course</h3>
                        <Link
                            href={route('member.redeem.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Redeem Code
                        </Link>
                    </div>
                </div>

                {/* Courses Grid */}
                {courses && courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.map((course) => (
                            <div key={course.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden hover:border-[#10a37f]/30 dark:hover:border-[#10a37f]/30 transition-colors">
                                <div className="relative">
                                    <div className="aspect-video bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                                        {course.thumbnail ? (
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg className="w-10 h-10 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        )}
                                    </div>
                                    
                                    {/* Progress Badge */}
                                    <div className="absolute top-3 right-3">
                                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                                            course.progress === 100 
                                                ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' 
                                                : course.progress > 0 
                                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                    : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400'
                                        }`}>
                                            {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">
                                        {course.description || 'Explore this comprehensive course and enhance your skills.'}
                                    </p>
                                    
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-500 dark:text-slate-400">Progress</span>
                                            <span className="text-xs font-medium text-gray-900 dark:text-white">{course.progress || 0}%</span>
                                        </div>
                                        <ProgressBar 
                                            percentage={course.progress || 0} 
                                            showLabel={false}
                                            className="h-1.5"
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-xs text-gray-500 dark:text-slate-400">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {course.sessions_count || 0} sessions
                                        </div>
                                        <Link
                                            href={route('member.courses.show', course.id)}
                                            className="inline-flex items-center px-3 py-1.5 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-xs font-medium rounded-lg transition-colors"
                                        >
                                            {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-8">
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses yet</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                                You haven't enrolled in any courses yet. Redeem a course code to begin your learning journey.
                            </p>
                            <Link
                                href={route('member.redeem.create')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white font-medium rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                                Redeem Your First Course
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </MemberLayout>
    );
}
