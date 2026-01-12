import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormSelect, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { FileDropzone } from '@/Components/Admin/FileDropzone';
import { Head, useForm } from '@inertiajs/react';

export default function MaterialEdit({ course, session, material, materialTypes }) {
    const { data, setData, put, processing, errors } = useForm({
        title: material.title || '',
        type: material.type || 'video',
        content: material.content || '',
        file: null,
        order_priority: material.order_priority || 0,
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.courses.sessions.materials.update', [course.id, session.id, material.id]));
    };

    const contentConfig = {
        video: { label: 'Video URL', placeholder: 'https://www.youtube.com/embed/VIDEO_ID' },
        text: { label: 'Konten Teks', placeholder: '# Heading\n\nKonten Anda...' },
        pdf: { label: 'Upload PDF', placeholder: 'Upload PDF file', hint: 'Maksimal 10MB.' },
        ebook: { label: 'Upload Ebook', placeholder: 'Upload EPUB file', hint: 'Maksimal 10MB.' },
        gmeet: { label: 'Google Meet Link', placeholder: 'https://meet.google.com/xxx-xxxx-xxx' },
    };
    const config = contentConfig[data.type] || contentConfig.video;

    // Determine if we should show file upload or text input
    const isFileUpload = ['pdf', 'ebook'].includes(data.type);

    return (
        <AdminLayout title="Edit Material">
            <Head title={`Edit ${material.title}`} />
            <BackLink href={route('admin.courses.sessions.show', [course.id, session.id])}>Kembali ke {session.title}</BackLink>

            <div className="max-w-xl">
                <FormCard title="Edit Material" description="Update informasi material.">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput label="Judul Material" id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} error={errors.title} required />
                        <FormSelect 
                            label="Tipe Material" 
                            id="type" 
                            value={data.type} 
                            onChange={(e) => setData(d => ({ ...d, type: e.target.value, content: '', file: null }))} 
                            error={errors.type} 
                            required
                        >
                            {materialTypes.map((type) => <option key={type} value={type}>{type === 'gmeet' ? 'Google Meet' : type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
                        </FormSelect>
                        
                        {data.type === 'text' && (
                            <FormTextarea label={config.label} id="content" value={data.content} onChange={(e) => setData('content', e.target.value)} placeholder={config.placeholder} error={errors.content} rows={6} required />
                        )}

                        {!isFileUpload && data.type !== 'text' && (
                            <FormInput label={config.label} id="content" type="url" value={data.content} onChange={(e) => setData('content', e.target.value)} placeholder={config.placeholder} error={errors.content} required />
                        )}

                        {isFileUpload && (
                            <FileDropzone
                                label={config.label}
                                accept={data.type === 'pdf' ? {'application/pdf': ['.pdf']} : {'application/epub+zip': ['.epub'], 'application/pdf': ['.pdf']}}
                                onDrop={(file) => setData('file', file)}
                                value={data.file}
                                currentUrl={data.content}
                                error={errors.file}
                                hint={config.hint}
                            />
                        )}
                        <FormInput label="Urutan" id="order_priority" type="number" value={data.order_priority} onChange={(e) => setData('order_priority', e.target.value)} error={errors.order_priority} hint="Angka kecil tampil lebih dulu." min="0" required />
                        <FormActions cancelHref={route('admin.courses.sessions.show', [course.id, session.id])} submitLabel="Update Material" processing={processing} />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
