import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';

export default function SessionCreate({ course }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        order_priority: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.courses.sessions.store', course.id));
    };

    return (
        <AdminLayout title="Tambah Session">
            <Head title={`Tambah Session - ${course.title}`} />
            <BackLink href={route('admin.courses.show', course.id)}>Kembali ke {course.title}</BackLink>

            <div className="max-w-xl">
                <FormCard title="Session Baru" description={`Tambah session baru ke "${course.title}"`}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput label="Judul Session" id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="e.g., Introduction to the Course" error={errors.title} required autoFocus />
                        <FormInput label="Urutan" id="order_priority" type="number" value={data.order_priority} onChange={(e) => setData('order_priority', e.target.value)} placeholder="Kosongkan untuk auto" error={errors.order_priority} hint="Angka kecil tampil lebih dulu." min="0" />
                        <FormActions cancelHref={route('admin.courses.show', course.id)} submitLabel="Buat Session" processing={processing} />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
