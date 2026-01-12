import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import { BackLink } from '@/Components/Admin/FormCard';
import { Head, Link, router } from '@inertiajs/react';

export default function SessionShow({ course, session }) {
    const handleDeleteMaterial = (materialId) => confirm('Hapus material ini?') && router.delete(route('admin.courses.sessions.materials.destroy', [course.id, session.id, materialId]));
    const typeIcons = { video: '🎬', text: '📝', pdf: '📄', ebook: '📚', gmeet: '🎥' };

    return (
        <AdminLayout title={session.title}>
            <Head title={session.title} />

            <div className="flex items-center justify-between mb-4">
                <BackLink href={route('admin.courses.show', course.id)}>Kembali ke {course.title}</BackLink>
                <div className="flex gap-2">
                    <Button href={route('admin.courses.sessions.materials.create', [course.id, session.id])} size="sm">Add Material</Button>
                    <Button href={route('admin.courses.sessions.edit', [course.id, session.id])} variant="outline" size="sm">Edit</Button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4 mb-4">
                <dl className="grid grid-cols-3 gap-4 text-sm">
                    <div><dt className="text-xs text-gray-500 dark:text-slate-400">Course</dt><dd className="text-gray-900 dark:text-white">{course.title}</dd></div>
                    <div><dt className="text-xs text-gray-500 dark:text-slate-400">Urutan</dt><dd className="text-gray-900 dark:text-white">#{session.order_priority}</dd></div>
                    <div><dt className="text-xs text-gray-500 dark:text-slate-400">Materials</dt><dd className="text-gray-900 dark:text-white">{session.materials?.length || 0}</dd></div>
                </dl>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Materials</h3>
                    <Button href={route('admin.courses.sessions.materials.create', [course.id, session.id])} size="sm">Add Material</Button>
                </div>
                <div className="p-4">
                    {session.materials?.length > 0 ? (
                        <div className="space-y-2">
                            {session.materials.map((material) => (
                                <div key={material.id} className="flex items-center justify-between bg-gray-50 dark:bg-slate-950 p-3 rounded-lg border border-gray-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-gray-400 dark:text-slate-500 font-mono">#{material.order_priority}</span>
                                        <span className="text-lg">{typeIcons[material.type] || '📎'}</span>
                                        <div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{material.title}</span>
                                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded">{material.type}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Link href={route('admin.courses.sessions.materials.show', [course.id, session.id, material.id])} className="px-2 py-1 text-xs text-[#10a37f] hover:bg-[#10a37f]/10 rounded">View</Link>
                                        <IconButton as={Link} href={route('admin.courses.sessions.materials.edit', [course.id, session.id, material.id])}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </IconButton>
                                        <IconButton variant="danger" onClick={() => handleDeleteMaterial(material.id)}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-6 text-sm text-gray-500 dark:text-slate-400">Belum ada material. <Link href={route('admin.courses.sessions.materials.create', [course.id, session.id])} className="text-[#10a37f] hover:underline">Tambah material pertama</Link></p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
