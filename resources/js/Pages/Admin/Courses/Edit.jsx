import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormCheckbox, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';

export default function CourseEdit({ course }) {
    const { data, setData, put, processing, errors } = useForm({
        title: course.title || '',
        slug: course.slug || '',
        description: course.description || '',
        thumbnail: course.thumbnail || '',
        is_published: course.is_published || false,
        access_type: course.access_type || 'free',
        price: course.price || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.courses.update', course.id));
    };

    return (
        <AdminLayout title="Edit Course">
            <Head title={`Edit ${course.title}`} />
            <BackLink href={route('admin.courses.show', course.id)}>Kembali ke Course</BackLink>

            <div className="max-w-xl">
                <FormCard title="Edit Course" description="Update informasi course.">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput
                            label="Judul Course"
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            required
                        />
                        <FormInput
                            label="Slug"
                            id="slug"
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            error={errors.slug}
                            hint="URL-friendly identifier untuk course."
                            required
                        />
                        <FormTextarea
                            label="Deskripsi"
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Jelaskan apa yang akan dipelajari..."
                            error={errors.description}
                        />
                        <FormInput
                            label="Thumbnail URL"
                            id="thumbnail"
                            type="url"
                            value={data.thumbnail}
                            onChange={(e) => setData('thumbnail', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            error={errors.thumbnail}
                        />

                        {/* Access Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Tipe Akses</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="access_type"
                                        value="free"
                                        checked={data.access_type === 'free'}
                                        onChange={() => { setData('access_type', 'free'); setData('price', 0); }}
                                        className="text-[#10a37f] focus:ring-[#10a37f]"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-slate-300">Gratis</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="access_type"
                                        value="premium"
                                        checked={data.access_type === 'premium'}
                                        onChange={() => setData('access_type', 'premium')}
                                        className="text-amber-500 focus:ring-amber-500"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-slate-300">Premium (Berbayar)</span>
                                </label>
                            </div>
                            {errors.access_type && <p className="mt-1 text-sm text-red-500">{errors.access_type}</p>}
                        </div>

                        {/* Price (only for premium) */}
                        {data.access_type === 'premium' && (
                            <FormInput
                                label="Harga (IDR)"
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', parseInt(e.target.value) || 0)}
                                placeholder="e.g., 150000"
                                error={errors.price}
                                hint="Harga dalam Rupiah. Contoh: 150000 = Rp 150.000"
                                min="0"
                                required
                            />
                        )}

                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800">
                            <FormCheckbox
                                label="Published"
                                id="is_published"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 ml-6">Course yang dipublish akan terlihat oleh member.</p>
                        </div>
                        <FormActions cancelHref={route('admin.courses.show', course.id)} submitLabel="Update Course" processing={processing} />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
