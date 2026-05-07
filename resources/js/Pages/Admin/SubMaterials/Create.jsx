import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormSelect, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { FileDropzone } from '@/Components/Admin/FileDropzone';
import { Head, useForm } from '@inertiajs/react';

export default function SubMaterialCreate({ course, material, types }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: 'text',
        content: '',
        file: null,
        order_priority: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.courses.materials.sub-materials.store', [course.id, material.id]), {
            forceFormData: true,
        });
    };

    const contentConfig = {
        video: { label: 'Video URL', placeholder: 'https://www.youtube.com/embed/VIDEO_ID', hint: 'Format embed URL. Opsional.' },
        text: { label: 'Konten Teks', placeholder: '# Heading\n\nKonten...', hint: 'Markdown didukung. Opsional.' },
        pdf: { label: 'Upload PDF', hint: 'Maksimal 10MB. Opsional.' },
        ebook: { label: 'Upload Ebook', hint: 'Maksimal 10MB. Opsional.' },
        gmeet: { label: 'Google Meet Link', placeholder: 'https://meet.google.com/xxx-xxxx-xxx', hint: 'Opsional.' },
        document: { label: 'Upload Dokumen', hint: 'PDF, DOC, DOCX, ZIP. Maks 10MB. Opsional.' },
    };
    const config = contentConfig[data.type] || contentConfig.text;
    const isFileUpload = ['pdf', 'ebook', 'document'].includes(data.type);

    return (
        <AdminLayout title="Tambah Sub-Materi">
            <Head title={`Tambah Sub-Materi - ${material.title}`} />
            <BackLink href={route('admin.courses.show', course.id)}>Kembali ke {course.title}</BackLink>

            <div className="max-w-xl">
                <FormCard title="Sub-Materi Baru" description={`Tambah sub-materi ke "${material.title}"`}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput label="Judul Sub-Materi" id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="e.g., Video Pengenalan" error={errors.title} required autoFocus />
                        <FormSelect
                            label="Tipe"
                            id="type"
                            value={data.type}
                            onChange={(e) => setData(d => ({ ...d, type: e.target.value, content: '', file: null }))}
                            error={errors.type}
                            required
                        >
                            {types.map((type) => <option key={type} value={type}>{type === 'gmeet' ? 'Google Meet' : type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
                        </FormSelect>

                        {data.type === 'text' && (
                            <FormTextarea label={config.label} id="content" value={data.content} onChange={(e) => setData('content', e.target.value)} placeholder={config.placeholder} error={errors.content} hint={config.hint} rows={6} />
                        )}

                        {!isFileUpload && data.type !== 'text' && (
                            <FormInput label={config.label} id="content" type="url" value={data.content} onChange={(e) => setData('content', e.target.value)} placeholder={config.placeholder} error={errors.content} hint={config.hint} />
                        )}

                        {isFileUpload && (
                            <FileDropzone
                                label={config.label}
                                accept={data.type === 'pdf' ? {'application/pdf': ['.pdf']} : data.type === 'ebook' ? {'application/epub+zip': ['.epub'], 'application/pdf': ['.pdf']} : {'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'application/zip': ['.zip']}}
                                onDrop={(file) => setData('file', file)}
                                value={data.file}
                                error={errors.file}
                                hint={config.hint}
                            />
                        )}
                        <FormInput label="Urutan" id="order_priority" type="number" value={data.order_priority} onChange={(e) => setData('order_priority', e.target.value)} placeholder="Kosongkan untuk auto" error={errors.order_priority} hint="Angka kecil tampil lebih dulu." min="0" />
                        <FormActions cancelHref={route('admin.courses.show', course.id)} submitLabel="Buat Sub-Materi" processing={processing} />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
