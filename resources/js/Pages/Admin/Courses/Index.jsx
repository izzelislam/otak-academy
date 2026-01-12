import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import DataTable from '@/Components/Admin/DataTable';
import { Head, Link, router } from '@inertiajs/react';

export default function CoursesIndex({ courses }) {
    const handleDelete = (courseId) => {
        if (confirm('Yakin ingin menghapus course ini?')) {
            router.delete(route('admin.courses.destroy', courseId));
        }
    };

    const columns = [
        { label: 'Course' },
        { label: 'Status' },
        { label: 'Sessions' },
        { label: 'Enrolled' },
        { label: 'Actions', align: 'right' },
    ];

    const renderRow = (course) => (
        <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
            <td className="px-4 py-3">
                <Link href={route('admin.courses.show', course.id)} className="font-medium text-gray-900 dark:text-white hover:text-[#10a37f]">
                    {course.title}
                </Link>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">/{course.slug}</p>
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${course.is_published ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    {course.is_published ? 'Published' : 'Draft'}
                </span>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{course.sessions_count}</td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{course.enrolled_users_count}</td>
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                    <IconButton as={Link} href={route('admin.courses.show', course.id)} title="View">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </IconButton>
                    <IconButton as={Link} href={route('admin.courses.edit', course.id)} title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </IconButton>
                    <IconButton variant="danger" onClick={() => handleDelete(course.id)} title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </IconButton>
                </div>
            </td>
        </tr>
    );

    const emptyState = (
        <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Belum ada course</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Mulai dengan membuat course pertama Anda.</p>
            <Button href={route('admin.courses.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                Create Course
            </Button>
        </div>
    );

    return (
        <AdminLayout title="Courses">
            <Head title="Courses" />

            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Kelola courses dan konten</p>
                <Button href={route('admin.courses.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                    New Course
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={courses}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
