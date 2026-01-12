import MemberLayout from '@/Layouts/MemberLayout';
import { Head, Link } from '@inertiajs/react';

function CourseCard({ course }) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden hover:border-[#10a37f]/30 dark:hover:border-[#10a37f]/30 transition-colors">
            <div className="relative">
                <div className="aspect-video bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                    {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                        <svg className="w-10 h-10 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    )}
                </div>
                {course.is_enrolled && (
                    <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20">
                            Enrolled
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {course.description || 'Explore this comprehensive course and enhance your skills.'}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-slate-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.sessions_count || 0} sessions
                    </div>
                    <Link
                        href={route('member.classes.show', course.id)}
                        className="inline-flex items-center px-3 py-1.5 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-xs font-medium rounded-lg transition-colors"
                    >
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}

function FeaturedCourseCard({ course }) {
    return (
        <div className="relative bg-gradient-to-r from-[#10a37f] to-emerald-600 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative flex flex-col sm:flex-row">
                <div className="sm:w-72 flex-shrink-0">
                    <div className="aspect-video sm:h-full bg-black/20 flex items-center justify-center">
                        {course.thumbnail ? (
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                        ) : (
                            <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        )}
                    </div>
                </div>
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-semibold rounded">
                            ⭐ Featured
                        </span>
                        {course.is_enrolled && (
                            <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded">
                                Enrolled
                            </span>
                        )}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">{course.title}</h2>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                        {course.description || 'Explore this comprehensive course and enhance your skills.'}
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-white/70 text-xs">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.sessions_count || 0} sessions
                        </div>
                        <Link
                            href={route('member.classes.show', course.id)}
                            className="inline-flex items-center px-4 py-2 bg-white text-[#10a37f] text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Lihat Detail
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ClassesIndex({ featuredCourses, courses }) {
    const allCourses = [...(featuredCourses || []), ...(courses || [])];
    const totalCourses = allCourses.length;

    return (
        <MemberLayout title="Kelas">
            <Head title="Kelas" />

            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Kelas</h1>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
                                Jelajahi {totalCourses} kelas yang tersedia
                            </p>
                        </div>
                        <Link
                            href={route('member.redeem.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Redeem Code
                        </Link>
                    </div>
                </div>

                {/* Featured Courses */}
                {featuredCourses && featuredCourses.length > 0 && (
                    <div className="space-y-4">
                        {featuredCourses.map((course) => (
                            <FeaturedCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}

                {/* All Courses */}
                {courses && courses.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Semua Kelas</h2>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {courses.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {totalCourses === 0 && (
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-8">
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada kelas</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                                Kelas akan segera tersedia. Silakan cek kembali nanti.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </MemberLayout>
    );
}
