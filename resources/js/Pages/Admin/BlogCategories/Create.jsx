import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';

export default function BlogCategoryCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.blog-categories.store'));
    };

    return (
        <AdminLayout title="Create Category">
            <Head title="Create Blog Category" />
            <BackLink href={route('admin.blog-categories.index')}>Kembali ke Categories</BackLink>

            <div className="max-w-xl">
                <FormCard title="Kategori Baru" description="Buat kategori baru untuk mengorganisir blog posts.">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput
                            label="Nama Kategori"
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g., Tutorial, Tips & Tricks"
                            error={errors.name}
                            hint="Slug akan di-generate otomatis dari nama."
                            required
                            autoFocus
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
                            submitLabel="Buat Kategori" 
                            processing={processing} 
                        />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
