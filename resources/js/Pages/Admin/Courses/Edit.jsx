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
