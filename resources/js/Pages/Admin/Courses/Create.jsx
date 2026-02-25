import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormCheckbox, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';

export default function CourseCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        thumbnail: '',
        is_published: false,
        access_type: 'free',
        price: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.courses.store'));
    };

    return (
        <AdminLayout title="Create Course">
            <Head title="Create Course" />
            <BackLink href={route('admin.courses.index')}>Kembali ke Courses</BackLink>

            <div className="max-w-xl">
                <FormCard title="Course Baru" description="Buat course baru untuk siswa Anda.">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput
                            label="Judul Course"
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g., Complete Web Development Bootcamp"
                            error={errors.title}
                            hint="Slug akan di-generate otomatis dari judul."
                            required
                            autoFocus
                        />
                        <FormTextarea
                            label="Deskripsi"
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Jelaskan apa yang akan dipelajari siswa..."
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
                                label="Publish course ini langsung"
                                id="is_published"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 ml-6">Course yang dipublish akan terlihat oleh member.</p>
                        </div>
                        <FormActions cancelHref={route('admin.courses.index')} submitLabel="Buat Course" processing={processing} />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
