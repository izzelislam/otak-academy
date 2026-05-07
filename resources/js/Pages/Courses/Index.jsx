import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Seo from '@/Components/Seo';
import PublicFooter from '@/Components/PublicFooter';

function LockIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    );
}

function AcademicCapIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
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

function CourseCard({ course }) {
    return (
        <article className="group bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:bg-white/[0.04] dark:hover:border-white/[0.1] transition-all duration-300">
            <Link href={route('kelas.show', course.slug)} className="block aspect-square overflow-hidden">
                {course.thumbnail ? (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-white/[0.02] flex items-center justify-center">
                        <AcademicCapIcon className="w-16 h-16 text-gray-300 dark:text-white/20" />
                    </div>
                )}
            </Link>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full ${
                        course.access_type === 'free'
                            ? 'text-[#10a37f] bg-[#10a37f]/10'
                            : 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-400/10'
                    }`}>
                        {course.access_type === 'free' ? (
                            'Gratis'
                        ) : (
                            <>
                                <LockIcon className="w-3 h-3" />
                                Premium • Rp {new Intl.NumberFormat('id-ID').format(course.price || 0)}
                            </>
                        )}
                    </span>
                </div>
                <Link href={route('kelas.show', course.slug)}>
                    <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-[#10a37f] transition-colors line-clamp-2">
                        {course.title}
                    </h2>
                </Link>
                {course.description && (
                    <div className="text-[14px] text-gray-500 dark:text-white/50 leading-relaxed mb-4 line-clamp-2 [&>*]:m-0" dangerouslySetInnerHTML={{ __html: course.description }} />
                )}
                <div className="flex items-center justify-between text-[12px] text-gray-400 dark:text-white/40">
                    <span className="flex items-center gap-1">
                        <AcademicCapIcon className="w-3.5 h-3.5" />
                        {course.sessions_count || 0} materi
                    </span>
                    <span className="flex items-center gap-1">
                        <UsersIcon className="w-3.5 h-3.5" />
                        {course.enrolled_users_count || 0} siswa
                    </span>
                </div>
            </div>
        </article>
    );
}

function SkeletonCard() {
    return (
        <article className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200 dark:bg-white/[0.05]" />
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-white/[0.05] rounded-full" />
                </div>
                <div className="h-6 bg-gray-200 dark:bg-white/[0.05] rounded mb-2 w-3/4" />
                <div className="h-6 bg-gray-200 dark:bg-white/[0.05] rounded mb-4 w-1/2" />
                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-white/[0.05] rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-white/[0.05] rounded w-2/3" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="h-3 w-16 bg-gray-200 dark:bg-white/[0.05] rounded" />
                    <div className="h-3 w-20 bg-gray-200 dark:bg-white/[0.05] rounded" />
                </div>
            </div>
        </article>
    );
}

function Pagination({ data, setIsLoading }) {
    if (!data || !data.links || data.last_page <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-12">
            {data.links.map((link, i) => (
                <a
                    key={i}
                    href={link.url || '#'}
                    onClick={(e) => {
                        if (link.url) {
                            e.preventDefault();
                            setIsLoading(true);
                            router.get(link.url, {}, { onFinish: () => setIsLoading(false) });
                        }
                    }}
                    className={`px-3 py-2 text-[13px] rounded-lg transition-colors ${
                        link.active
                            ? 'bg-[#10a37f] text-white'
                            : link.url
                            ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 cursor-pointer'
                            : 'text-gray-300 dark:text-white/20 cursor-not-allowed'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function CoursesIndex({ courses, currentType, auth }) {
    const items = courses?.data || courses || [];
    const [isLoading, setIsLoading] = useState(false);

    const handleTypeFilter = (type) => {
        setIsLoading(true);
        if (type === currentType) {
            router.get(route('kelas.index'), {}, { onFinish: () => setIsLoading(false) });
        } else {
            router.get(route('kelas.index'), { type }, { onFinish: () => setIsLoading(false) });
        }
    };

    return (
        <>
            <Seo
                title="Kelas Online"
                description="Pelajari skill baru lewat kelas online terstruktur dan praktikal. Course video, materi lengkap, dan sertifikat."
                canonical={route('kelas.index')}
                keywords={['kelas online', 'course online', 'belajar programming', 'kursus web development', 'otakatikin kelas']}
            />
            <div className="public-shell">
                <Navbar auth={auth} />

                <section className="public-page-header border-b border-gray-200 dark:border-white/[0.06]">
                    <div className="public-container">
                        <div className="text-center max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-3 py-1 text-[12px] font-medium text-red-600 dark:text-red-400 mb-5">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                Live Class — Bukan Rekaman
                            </div>
                            <h1 className="text-[40px] sm:text-[56px] font-semibold tracking-[-0.02em] leading-[1.1]">
                                Kelas Live Online
                            </h1>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 dark:text-white/50 leading-relaxed">
                                Bukan kelas rekaman biasa. Ini kelas live interaktif via Zoom & YouTube — langsung praktik bareng instruktur, tanya jawab real-time, dan dapat feedback langsung.
                            </p>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">Live via Zoom</p>
                                        <p className="text-[11px] text-gray-500 dark:text-white/40 mt-0.5">Interaksi langsung, bukan nonton sendiri</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
                                    <div className="w-8 h-8 rounded-lg bg-[#10a37f]/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">Langsung Praktik</p>
                                        <p className="text-[11px] text-gray-500 dark:text-white/40 mt-0.5">Coding bareng, bukan cuma teori</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">Tanya Jawab</p>
                                        <p className="text-[11px] text-gray-500 dark:text-white/40 mt-0.5">Stuck? Langsung tanya instruktur</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => handleTypeFilter(null)}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors ${
                                    !currentType
                                        ? 'text-gray-900 bg-gray-100 dark:text-white dark:bg-white/10'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
                                }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => handleTypeFilter('free')}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors ${
                                    currentType === 'free'
                                        ? 'text-[#10a37f] bg-[#10a37f]/10'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
                                }`}
                            >
                                Gratis
                            </button>
                            <button
                                onClick={() => handleTypeFilter('premium')}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                                    currentType === 'premium'
                                        ? 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-400/10'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
                                }`}
                            >
                                <LockIcon className="w-3.5 h-3.5" />
                                Premium
                            </button>
                        </div>
                    </div>
                </section>

                <section className="public-section">
                    <div className="public-container">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : items.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((course) => <CourseCard key={course.id} course={course} />)}
                                </div>
                                <Pagination data={courses} setIsLoading={setIsLoading} />
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-white/[0.05] flex items-center justify-center">
                                    <AcademicCapIcon className="w-8 h-8 text-gray-400 dark:text-white/40" />
                                </div>
                                <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-2">Belum ada kelas</h3>
                                <p className="text-[14px] text-gray-500 dark:text-white/50">Kelas akan segera tersedia. Stay tuned!</p>
                            </div>
                        )}
                    </div>
                </section>

                <PublicFooter />
            </div>
        </>
    );
}
