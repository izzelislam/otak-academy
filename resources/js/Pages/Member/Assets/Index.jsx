import MemberLayout from '@/Layouts/MemberLayout';
import { Head, Link, usePage } from '@inertiajs/react';
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

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{label}</p>
                </div>
            </div>
        </div>
    );
}

export default function AssetsIndex({ assets }) {
    const totalAssets = assets?.length || 0;
    const [downloadingId, setDownloadingId] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const handleDownload = async (asset) => {
        if (!asset.eligibility?.can_redownload) {
            setErrorMsg(asset.eligibility?.reason || 'Limit download habis.');
            setTimeout(() => setErrorMsg(''), 5000);
            return;
        }

        try {
            setDownloadingId(asset.id);
            setErrorMsg('');

            const response = await fetch(route('assets.redeem', asset.slug), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
                },
                body: JSON.stringify({ code: null }) // We don't need code if we already own it
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal generate download token');
            }

            // Successfully got the token, redirect to download
            if (data.download_url) {
                window.location.href = data.download_url;
                
                // Refresh data to update the download limits
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }

        } catch (err) {
            setErrorMsg(err.message || 'Terjadi kesalahan saat download');
            setTimeout(() => setErrorMsg(''), 5000);
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <MemberLayout title="Asset Saya">
            <Head title="Asset Saya" />

            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <StatCard
                        icon={<svg className="w-5 h-5 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>}
                        label="Total Asset"
                        value={totalAssets}
                    />
                </div>

                {errorMsg && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">
                        {errorMsg}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tambah Asset</h3>
                        <div className="flex gap-2">
                            <Link
                                href={route('assets.index')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
                            >
                                Cari Asset
                            </Link>
                            <Link
                                href={route('member.redeem.create')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Redeem Code
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Assets Grid */}
                {assets && assets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {assets.map((asset) => (
                            <div key={asset.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col hover:border-[#10a37f]/30 transition-colors">
                                <div className="relative">
                                    <div className="aspect-video bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                                        {asset.thumbnail_url ? (
                                            <img
                                                src={asset.thumbnail_url}
                                                alt={asset.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg className="w-10 h-10 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <div className="px-2 py-1 rounded text-xs font-medium bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20 backdrop-blur-sm">
                                            Purchased
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 p-4 flex flex-col">
                                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-1">
                                        {asset.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">
                                        {asset.description || 'Download asset ini.'}
                                    </p>
                                    
                                    <div className="mt-auto space-y-3">
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                                            <span>Format: {asset.file_type?.split('/').pop()?.toUpperCase() || '-'}</span>
                                            <span>{formatFileSize(asset.file_size)}</span>
                                        </div>
                                        
                                        {asset.eligibility && (
                                            <div className="flex items-center justify-between text-[11px] font-medium p-2 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                                                <span className="text-gray-500 dark:text-slate-400">Limit per jam:</span>
                                                <span className={asset.eligibility.can_redownload ? 'text-[#10a37f]' : 'text-amber-500'}>
                                                    {asset.eligibility.downloads_remaining} / 3 sisa
                                                </span>
                                            </div>
                                        )}
                                        
                                        <button
                                            onClick={() => handleDownload(asset)}
                                            disabled={downloadingId === asset.id || !asset.eligibility?.can_redownload}
                                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            {downloadingId === asset.id ? (
                                                <>
                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Tunggu...
                                                </>
                                            ) : !asset.eligibility?.can_redownload ? (
                                                <>Limit Tercapai</>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    Download
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-8">
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada asset</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                                Anda belum memiliki asset berbayar/redeem. Kunjungi halaman pencarian asset untuk mengeksplor koleksi digital kami.
                            </p>
                            <Link
                                href={route('assets.index')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white font-medium rounded-lg transition-colors"
                            >
                                Eksplor Asset
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </MemberLayout>
    );
}
