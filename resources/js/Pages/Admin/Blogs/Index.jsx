import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import DataTable from '@/Components/Admin/DataTable';
import { Head, Link, router } from '@inertiajs/react';

export default function BlogsIndex({ blogs }) {
    const handleDelete = (blogId) => {
        if (confirm('Yakin ingin menghapus blog post ini?')) {
            router.delete(route('admin.blogs.destroy', blogId));
        }
    };

    const columns = [
        { label: 'Title' },
        { label: 'Category' },
        { label: 'Status' },
        { label: 'Author' },
        { label: 'Published' },
        { label: 'Actions', align: 'right' },
    ];

    const renderRow = (blog) => (
        <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
            <td className="px-4 py-3">
                <Link href={route('admin.blogs.show', blog.id)} className="font-medium text-gray-900 dark:text-white hover:text-[#10a37f]">
                    {blog.title}
                </Link>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">/{blog.slug}</p>
            </td>
            <td className="px-4 py-3">
                {blog.category ? (
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400">
                        {blog.category.name}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400 dark:text-slate-500 italic">Uncategorized</span>
                )}
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                    blog.status === 'published' 
                        ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' 
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                    {blog.status === 'published' ? 'Published' : 'Draft'}
                </span>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400 text-sm">
                {blog.author?.name || '-'}
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400 text-sm">
                {blog.published_at 
                    ? new Date(blog.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                    : '-'
                }
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                    <IconButton as={Link} href={route('admin.blogs.show', blog.id)} title="View">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </IconButton>
                    <IconButton as={Link} href={route('admin.blogs.edit', blog.id)} title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </IconButton>
                    <IconButton variant="danger" onClick={() => handleDelete(blog.id)} title="Delete">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Belum ada blog post</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Mulai dengan membuat blog post pertama Anda.</p>
            <Button href={route('admin.blogs.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                Create Blog Post
            </Button>
        </div>
    );

    return (
        <AdminLayout title="Blog Posts">
            <Head title="Blog Posts" />

            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Kelola blog posts dan artikel</p>
                <div className="flex items-center gap-2">
                    <Button href={route('admin.blog-categories.index')} variant="outline" size="sm">
                        Categories
                    </Button>
                    <Button href={route('admin.blogs.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                        New Post
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={blogs}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
