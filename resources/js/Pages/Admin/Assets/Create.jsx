import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormSelect, FormCheckbox, FormActions, BackLink } from '@/Components/Admin/FormCard';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

function formatFileSize(bytes) {
    if (!bytes) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let size = bytes;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export default function AssetCreate() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);

    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        thumbnail: null,
        file: null,
        type: 'free',
        is_published: false,
        is_redemption_required: false,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setData('file', file);
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedThumbnail(file);
            setData('thumbnail', file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.assets.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title="Create Asset">
            <Head title="Create Asset" />
            <BackLink href={route('admin.assets.index')}>Kembali ke Assets</BackLink>

            <div className="max-w-2xl">
                <FormCard title="Asset Baru" description="Upload file dan buat asset baru untuk di-download.">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput
                            label="Judul"
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Nama asset..."
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
                            placeholder="Deskripsi asset..."
                            error={errors.description}
                            rows={4}
                        />

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                File <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-700 border-dashed rounded-lg hover:border-[#10a37f] dark:hover:border-[#10a37f] transition-colors">
                                <div className="space-y-1 text-center">
                                    {selectedFile ? (
                                        <div className="text-sm">
                                            <svg className="mx-auto h-10 w-10 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="mt-2 font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                                            <p className="text-gray-500 dark:text-slate-400">{formatFileSize(selectedFile.size)}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600 dark:text-slate-400">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[#10a37f] hover:text-[#0e8c6b] focus-within:outline-none">
                                                    <span>Upload file</span>
                                                    <input id="file-upload" name="file" type="file" className="sr-only" onChange={handleFileChange} />
                                                </label>
                                                <p className="pl-1">atau drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-slate-500">Max 100MB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {errors.file && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.file}</p>}
                            {progress && (
                                <div className="mt-2">
                                    <div className="bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                                        <div 
                                            className="bg-[#10a37f] h-2 rounded-full transition-all duration-300" 
                                            style={{ width: `${progress.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{progress.percentage}% uploaded</p>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                Thumbnail
                            </label>
                            <div className="mt-1 flex items-center gap-4">
                                {selectedThumbnail ? (
                                    <img 
                                        src={URL.createObjectURL(selectedThumbnail)} 
                                        alt="Thumbnail preview"
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                <label className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                    {selectedThumbnail ? 'Change' : 'Upload'}
                                    <input type="file" className="sr-only" accept="image/*" onChange={handleThumbnailChange} />
                                </label>
                            </div>
                            {errors.thumbnail && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.thumbnail}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <FormSelect
                                    label="Tipe"
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => {
                                        setData(data => ({
                                            ...data,
                                            type: e.target.value,
                                            // Auto-check redemption for paid assets (locked)
                                            is_redemption_required: e.target.value === 'paid' ? true : data.is_redemption_required
                                        }));
                                    }}
                                    error={errors.type}
                                    required
                                >
                                    <option value="free">Free</option>
                                    <option value="paid">Paid (Requires Code)</option>
                                </FormSelect>
                            </div>

                            <div className="space-y-3 pt-6">
                                <FormCheckbox
                                    label="Publish asset"
                                    id="is_published"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    error={errors.is_published}
                                />
                                
                                {data.type === 'free' && (
                                    <FormCheckbox
                                        label="Use Redemption Code"
                                        id="is_redemption_required"
                                        checked={data.is_redemption_required}
                                        onChange={(e) => setData('is_redemption_required', e.target.checked)}
                                        error={errors.is_redemption_required}
                                        hint="If checked, users must enter a valid code to download this free asset."
                                    />
                                )}
                            </div>
                        </div>

                        {data.type === 'paid' && (
                            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    <strong>Note:</strong> Paid assets require redemption codes. You can generate codes after creating the asset.
                                </p>
                            </div>
                        )}

                        <FormActions 
                            cancelHref={route('admin.assets.index')} 
                            submitLabel="Buat Asset" 
                            processing={processing} 
                        />
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
