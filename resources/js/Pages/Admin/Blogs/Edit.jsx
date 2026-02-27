import AdminLayout from '@/Layouts/AdminLayout';
import { FormCard, FormInput, FormTextarea, FormSelect, FormActions, BackLink } from '@/Components/Admin/FormCard';
import RichTextEditor from '@/Components/Admin/RichTextEditor';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function BlogEdit({ blog, categories, availableModels }) {
    const { data, setData, put, processing, errors } = useForm({
        title: blog.title || '',
        slug: blog.slug || '',
        content: blog.content || '',
        excerpt: blog.excerpt || '',
        thumbnail: blog.thumbnail || '',
        category_id: blog.category_id || '',
        status: blog.status || 'draft',
        published_at: blog.published_at ? blog.published_at.slice(0, 16) : '',
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
    });

    const [aiLoading, setAiLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [showAiSettings, setShowAiSettings] = useState(false);
    const [aiSettings, setAiSettings] = useState({
        model: availableModels && availableModels.length > 0 ? availableModels[0] : 'openai/gpt-4o-mini',
        tone: 'Santai & Menarik',
        level: 'Pemula',
        max_words: '500',
        brief: ''
    });

    const handleGenerateAi = async () => {
        if (!data.title) {
            alert('Silakan isi judul artikel terlebih dahulu!');
            return;
        }
        setAiLoading(true);
        try {
            const response = await axios.post(route('admin.blogs.generate'), {
                title: data.title,
                category_id: data.category_id,
                tone: aiSettings.tone,
                level: aiSettings.level,
                max_words: aiSettings.max_words,
                model: aiSettings.model,
                brief: aiSettings.brief
            });
            setData(data => ({
                ...data,
                content: response.data.content || data.content,
                excerpt: response.data.excerpt || data.excerpt,
                meta_title: response.data.meta_title || data.meta_title,
                meta_description: response.data.meta_description || data.meta_description
            }));
            setShowAiSettings(false);
        } catch (error) {
            console.error('Error generating AI content:', error);
            alert(error.response?.data?.error || 'Gagal generate artikel.');
        } finally {
            setAiLoading(false);
        }
    };

    const handleGenerateImage = async () => {
        if (!data.title) {
            alert('Silakan isi judul artikel terlebih dahulu!');
            return;
        }
        setImgLoading(true);
        try {
            const response = await axios.post(route('admin.blogs.generateImage'), {
                title: data.title
            });
            setData('thumbnail', response.data.thumbnail_url);
        } catch (error) {
            console.error('Error generating image:', error);
            alert(error.response?.data?.error || 'Gagal generate gambar.');
        } finally {
            setImgLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.blogs.update', blog.id));
    };

    return (
        <AdminLayout title={`Edit: ${blog.title}`}>
            <Head title={`Edit ${blog.title}`} />
            <div className="max-w-7xl mx-auto">
                 <div className="flex items-center justify-between mb-6">
                    <BackLink href={route('admin.blogs.show', blog.id)}>Kembali ke Blog Post</BackLink>
                </div>

                <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-3 lg:gap-8">
                     {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <FormCard>
                             <div className="space-y-6">
                                <FormInput
                                    label="Judul"
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Judul artikel..."
                                    error={errors.title}
                                    required
                                />

                                <FormInput
                                    label="Slug"
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="url-friendly-slug"
                                    error={errors.slug}
                                    hint="URL-friendly identifier untuk blog post."
                                    required
                                />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Konten Artikel
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowAiSettings(!showAiSettings)}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Generate AI
                                        </button>
                                    </div>

                                    {showAiSettings && (
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-xl space-y-4 mb-4">
                                            <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-300 flex items-center gap-2">
                                                ✨ Pengaturan AI
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <FormSelect
                                                    label="Gaya Bahasa"
                                                    id="ai_tone"
                                                    value={aiSettings.tone}
                                                    onChange={(e) => setAiSettings({...aiSettings, tone: e.target.value})}
                                                >
                                                    <option value="Santai & Menarik">Santai & Menarik</option>
                                                    <option value="Formal & Profesional">Formal & Profesional</option>
                                                    <option value="Edukatif & Informatif">Edukatif & Informatif</option>
                                                </FormSelect>
                                                
                                                <FormSelect
                                                    label="Level Pembaca"
                                                    id="ai_level"
                                                    value={aiSettings.level}
                                                    onChange={(e) => setAiSettings({...aiSettings, level: e.target.value})}
                                                >
                                                    <option value="Pemula">Pemula</option>
                                                    <option value="Menengah">Menengah</option>
                                                    <option value="Mahir">Mahir</option>
                                                    <option value="Umum">Umum</option>
                                                </FormSelect>
                                                
                                                <FormSelect
                                                    label="Panjang Artikel"
                                                    id="ai_words"
                                                    value={aiSettings.max_words}
                                                    onChange={(e) => setAiSettings({...aiSettings, max_words: e.target.value})}
                                                >
                                                    <option value="300">Singkat (~300 kata)</option>
                                                    <option value="500">Sedang (~500 kata)</option>
                                                    <option value="1000">Panjang (~1000 kata)</option>
                                                    <option value="1500">Sangat Panjang (~1500 kata)</option>
                                                </FormSelect>

                                                <FormSelect
                                                    label="AI Model"
                                                    id="ai_model"
                                                    value={aiSettings.model}
                                                    onChange={(e) => setAiSettings({...aiSettings, model: e.target.value})}
                                                >
                                                    {availableModels && availableModels.map(model => (
                                                        <option key={model} value={model}>{model}</option>
                                                    ))}
                                                </FormSelect>
                                            </div>

                                            <FormTextarea
                                                label="Prompt / Brief Tambahan (Opsional)"
                                                id="ai_brief"
                                                value={aiSettings.brief}
                                                onChange={(e) => setAiSettings({...aiSettings, brief: e.target.value})}
                                                placeholder="Contoh: Tekankan manfaat otomatisasi untuk bisnis kecil, dan gunakan gaya bahasa anak muda..."
                                                rows={2}
                                            />

                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={handleGenerateAi}
                                                    disabled={aiLoading}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    {aiLoading ? (
                                                        <>
                                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Sedang Menulis...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                            </svg>
                                                            Mulai Generate
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-1">
                                        <RichTextEditor
                                            value={data.content}
                                            onChange={(content) => setData('content', content)}
                                            placeholder="Tulis konten artikel di sini... (HTML supported)"
                                            error={errors.content}
                                        />
                                    </div>
                                </div>

                                <FormTextarea
                                    label="Excerpt"
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    placeholder="Ringkasan singkat artikel..."
                                    error={errors.excerpt}
                                    hint="Ringkasan yang akan ditampilkan di daftar blog."
                                    rows={3}
                                />
                             </div>
                        </FormCard>

                        <div className="flex items-center justify-end lg:hidden">
                            <FormActions 
                                cancelHref={route('admin.blogs.show', blog.id)} 
                                submitLabel="Update Blog Post" 
                                processing={processing} 
                            />
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-1 space-y-6 mt-6 lg:mt-0">
                         <FormCard title="Publishing" description="Atur status dan kategori.">
                            <div className="space-y-4">
                                <FormSelect
                                    label="Status"
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    error={errors.status}
                                    required
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </FormSelect>

                                <FormSelect
                                    label="Kategori"
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    error={errors.category_id}
                                >
                                    <option value="">Pilih kategori...</option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </FormSelect>
                                
                                <FormInput
                                    label="Tanggal Publish"
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                    error={errors.published_at}
                                />
                            </div>
                        </FormCard>

                        <FormCard title="Media" description="Gambar utama artikel.">
                             <div className="space-y-4">
                                 <FormInput
                                    label="Thumbnail URL"
                                    id="thumbnail"
                                    type="url"
                                    value={data.thumbnail}
                                    onChange={(e) => setData('thumbnail', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    error={errors.thumbnail}
                                />
                                <button
                                    type="button"
                                    onClick={handleGenerateImage}
                                    disabled={imgLoading}
                                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {imgLoading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating Image...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0V19a2 2 0 01-2 2h-14a2 2 0 01-2-2z" />
                                            </svg>
                                            Generate AI Image (Manual)
                                        </>
                                    )}
                                </button>
                                {data.thumbnail && (
                                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <img src={data.thumbnail} alt="Thumbnail preview" className="w-full h-auto object-cover aspect-video" />
                                    </div>
                                )}
                            </div>
                        </FormCard>

                        <FormCard title="SEO Settings" description="Optimasi untuk mesin pencari.">
                            <div className="space-y-4">
                                <FormInput
                                    label="Meta Title"
                                    id="meta_title"
                                    type="text"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    placeholder="Custom title..."
                                    error={errors.meta_title}
                                    hint="Kosongkan untuk menggunakan judul artikel."
                                />

                                <FormTextarea
                                    label="Meta Description"
                                    id="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    placeholder="Deskripsi..."
                                    error={errors.meta_description}
                                    rows={3}
                                />
                            </div>
                        </FormCard>

                         <div className="hidden lg:block">
                             <FormActions 
                                cancelHref={route('admin.blogs.show', blog.id)} 
                                submitLabel="Update Blog Post" 
                                processing={processing} 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
