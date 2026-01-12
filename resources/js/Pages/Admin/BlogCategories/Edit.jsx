import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';

export default function BlogCategoryEdit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.blog-categories.update', category.id));
    };

    return (
        <AdminLayout title={`Edit: ${category.name}`}>
            <Head title={`Edit ${category.name}`} />
            <BackLink href={route('admin.blog-categories.index')}>Kembali ke Categories</BackLink>

            <div className="max-w-xl">
                <FormCard title="Edit Kategori" description="Update informasi kategori blog.">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput
                            label="Nama Kategori"
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g., Tutorial, Tips & Tricks"
                            error={errors.name}
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
                            hint="URL-friendly identifier untuk kategori."
                            required
                        />

                        <FormTextarea
                            label="Deskripsi"
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Deskripsi singkat tentang kategori ini..."
                            error={errors.description}
                            rows={3}
                        />

                        <FormActions 
                            cancelHref={route('admin.blog-categories.index')} 
                            submitLabel="Update Kategori" 
                            processing={processing} 
                        />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
