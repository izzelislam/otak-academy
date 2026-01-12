import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/Button';
import { BackLink } from '@/Components/Admin/FormCard';
import { Head, Link, router } from '@inertiajs/react';

export default function BlogShow({ blog }) {
    const handleDelete = () => {
        if (confirm('Yakin ingin menghapus blog post ini?')) {
            router.delete(route('admin.blogs.destroy', blog.id));
        }
    };

    const formattedDate = blog.published_at 
        ? new Date(blog.published_at).toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : null;

    return (
        <AdminLayout title={blog.title}>
            <Head title={blog.title} />

            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <BackLink href={route('admin.blogs.index')}>Blog Posts</BackLink>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                        blog.status === 'published' 
                            ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' 
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                        {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {blog.status === 'published' && (
                        <Button 
                            href={route('blog.show', blog.slug)} 
                            variant="outline" 
                            size="sm"
                            target="_blank"
                        >
                            View Live
                        </Button>
                    )}
                    <Button 
                        href={route('admin.blogs.edit', blog.id)} 
                        variant="outline" 
                        size="sm" 
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                    >
                        Edit
                    </Button>
                    <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={handleDelete}
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Thumbnail */}
                    {blog.thumbnail && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                            <img 
                                src={blog.thumbnail} 
                                alt={blog.title}
                                className="w-full h-auto max-h-80 object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-6">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Konten</h3>
                        <div 
                            className="prose prose-sm dark:prose-invert max-w-none
                                prose-headings:font-semibold
                                prose-p:text-gray-600 dark:prose-p:text-slate-400
                                prose-a:text-[#10a37f]
                                prose-code:text-[#10a37f] prose-code:bg-gray-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
                                prose-pre:bg-gray-100 dark:prose-pre:bg-slate-800"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Details */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Detail</h3>
                        <dl className="space-y-3 text-sm">
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Slug</dt>
                                <dd className="mt-0.5 font-mono bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded text-gray-900 dark:text-white text-xs">
                                    /blog/{blog.slug}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Kategori</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white">
                                    {blog.category ? (
                                        <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-gray-100 dark:bg-slate-800">
                                            {blog.category.name}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 dark:text-slate-500 italic">Uncategorized</span>
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Author</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white">
                                    {blog.author?.name || '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Published At</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white">
                                    {formattedDate || <span className="text-gray-400 dark:text-slate-500 italic">Not published</span>}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Created At</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white text-xs">
                                    {new Date(blog.created_at).toLocaleDateString('id-ID', { 
                                        day: 'numeric', 
                                        month: 'long', 
                                        year: 'numeric'
                                    })}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Excerpt */}
                    {blog.excerpt && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Excerpt</h3>
                            <p className="text-sm text-gray-600 dark:text-slate-400">
                                {blog.excerpt}
                            </p>
                        </div>
                    )}

                    {/* SEO */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">SEO</h3>
                        <dl className="space-y-3 text-sm">
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Meta Title</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white">
                                    {blog.meta_title || <span className="text-gray-400 dark:text-slate-500 italic">Using default title</span>}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Meta Description</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white text-xs">
                                    {blog.meta_description || <span className="text-gray-400 dark:text-slate-500 italic">Not set</span>}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
