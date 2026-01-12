import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import { BackLink } from '@/Components/Admin/FormCard';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CourseShow({ course }) {
    const [expandedSessions, setExpandedSessions] = useState({});
    const toggleSession = (sessionId) => setExpandedSessions(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
    const handleDeleteSession = (sessionId) => confirm('Hapus session ini beserta semua materinya?') && router.delete(route('admin.courses.sessions.destroy', [course.id, sessionId]));
    const handleDeleteMaterial = (sessionId, materialId) => confirm('Hapus material ini?') && router.delete(route('admin.courses.sessions.materials.destroy', [course.id, sessionId, materialId]));
    const typeIcons = { video: '🎬', text: '📝', pdf: '📄', ebook: '📚', gmeet: '🎥' };

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
                            <dd className="mt-0.5 text-gray-900 dark:text-white">{course.description || <span className="text-gray-400 dark:text-slate-500 italic">Tidak ada deskripsi</span>}</dd>
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
                            { label: 'Sessions', value: course.sessions?.length || 0 },
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
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Sessions & Materials</h3>
                    <Button href={route('admin.courses.sessions.create', course.id)} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                        Add Session
                    </Button>
                </div>
                <div className="p-4">
                    {course.sessions?.length > 0 ? (
                        <div className="space-y-2">
                            {course.sessions.map((session) => (
                                <div key={session.id} className="border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden">
                                    <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50" onClick={() => toggleSession(session.id)}>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center text-xs font-bold text-[#10a37f]">{session.order_priority}</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{session.title}</span>
                                            <span className="text-xs text-gray-500 dark:text-slate-400">({session.materials?.length || 0})</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Link href={route('admin.courses.sessions.materials.create', [course.id, session.id])} onClick={e => e.stopPropagation()} className="px-2 py-1 text-xs text-[#10a37f] hover:bg-[#10a37f]/10 rounded">+ Material</Link>
                                            <IconButton as={Link} href={route('admin.courses.sessions.edit', [course.id, session.id])} onClick={e => e.stopPropagation()}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </IconButton>
                                            <IconButton variant="danger" onClick={e => { e.stopPropagation(); handleDeleteSession(session.id); }}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </IconButton>
                                            <svg className={`w-4 h-4 text-gray-400 dark:text-slate-500 transition-transform ${expandedSessions[session.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                    {expandedSessions[session.id] && (
                                        <div className="border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 p-3">
                                            {session.materials?.length > 0 ? (
                                                <div className="space-y-1.5">
                                                    {session.materials.map((material) => (
                                                        <div key={material.id} className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded border border-gray-100 dark:border-slate-800">
                                                            <div className="flex items-center gap-2">
                                                                <span>{typeIcons[material.type] || '📎'}</span>
                                                                <span className="text-sm text-gray-900 dark:text-white">{material.title}</span>
                                                                <span className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded">{material.type}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <IconButton as={Link} href={route('admin.courses.sessions.materials.edit', [course.id, session.id, material.id])}>
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                                </IconButton>
                                                                <IconButton variant="danger" onClick={() => handleDeleteMaterial(session.id, material.id)}>
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-center py-3 text-xs text-gray-500 dark:text-slate-400">Belum ada material. <Link href={route('admin.courses.sessions.materials.create', [course.id, session.id])} className="text-[#10a37f] hover:underline">Tambah</Link></p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">Belum ada session</p>
                            <Link href={route('admin.courses.sessions.create', course.id)} className="text-sm text-[#10a37f] hover:underline font-medium">Buat session pertama →</Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
