import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import { BackLink } from '@/Components/Admin/FormCard';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CourseShow({ course }) {
    const typeIcons = { video: '🎬', text: '📝', pdf: '📄', ebook: '📚', gmeet: '🎥', document: '📎' };
    const firstSession = course.sessions?.[0];
    const allMaterials = course.sessions?.flatMap(s => s.materials || []) || [];
    const totalSubMaterials = allMaterials.reduce((acc, m) => acc + (m.sub_materials?.length || 0), 0);

    const [expanded, setExpanded] = useState({});
    const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

    const handleDeleteMaterial = (sessionId, materialId) => confirm('Hapus materi ini beserta semua sub-materinya?') && router.delete(route('admin.courses.sessions.materials.destroy', [course.id, sessionId, materialId]));
    const handleDeleteSubMaterial = (materialId, subMaterialId) => confirm('Hapus sub-materi ini?') && router.delete(route('admin.courses.materials.sub-materials.destroy', [course.id, materialId, subMaterialId]));

    return (
        <AdminLayout title={course.title}>
            <Head title={course.title} />

            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <BackLink href={route('admin.courses.index')}>Courses</BackLink>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${course.is_published ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {course.is_published ? 'Published' : 'Draft'}
                    </span>
                </div>
                <Button href={route('admin.courses.edit', course.id)} variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}>
                    Edit
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Detail Course</h3>
                    <dl className="space-y-3 text-sm">
                        <div>
                            <dt className="text-xs text-gray-500 dark:text-slate-400">Slug</dt>
                            <dd className="mt-0.5 font-mono bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded text-gray-900 dark:text-white">/{course.slug}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-gray-500 dark:text-slate-400">Deskripsi</dt>
                            <dd className="mt-0.5 text-gray-900 dark:text-white">
                                {course.description ? (
                                    <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
                                ) : (
                                    <span className="text-gray-400 dark:text-slate-500 italic">Tidak ada deskripsi</span>
                                )}
                            </dd>
                        </div>
                        {course.thumbnail && (
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Thumbnail</dt>
                                <dd className="mt-1"><img src={course.thumbnail} alt={course.title} className="h-24 w-auto rounded" /></dd>
                            </div>
                        )}
                    </dl>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Statistik</h3>
                    <div className="space-y-2">
                        {[
                            { label: 'Materi', value: allMaterials.length },
                            { label: 'Sub-Materi', value: totalSubMaterials },
                            { label: 'Enrolled', value: course.enrolled_users_count || 0 },
                            { label: 'Codes', value: course.redeem_codes_count || 0 },
                        ].map(stat => (
                            <div key={stat.label} className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-slate-800">
                                <span className="text-xs text-gray-600 dark:text-slate-400">{stat.label}</span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Daftar Materi</h3>
                    {firstSession && (
                        <Button href={route('admin.courses.sessions.materials.create', [course.id, firstSession.id])} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                            Tambah Materi
                        </Button>
                    )}
                </div>
                <div className="p-4">
                    {allMaterials.length > 0 ? (
                        <div className="space-y-2">
                            {allMaterials.map((material, index) => (
                                <div key={material.id} className="border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden">
                                    <div
                                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
                                        onClick={() => toggle(material.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="w-7 h-7 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center text-xs font-bold text-[#10a37f]">{index + 1}</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{material.title}</span>
                                            <span className="text-xs text-gray-500 dark:text-slate-400">({material.sub_materials?.length || 0} sub-materi)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={route('admin.courses.materials.sub-materials.create', [course.id, material.id])}
                                                onClick={e => e.stopPropagation()}
                                                className="px-2 py-1 text-xs text-[#10a37f] hover:bg-[#10a37f]/10 rounded font-medium"
                                            >
                                                + Sub-Materi
                                            </Link>
                                            <IconButton as={Link} href={route('admin.courses.sessions.materials.edit', [course.id, firstSession?.id, material.id])} onClick={e => e.stopPropagation()}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </IconButton>
                                            <IconButton variant="danger" onClick={e => { e.stopPropagation(); handleDeleteMaterial(firstSession?.id, material.id); }}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </IconButton>
                                            <svg className={`w-4 h-4 text-gray-400 dark:text-slate-500 transition-transform ${expanded[material.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>

                                    {expanded[material.id] && (
                                        <div className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                                            {material.sub_materials?.length > 0 ? (
                                                <div className="space-y-1.5">
                                                    {material.sub_materials.map((sub, subIndex) => (
                                                        <div key={sub.id} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800">
                                                            <div className="flex items-center gap-2.5">
                                                                <span className="text-xs text-gray-400 dark:text-slate-500 w-5 text-center">{subIndex + 1}.</span>
                                                                <span>{typeIcons[sub.type] || '📎'}</span>
                                                                <span className="text-sm text-gray-900 dark:text-white">{sub.title}</span>
                                                                <span className="px-1.5 py-0.5 text-[10px] bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 rounded-full uppercase font-medium">{sub.type}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <IconButton as={Link} href={route('admin.courses.materials.sub-materials.edit', [course.id, material.id, sub.id])}>
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                                </IconButton>
                                                                <IconButton variant="danger" onClick={() => handleDeleteSubMaterial(material.id, sub.id)}>
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-center py-4 text-xs text-gray-500 dark:text-slate-400">
                                                    Belum ada sub-materi.{' '}
                                                    <Link href={route('admin.courses.materials.sub-materials.create', [course.id, material.id])} className="text-[#10a37f] hover:underline">Tambah</Link>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">Belum ada materi</p>
                            {firstSession ? (
                                <Link href={route('admin.courses.sessions.materials.create', [course.id, firstSession.id])} className="text-sm text-[#10a37f] hover:underline font-medium">Tambah materi pertama →</Link>
                            ) : (
                                <Link href={route('admin.courses.sessions.create', course.id)} className="text-sm text-[#10a37f] hover:underline font-medium">Buat session terlebih dahulu →</Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
