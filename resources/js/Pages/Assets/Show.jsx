import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/Components/Navbar';
import RedeemCodeModal from '@/Components/RedeemCodeModal';

function DownloadIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
    );
}

function LockIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    );
}

function FileIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    );
}

function ArrowLeftIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
    );
}

function CheckIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
}

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

export default function AssetShow({ auth, asset, hasValidRedemption, redownloadInfo }) {
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [downloadsRemaining, setDownloadsRemaining] = useState(redownloadInfo?.downloads_remaining || 0);

    // Debug logging
    console.log('Asset Show Debug:', {
        hasValidRedemption,
        redownloadInfo,
        downloadsRemaining,
        isAuthenticated: !!auth?.user,
        assetType: asset.type
    });

    const handleFreeDownload = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(route('assets.download', asset.id));
            const data = response.data;

            setDownloadUrl(data.download_url);
            // Auto-trigger download
            window.location.href = data.download_url;
        } catch (err) {
            if (err.response?.status === 401 && err.response?.data?.redirect) {
                router.visit(err.response.data.redirect);
                return;
            }
            setError(err.response?.data?.message || err.message || 'Failed to generate download link');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRedeemSuccess = (data) => {
        setDownloadUrl(data.download_url);
        setShowRedeemModal(false);
        if (data.downloads_remaining !== undefined) {
            setDownloadsRemaining(data.downloads_remaining);
        }
        // Auto-trigger download
        window.location.href = data.download_url;
    };

    const handleRedownload = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(route('assets.redeem', asset.id), { code: '' });
            const data = response.data;

            setDownloadUrl(data.download_url);
            if (data.downloads_remaining !== undefined) {
                setDownloadsRemaining(data.downloads_remaining);
            }
            window.location.href = data.download_url;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to generate download link');
        } finally {
            setIsLoading(false);
        }
    };

    const formatExpiryDate = (isoString) => {
        if (!isoString) return null;
        const date = new Date(isoString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <Head title={asset.title} />
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased transition-colors duration-300">
                <Navbar auth={auth} />

                {/* Content */}
                <article className="pt-24 pb-16">
                    <div className="max-w-[1000px] mx-auto px-6">
                        {/* Back Link */}
                        <Link 
                            href={route('assets.index')}
                            className="inline-flex items-center gap-2 text-[14px] text-gray-500 hover:text-gray-900 dark:text-white/60 dark:hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Kembali ke Assets
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* Thumbnail */}
                                {asset.thumbnail_url ? (
                                    <div className="rounded-2xl overflow-hidden mb-8 shadow-sm dark:shadow-none bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
                                        <img 
                                            src={asset.thumbnail_url} 
                                            alt={asset.title}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video rounded-2xl bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] flex items-center justify-center mb-8">
                                        <FileIcon className="w-24 h-24 text-gray-400 dark:text-white/20" />
                                    </div>
                                )}

                                {/* Title & Badge */}
                                <div className="flex items-start gap-3 mb-4">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-[12px] font-medium rounded-full ${
                                        asset.type === 'free' 
                                            ? 'text-[#10a37f] bg-[#10a37f]/10' 
                                            : 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-400/10'
                                    }`}>
                                        {asset.type === 'free' ? (
                                            <>
                                                <DownloadIcon className="w-3.5 h-3.5" />
                                                Free
                                            </>
                                        ) : (
                                            <>
                                                <LockIcon className="w-3.5 h-3.5" />
                                                Premium
                                            </>
                                        )}
                                    </span>
                                </div>

                                <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] leading-[1.2] text-gray-900 dark:text-white mb-6">
                                    {asset.title}
                                </h1>

                                {/* Description */}
                                {asset.description && (
                                    <div className="prose prose-lg max-w-none mb-8 text-gray-600 dark:text-white/70">
                                        <p className="leading-relaxed whitespace-pre-wrap">
                                            {asset.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - Download Card */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6 shadow-sm dark:shadow-none">
                                    <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-4">Download</h3>
                                    
                                    {/* File Info */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center justify-between text-[14px]">
                                            <span className="text-gray-500 dark:text-white/50">File Size</span>
                                            <span className="text-gray-900 dark:text-white font-medium">{formatFileSize(asset.file_size)}</span>
                                        </div>
                                        {asset.file_type && (
                                            <div className="flex items-center justify-between text-[14px]">
                                                <span className="text-gray-500 dark:text-white/50">Format</span>
                                                <span className="text-gray-900 dark:text-white font-medium">{asset.file_type.split('/').pop()?.toUpperCase()}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between text-[14px]">
                                            <span className="text-gray-500 dark:text-white/50">Downloads</span>
                                            <span className="text-gray-900 dark:text-white font-medium">{asset.download_count || 0}</span>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">
                                            <p className="text-[13px]">{error}</p>
                                        </div>
                                    )}

                                    {/* Download Button */}
                                    {asset.type === 'free' ? (
                                        <button
                                            onClick={handleFreeDownload}
                                            disabled={isLoading}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] disabled:opacity-50 text-white font-medium rounded-xl transition-colors shadow-sm"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <DownloadIcon className="w-5 h-5" />
                                                    Download Free
                                                </>
                                            )}
                                        </button>
                                    ) : hasValidRedemption ? (
                                        <div className="space-y-3">
                                            {/* Re-download Info */}
                                            {redownloadInfo && (
                                                <div className="p-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-lg space-y-2">
                                                    <div className="flex items-center justify-between text-[13px]">
                                                        <span className="text-gray-500 dark:text-white/50">Limit per jam</span>
                                                        <span className="text-gray-900 dark:text-white font-medium">{downloadsRemaining} / 3</span>
                                                    </div>
                                                    
                                                    {!redownloadInfo.can_redownload && redownloadInfo.reason && (
                                                        <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded text-[12px] text-amber-700 dark:text-amber-400">
                                                            {redownloadInfo.reason}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <button
                                                onClick={handleRedownload}
                                                disabled={isLoading || downloadsRemaining <= 0}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] disabled:opacity-50 text-white font-medium rounded-xl transition-colors shadow-sm"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Generating...
                                                    </>
                                                ) : downloadsRemaining <= 0 ? (
                                                    <>
                                                        <LockIcon className="w-5 h-5" />
                                                        Limit Tercapai
                                                    </>
                                                ) : (
                                                    <>
                                                        <DownloadIcon className="w-5 h-5" />
                                                        Download
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setShowRedeemModal(true)}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors shadow-sm"
                                        >
                                            <LockIcon className="w-5 h-5" />
                                            Redeem Code
                                        </button>
                                    )}

                                    {/* Download URL (if generated) */}
                                    {downloadUrl && (
                                        <div className="mt-4 p-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-lg">
                                            <p className="text-[12px] text-gray-500 dark:text-white/50 mb-2">Link download (expires in 5 minutes):</p>
                                            <a 
                                                href={downloadUrl}
                                                className="text-[13px] text-[#10a37f] hover:underline break-all"
                                            >
                                                Click here to download
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-white/[0.06] py-8">
                    <div className="max-w-[1200px] mx-auto px-6 text-center">
                        <p className="text-[13px] text-gray-400 dark:text-white/40">
                            © {new Date().getFullYear()} OtakAtikin. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>

            {/* Redeem Code Modal */}
            <RedeemCodeModal
                show={showRedeemModal}
                asset={asset}
                onClose={() => setShowRedeemModal(false)}
                onSuccess={handleRedeemSuccess}
            />
        </>
    );
}
