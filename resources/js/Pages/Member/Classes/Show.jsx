import MemberLayout from '@/Layouts/MemberLayout';
import { Head, Link } from '@inertiajs/react';

export default function ClassShow({ course, isEnrolled }) {
    const totalMaterials = course.sessions?.reduce((acc, session) => acc + (session.materials?.length || 0), 0) || 0;

    return (
        <MemberLayout title={course.title}>
            <Head title={course.title} />

            <div className="space-y-6">
                {/* Back Button */}
                <Link
                    href={route('member.classes.index')}
                    className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-[#10a37f] transition-colors"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Kelas
                </Link>

                {/* Course Header */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                        {/* Thumbnail */}
                        <div className="sm:w-72 flex-shrink-0">
                            <div className="aspect-[4/3] sm:h-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                                {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-12 h-12 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Course Info */}
                        <div className="flex-1 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                {course.is_featured && (
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-semibold rounded">
                                        ⭐ Featured
                                    </span>
                                )}
                                {isEnrolled && (
                                    <span className="px-2 py-0.5 bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20 text-xs font-medium rounded">
                                        Enrolled
                                    </span>
                                )}
                            </div>

                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h1>

                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">
                                {course.description || 'Explore this comprehensive course and enhance your skills.'}
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-slate-400 mb-4">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    {course.sessions_count || course.sessions?.length || 0} Sessions
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    {totalMaterials} Materials
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    {course.enrolled_users_count || 0} Students
                                </div>
                            </div>

                            {/* Action Button */}
                            {isEnrolled ? (
                                <Link
                                    href={route('member.courses.show', course.id)}
                                    className="inline-flex items-center px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Mulai Belajar
                                </Link>
                            ) : (
                                <Link
                                    href={route('member.redeem.create')}
                                    className="inline-flex items-center px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                    Redeem Code
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Konten Kelas</h2>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                            {course.sessions?.length || 0} sessions • {totalMaterials} materials
                        </p>
                    </div>

                    {course.sessions && course.sessions.length > 0 ? (
                        <div className="divide-y divide-gray-100 dark:divide-slate-800">
                            {course.sessions.map((session, index) => (
                                <div key={session.id} className="px-4 py-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-7 h-7 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-medium text-[#10a37f]">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{session.title}</h3>
                                            {session.description && (
                                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                                    {session.description}
                                                </p>
                                            )}
                                            {session.materials && session.materials.length > 0 && (
                                                <div className="mt-2 space-y-1.5">
                                                    {session.materials.map((material) => (
                                                        <div
                                                            key={material.id}
                                                            className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400"
                                                        >
                                                            {material.type === 'video' && (
                                                                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            )}
                                                            {material.type === 'ebook' && (
                                                                <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                                </svg>
                                                            )}
                                                            {material.type === 'gmeet' && (
                                                                <svg className="w-3.5 h-3.5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                </svg>
                                                            )}
                                                            <span className="truncate">{material.title}</span>
                                                            {!isEnrolled && (
                                                                <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400 dark:text-slate-500">
                                            {session.materials?.length || 0} materi
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center">
                            <p className="text-sm text-gray-500 dark:text-slate-400">Belum ada konten untuk kelas ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </MemberLayout>
    );
}
