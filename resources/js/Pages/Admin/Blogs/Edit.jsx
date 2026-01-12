import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormSelect, FormActions, BackLink } from '@/Components/Admin/FormCard';
import RichTextEditor from '@/Components/Admin/RichTextEditor';
import { Head, useForm } from '@inertiajs/react';

export default function BlogEdit({ blog, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        title: blog.title || '',
        slug: blog.slug || '',
        content: blog.content || '',
        excerpt: blog.excerpt || '',
        thumbnail: blog.thumbnail || '',
        category_id: blog.category_id || '',
        status: blog.status || 'draft',
        published_at: blog.published_at ? blog.published_at.slice(0, 16) : '',
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.blogs.update', blog.id));
    };

    return (
        <AdminLayout title={`Edit: ${blog.title}`}>
            <Head title={`Edit ${blog.title}`} />
            <div className="max-w-7xl mx-auto">
                 <div className="flex items-center justify-between mb-6">
                    <BackLink href={route('admin.blogs.show', blog.id)}>Kembali ke Blog Post</BackLink>
                </div>

                <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-3 lg:gap-8">
                     {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <FormCard>
                             <div className="space-y-6">
                                <FormInput
                                    label="Judul"
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Judul artikel..."
                                    error={errors.title}
                                    required
                                />

                                <FormInput
                                    label="Slug"
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="url-friendly-slug"
                                    error={errors.slug}
                                    hint="URL-friendly identifier untuk blog post."
                                    required
                                />

                                <RichTextEditor
                                    label="Konten"
                                    value={data.content}
                                    onChange={(content) => setData('content', content)}
                                    placeholder="Tulis konten artikel di sini... (HTML supported)"
                                    error={errors.content}
                                />

                                <FormTextarea
                                    label="Excerpt"
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    placeholder="Ringkasan singkat artikel..."
                                    error={errors.excerpt}
                                    hint="Ringkasan yang akan ditampilkan di daftar blog."
                                    rows={3}
                                />
                             </div>
                        </FormCard>

                        <div className="flex items-center justify-end lg:hidden">
                            <FormActions 
                                cancelHref={route('admin.blogs.show', blog.id)} 
                                submitLabel="Update Blog Post" 
                                processing={processing} 
                            />
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-1 space-y-6 mt-6 lg:mt-0">
                         <FormCard title="Publishing" description="Atur status dan kategori.">
                            <div className="space-y-4">
                                <FormSelect
                                    label="Status"
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    error={errors.status}
                                    required
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </FormSelect>

                                <FormSelect
                                    label="Kategori"
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    error={errors.category_id}
                                >
                                    <option value="">Pilih kategori...</option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </FormSelect>
                                
                                <FormInput
                                    label="Tanggal Publish"
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                    error={errors.published_at}
                                />
                            </div>
                        </FormCard>

                        <FormCard title="Media" description="Gambar utama artikel.">
                             <FormInput
                                label="Thumbnail URL"
                                id="thumbnail"
                                type="url"
                                value={data.thumbnail}
                                onChange={(e) => setData('thumbnail', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                error={errors.thumbnail}
                            />
                        </FormCard>

                        <FormCard title="SEO Settings" description="Optimasi untuk mesin pencari.">
                            <div className="space-y-4">
                                <FormInput
                                    label="Meta Title"
                                    id="meta_title"
                                    type="text"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    placeholder="Custom title..."
                                    error={errors.meta_title}
                                    hint="Kosongkan untuk menggunakan judul artikel."
                                />

                                <FormTextarea
                                    label="Meta Description"
                                    id="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    placeholder="Deskripsi..."
                                    error={errors.meta_description}
                                    rows={3}
                                />
                            </div>
                        </FormCard>

                         <div className="hidden lg:block">
                             <FormActions 
                                cancelHref={route('admin.blogs.show', blog.id)} 
                                submitLabel="Update Blog Post" 
                                processing={processing} 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
