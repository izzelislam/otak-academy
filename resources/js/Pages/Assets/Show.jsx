import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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

export default function AssetShow({ asset, hasValidRedemption, redownloadInfo }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [downloadsRemaining, setDownloadsRemaining] = useState(redownloadInfo?.downloads_remaining || 0);

    useEffect(() => {
        document.documentElement.classList.add('dark');
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFreeDownload = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(route('assets.download', asset.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate download link');
            }

            setDownloadUrl(data.download_url);
            // Auto-trigger download
            window.location.href = data.download_url;
        } catch (err) {
            setError(err.message);
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
            const response = await fetch(route('assets.redeem', asset.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ code: '' }), // Empty code triggers re-download check
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate download link');
            }

            setDownloadUrl(data.download_url);
            if (data.downloads_remaining !== undefined) {
                setDownloadsRemaining(data.downloads_remaining);
            }
            window.location.href = data.download_url;
        } catch (err) {
            setError(err.message);
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
            <div className="min-h-screen bg-black text-white antialiased">
                {/* Header */}
                <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                    isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : ''
                }`}>
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                                    <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                    </svg>
                                </div>
                                <span className="text-[15px] font-semibold tracking-tight">OtakAtikin</span>
                            </Link>
                            <nav className="flex items-center gap-4">
                                <Link href={route('blog.index')} className="text-[14px] font-medium text-white/70 hover:text-white transition-colors">Blog</Link>
                                <Link href={route('assets.index')} className="text-[14px] font-medium text-white">Assets</Link>
                                <Link href={route('login')} className="px-4 py-2 text-[14px] font-medium text-black bg-white hover:bg-white/90 rounded-lg transition-colors">
                                    Login
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <article className="pt-24 pb-16">
                    <div className="max-w-[1000px] mx-auto px-6">
                        {/* Back Link */}
                        <Link 
                            href={route('assets.index')}
                            className="inline-flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Kembali ke Assets
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* Thumbnail */}
                                {asset.thumbnail_url ? (
                                    <div className="rounded-2xl overflow-hidden mb-8">
                                        <img 
                                            src={asset.thumbnail_url} 
                                            alt={asset.title}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-8">
                                        <FileIcon className="w-24 h-24 text-white/20" />
                                    </div>
                                )}

                                {/* Title & Badge */}
                                <div className="flex items-start gap-3 mb-4">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-[12px] font-medium rounded-full ${
                                        asset.type === 'free' 
                                            ? 'text-[#10a37f] bg-[#10a37f]/10' 
                                            : 'text-amber-400 bg-amber-400/10'
                                    }`}>
                                        {asset.type === 'free' ? (
                                            <>
                                                <DownloadIcon className="w-3.5 h-3.5" />
                                                Free
                                            </>
                                        ) : (
                                            <>
                                                <LockIcon className="w-3.5 h-3.5" />
                                                Paid
                                            </>
                                        )}
                                    </span>
                                </div>

                                <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] leading-[1.2] text-white mb-6">
                                    {asset.title}
                                </h1>

                                {/* Description */}
                                {asset.description && (
                                    <div className="prose prose-invert prose-lg max-w-none mb-8">
                                        <p className="text-white/70 leading-relaxed whitespace-pre-wrap">
                                            {asset.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - Download Card */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                                    <h3 className="text-[16px] font-semibold text-white mb-4">Download</h3>
                                    
                                    {/* File Info */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center justify-between text-[14px]">
                                            <span className="text-white/50">File Size</span>
                                            <span className="text-white font-medium">{formatFileSize(asset.file_size)}</span>
                                        </div>
                                        {asset.file_type && (
                                            <div className="flex items-center justify-between text-[14px]">
                                                <span className="text-white/50">Format</span>
                                                <span className="text-white font-medium">{asset.file_type.split('/').pop()?.toUpperCase()}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between text-[14px]">
                                            <span className="text-white/50">Downloads</span>
                                            <span className="text-white font-medium">{asset.download_count || 0}</span>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <p className="text-[13px] text-red-400">{error}</p>
                                        </div>
                                    )}

                                    {/* Download Button */}
                                    {asset.type === 'free' ? (
                                        <button
                                            onClick={handleFreeDownload}
                                            disabled={isLoading}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
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
                                            <div className="flex items-center gap-2 p-3 bg-[#10a37f]/10 border border-[#10a37f]/20 rounded-lg">
                                                <CheckIcon className="w-5 h-5 text-[#10a37f]" />
                                                <span className="text-[13px] text-[#10a37f]">Kode sudah di-redeem</span>
                                            </div>
                                            
                                            {/* Re-download Info */}
                                            {redownloadInfo && (
                                                <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg space-y-2">
                                                    <div className="flex items-center justify-between text-[13px]">
                                                        <span className="text-white/50">Downloads tersisa</span>
                                                        <span className="text-white font-medium">{downloadsRemaining}</span>
                                                    </div>
                                                    {redownloadInfo.expires_at && (
                                                        <div className="flex items-center justify-between text-[13px]">
                                                            <span className="text-white/50">Berlaku sampai</span>
                                                            <span className="text-white font-medium">{formatExpiryDate(redownloadInfo.expires_at)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <button
                                                onClick={handleRedownload}
                                                disabled={isLoading || downloadsRemaining <= 0}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
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
                                                        Re-download
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setShowRedeemModal(true)}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
                                        >
                                            <LockIcon className="w-5 h-5" />
                                            Redeem Code
                                        </button>
                                    )}

                                    {/* Download URL (if generated) */}
                                    {downloadUrl && (
                                        <div className="mt-4 p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg">
                                            <p className="text-[12px] text-white/50 mb-2">Link download (expires in 5 minutes):</p>
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
                <footer className="border-t border-white/[0.06] py-8">
                    <div className="max-w-[1200px] mx-auto px-6 text-center">
                        <p className="text-[13px] text-white/40">
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
