import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';

export default function SessionEdit({ course, session }) {
    const { data, setData, put, processing, errors } = useForm({
        title: session.title || '',
        order_priority: session.order_priority || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.courses.sessions.update', [course.id, session.id]));
    };

    return (
        <AdminLayout title="Edit Session">
            <Head title={`Edit ${session.title}`} />
            <BackLink href={route('admin.courses.show', course.id)}>Kembali ke {course.title}</BackLink>

            <div className="max-w-xl">
                <FormCard title="Edit Session" description="Update informasi session.">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput label="Judul Session" id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} error={errors.title} required />
                        <FormInput label="Urutan" id="order_priority" type="number" value={data.order_priority} onChange={(e) => setData('order_priority', e.target.value)} error={errors.order_priority} hint="Angka kecil tampil lebih dulu." min="0" required />
                        <FormActions cancelHref={route('admin.courses.show', course.id)} submitLabel="Update Session" processing={processing} />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
