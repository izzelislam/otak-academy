import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/Button';
import { BackLink } from '@/Components/Admin/FormCard';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import GenerateCodesModal from './GenerateCodes';

function formatFileSize(bytes) {
    if (!bytes) return '-';
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let size = bytes;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export default function AssetShow({ asset, codeStats }) {
    const { flash } = usePage().props;
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [generatedCodes, setGeneratedCodes] = useState(flash?.generatedCodes || []);

    const handleDelete = () => {
        if (confirm('Yakin ingin menghapus asset ini? File dan semua kode terkait juga akan dihapus.')) {
            router.delete(route('admin.assets.destroy', asset.id));
        }
    };

    const handleExportCodes = () => {
        window.location.href = route('admin.assets.export-codes', asset.id);
    };

    const handleCodesGenerated = (codes) => {
        setGeneratedCodes(codes);
        setShowGenerateModal(false);
        router.reload({ only: ['asset', 'codeStats'] });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const copyAllCodes = () => {
        navigator.clipboard.writeText(generatedCodes.join('\n'));
    };

    return (
        <AdminLayout title={asset.title}>
            <Head title={asset.title} />

            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <BackLink href={route('admin.assets.index')}>Assets</BackLink>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                        asset.is_published 
                            ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' 
                            : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                        {asset.is_published ? 'Published' : 'Draft'}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                        asset.type === 'free' 
                            ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' 
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                        {asset.type === 'free' ? 'Free' : 'Paid'}
                    </span>
                    {asset.type === 'free' && asset.is_redemption_required && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                            Code Required
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {asset.is_published && (
                        <Button 
                            href={route('assets.show', asset.slug)} 
                            variant="outline" 
                            size="sm"
                            target="_blank"
                        >
                            View Live
                        </Button>
                    )}
                    <Button 
                        href={route('admin.assets.edit', asset.id)} 
                        variant="outline" 
                        size="sm" 
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                    >
                        Edit
                    </Button>
                    <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={handleDelete}
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Thumbnail */}
                    {asset.thumbnail_url && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                            <img 
                                src={asset.thumbnail_url} 
                                alt={asset.title}
                                className="w-full h-auto max-h-80 object-cover"
                            />
                        </div>
                    )}

                    {/* Description */}
                    {asset.description && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-6">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Deskripsi</h3>
                            <p className="text-sm text-gray-600 dark:text-slate-400 whitespace-pre-wrap">
                                {asset.description}
                            </p>
                        </div>
                    )}

                    {/* Generated Codes (shown after generation) */}
                    {generatedCodes.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200">Generated Codes</h3>
                                </div>
                                <Button size="sm" variant="outline" onClick={copyAllCodes}>
                                    Copy All
                                </Button>
                            </div>
                            <p className="text-xs text-amber-700 dark:text-amber-300 mb-4">
                                ⚠️ These codes are shown only once. Copy them now!
                            </p>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {generatedCodes.map((code, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
                                    >
                                        <code className="text-sm font-mono text-amber-800 dark:text-amber-200">{code}</code>
                                        <button
                                            onClick={() => copyToClipboard(code)}
                                            className="p-1 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
                                            title="Copy"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Details */}
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Detail</h3>
                        <dl className="space-y-3 text-sm">
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Slug</dt>
                                <dd className="mt-0.5 font-mono bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded text-gray-900 dark:text-white text-xs">
                                    /assets/{asset.slug}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">File</dt>
                                    {asset.file_name || '-'}
                                    {asset.file_name && (
                                        <div className="mt-2">
                                            <a 
                                                href={route('admin.assets.download', asset.id)} 
                                                className="text-[#10a37f] hover:text-[#0e906f] text-sm flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download File
                                            </a>
                                        </div>
                                    )}
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Size</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white">
                                    {formatFileSize(asset.file_size)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Type</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white">
                                    {asset.file_type || '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Downloads</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white font-medium">
                                    {asset.download_count || 0}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-500 dark:text-slate-400">Created At</dt>
                                <dd className="mt-0.5 text-gray-900 dark:text-white text-xs">
                                    {new Date(asset.created_at).toLocaleDateString('id-ID', { 
                                        day: 'numeric', 
                                        month: 'long', 
                                        year: 'numeric'
                                    })}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Code Management (for paid assets or free assets with redemption) */}
                    {(asset.type === 'paid' || (asset.type === 'free' && asset.is_redemption_required)) && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Code Management</h3>
                            
                            {/* Code Stats */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="text-center p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{codeStats?.total || 0}</p>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">Total</p>
                                </div>
                                <div className="text-center p-2 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-lg">
                                    <p className="text-lg font-semibold text-[#10a37f]">{codeStats?.unused || 0}</p>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">Available</p>
                                </div>
                                <div className="text-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                    <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">{codeStats?.used || 0}</p>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">Used</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2">
                                <Button 
                                    onClick={() => setShowGenerateModal(true)}
                                    size="sm" 
                                    className="w-full"
                                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}
                                >
                                    Generate Codes
                                </Button>
                                {codeStats?.unused > 0 && (
                                    <Button 
                                        onClick={handleExportCodes}
                                        variant="outline"
                                        size="sm" 
                                        className="w-full"
                                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
                                    >
                                        Export Codes (CSV)
                                    </Button>
                                )}
                                <Button 
                                    href={route('admin.assets.codes', asset.id)}
                                    variant="outline"
                                    size="sm" 
                                    className="w-full"
                                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                                >
                                    View All Codes
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Generate Codes Modal */}
            <GenerateCodesModal
                show={showGenerateModal}
                asset={asset}
                onClose={() => setShowGenerateModal(false)}
                onSuccess={handleCodesGenerated}
            />
        </AdminLayout>
    );
}
