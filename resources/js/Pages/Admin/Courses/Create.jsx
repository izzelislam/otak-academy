import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormCheckbox, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';

export default function CourseCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        thumbnail: '',
        is_published: false,
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
