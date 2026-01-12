import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import DataTable from '@/Components/Admin/DataTable';
import { Head, Link, router } from '@inertiajs/react';

export default function BlogCategoriesIndex({ categories }) {
    const handleDelete = (categoryId) => {
        if (confirm('Yakin ingin menghapus kategori ini? Pastikan tidak ada blog post yang menggunakan kategori ini.')) {
            router.delete(route('admin.blog-categories.destroy', categoryId));
        }
    };

    const columns = [
        { label: 'Name' },
        { label: 'Slug' },
        { label: 'Posts' },
        { label: 'Description' },
        { label: 'Actions', align: 'right' },
    ];

    const renderRow = (category) => (
        <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
            <td className="px-4 py-3">
                <span className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                </span>
            </td>
            <td className="px-4 py-3">
                <span className="font-mono text-xs bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded text-gray-600 dark:text-slate-400">
                    {category.slug}
                </span>
            </td>
            <td className="px-4 py-3">
                <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400">
                    {category.blogs_count || 0} posts
                </span>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400 text-sm max-w-xs truncate">
                {category.description || <span className="italic text-gray-400 dark:text-slate-500">No description</span>}
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                    <IconButton as={Link} href={route('admin.blog-categories.edit', category.id)} title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </IconButton>
                    <IconButton 
                        variant="danger" 
                        onClick={() => handleDelete(category.id)} 
                        title="Delete"
                        disabled={category.blogs_count > 0}
                    >
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Belum ada kategori</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Buat kategori untuk mengorganisir blog posts.</p>
            <Button href={route('admin.blog-categories.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                Create Category
            </Button>
        </div>
    );

    return (
        <AdminLayout title="Blog Categories">
            <Head title="Blog Categories" />

            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <Link 
                        href={route('admin.blogs.index')}
                        className="text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
                    >
                        ← Back to Blog Posts
                    </Link>
                </div>
                <Button href={route('admin.blog-categories.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                    New Category
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={categories}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
