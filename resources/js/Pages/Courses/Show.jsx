import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Seo from '@/Components/Seo';
import PublicFooter from '@/Components/PublicFooter';

export default function CourseShow({ course, auth }) {
    const allMaterials = course.sessions?.flatMap(s => s.materials || []) || [];
    const totalSubMaterials = allMaterials.reduce((acc, m) => acc + (m.sub_materials?.length || 0), 0);

    return (
        <>
            <Seo
                title={course.title}
                description={course.description?.replace(/<[^>]*>/g, '').slice(0, 160) || `Kelas online: ${course.title}`}
                canonical={route('kelas.show', course.slug)}
            />
            <div className="public-shell">
                <Navbar auth={auth} />

                <section className="public-section">
                    <div className="public-container">
                        <Link href={route('kelas.index')} className="inline-flex items-center gap-1.5 text-[14px] text-gray-500 dark:text-white/50 hover:text-[#10a37f] transition-colors mb-8">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            Kembali ke Kelas
                        </Link>

                        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
                            <div>
                                {course.thumbnail && (
                                    <div className="aspect-square rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-white/[0.08]">
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mb-4">
                                    {course.access_type === 'premium' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-400/10">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                                            Premium
                                        </span>
                                    )}
                                    {course.access_type === 'free' && (
                                        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full text-[#10a37f] bg-[#10a37f]/10">Gratis</span>
                                    )}
                                </div>

                                <h1 className="text-[28px] sm:text-[36px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em] leading-tight">
                                    {course.title}
                                </h1>

                                {course.description && (
                                    <div className="mt-6 prose prose-gray dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
                                )}

                                {allMaterials.length > 0 && (
                                    <div className="mt-10">
                                        <h2 className="text-[20px] font-semibold text-gray-900 dark:text-white mb-4">Konten Kelas</h2>
                                        <p className="text-[14px] text-gray-500 dark:text-white/50 mb-6">{allMaterials.length} materi • {totalSubMaterials} sub-materi</p>
                                        <div className="space-y-3">
                                            {allMaterials.map((material, index) => (
                                                <div key={material.id} className="border border-gray-200 dark:border-white/[0.08] rounded-xl p-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-7 h-7 rounded-full bg-[#10a37f]/10 flex items-center justify-center text-xs font-bold text-[#10a37f]">{index + 1}</div>
                                                        <span className="text-[15px] font-medium text-gray-900 dark:text-white">{material.title}</span>
                                                        <span className="text-[12px] text-gray-400 dark:text-white/30">{material.sub_materials?.length || 0} sub-materi</span>
                                                    </div>
                                                    {material.sub_materials?.length > 0 && (
                                                        <div className="ml-10 space-y-1.5">
                                                            {material.sub_materials.map((sub) => (
                                                                <div key={sub.id} className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-white/50">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20 flex-shrink-0" />
                                                                    <span>{sub.title}</span>
                                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/[0.05] text-gray-400 dark:text-white/30">{sub.type}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="lg:sticky lg:top-8 lg:self-start">
                                <div className="border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 bg-white dark:bg-white/[0.02]">
                                    <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-4">Detail Kelas</h3>
                                    <dl className="space-y-3 text-[14px]">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500 dark:text-white/50">Materi</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white">{allMaterials.length}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500 dark:text-white/50">Sub-Materi</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white">{totalSubMaterials}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500 dark:text-white/50">Siswa</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white">{course.enrolled_users_count || 0}</dd>
                                        </div>
                                        {course.access_type === 'premium' && course.price > 0 && (
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500 dark:text-white/50">Harga</dt>
                                                <dd className="font-bold text-amber-600 dark:text-amber-400">Rp {new Intl.NumberFormat('id-ID').format(course.price)}</dd>
                                            </div>
                                        )}
                                    </dl>

                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/[0.08]">
                                        {auth?.user ? (
                                            <Link
                                                href={route('member.classes.show', course.id)}
                                                className={`block w-full text-center px-5 py-3 text-[14px] font-medium text-white rounded-xl transition-colors ${
                                                    course.access_type === 'premium' 
                                                        ? 'bg-amber-500 hover:bg-amber-600' 
                                                        : 'bg-[#10a37f] hover:bg-[#0d8b6c]'
                                                }`}
                                            >
                                                {course.access_type === 'premium' ? `Beli Kelas — Rp ${new Intl.NumberFormat('id-ID').format(course.price)}` : 'Mulai Belajar Gratis'}
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route('login')}
                                                className="block w-full text-center px-5 py-3 text-[14px] font-medium text-white bg-[#10a37f] hover:bg-[#0d8b6c] rounded-xl transition-colors"
                                            >
                                                Login untuk Akses Kelas
                                            </Link>
                                        )}
                                        {!auth?.user && (
                                            <p className="mt-3 text-center text-[12px] text-gray-400 dark:text-white/30">
                                                Belum punya akun? <Link href={route('register')} className="text-[#10a37f] hover:underline">Daftar gratis</Link>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <PublicFooter />
            </div>
        </>
    );
}
