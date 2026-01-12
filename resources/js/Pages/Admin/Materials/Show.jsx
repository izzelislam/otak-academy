import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/Button';
import { BackLink } from '@/Components/Admin/FormCard';
import { Head, router } from '@inertiajs/react';

export default function MaterialShow({ course, session, material }) {
    const handleDelete = () => confirm('Hapus material ini?') && router.delete(route('admin.courses.sessions.materials.destroy', [course.id, session.id, material.id]));
    const typeIcons = { video: '🎬', text: '📝', pdf: '📄', ebook: '📚', gmeet: '🎥' };

    const renderContent = () => {
        switch (material.type) {
            case 'video':
                return <div className="aspect-video"><iframe src={material.content} className="w-full h-full rounded-lg" allowFullScreen /></div>;
            case 'text':
                return <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-slate-950 p-3 rounded-lg text-sm text-gray-900 dark:text-white">{material.content}</pre>;
            case 'pdf':
                return <div><a href={material.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 bg-[#10a37f] text-white text-sm rounded-lg hover:bg-[#0e8c6b]">Buka PDF</a><p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{material.content}</p></div>;
            case 'ebook':
                return <div><a href={material.content} download className="inline-flex items-center px-3 py-2 bg-[#10a37f] text-white text-sm rounded-lg hover:bg-[#0e8c6b]">Download Ebook</a><p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{material.content}</p></div>;
            case 'gmeet':
                return <div><a href={material.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 bg-[#10a37f] text-white text-sm rounded-lg hover:bg-[#0e8c6b]">Join Google Meet</a><p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{material.content}</p></div>;
            default:
                return <div className="text-gray-500 dark:text-slate-400">{material.content}</div>;
        }
    };

    return (
        <AdminLayout title={material.title}>
            <Head title={material.title} />

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BackLink href={route('admin.courses.sessions.show', [course.id, session.id])}>Kembali ke {session.title}</BackLink>
                    <span className="text-lg">{typeIcons[material.type] || '📎'}</span>
                </div>
                <div className="flex gap-2">
                    <Button href={route('admin.courses.sessions.materials.edit', [course.id, session.id, material.id])} variant="outline" size="sm">Edit</Button>
                    <Button onClick={handleDelete} variant="danger" size="sm">Hapus</Button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4 mb-4">
                <dl className="grid grid-cols-4 gap-4 text-sm">
                    <div><dt className="text-xs text-gray-500 dark:text-slate-400">Course</dt><dd className="text-gray-900 dark:text-white">{course.title}</dd></div>
                    <div><dt className="text-xs text-gray-500 dark:text-slate-400">Session</dt><dd className="text-gray-900 dark:text-white">{session.title}</dd></div>
                    <div><dt className="text-xs text-gray-500 dark:text-slate-400">Tipe</dt><dd><span className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded">{material.type}</span></dd></div>
                    <div><dt className="text-xs text-gray-500 dark:text-slate-400">Urutan</dt><dd className="text-gray-900 dark:text-white">#{material.order_priority}</dd></div>
                </dl>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Preview Konten</h3>
                {renderContent()}
            </div>
        </AdminLayout>
    );
}
